<template>
  <div class="">
    <dl class="row justify-content-center">
      <h3>
        Passive charity
      </h3>
      <font-awesome-icon
        v-on:click="aboutPassiveCharity = !aboutPassiveCharity"
        color="black" size="sm" :icon="['fa', 'info-circle']" class="ml-2"
      />
    </dl>
    <div v-show="aboutPassiveCharity" class="text-left mb-2">
      Passive charity allows you redirecting the interest gained on the DeFi protocols to <b>EthKids</b>.
      <br>
      Raising funds this way does't require you to spend on transaction fee and happens 'passively' 24/7.
      <br>
      If enabled, the generated income will be <b>equally distributed</b> over all communities registered on EthKids.
      <hr>
    </div>
    <div>
      <b>{{ forwardingAccounts }}</b> contributors forwarding interest from <b>{{ parseFloat(cumulatedDeposit).toFixed(2) }} DAI</b>
    </div>
    <div>
      Raised already: <b>{{parseFloat(historicYieldVaultBalance).toFixed(2)}} aDAI </b>
    </div>

    <div class="row mt-3">
      <div class="col">
        <img src="../assets/aave.svg" style="max-width: 150px; height: 25px;">
      </div>
      <div class="col align-content-end">
        <div class="text-right row">
          My aDAI: <b>{{parseFloat(myATokenBalance).toFixed(2)}} aDAI </b>
        </div>
        <div class="text-right row mt-1">
          <div class="mr-3">
            Enable <b>DAI</b> interest forwarding
          </div>
          <div class="align-content-end flex-fill">
            <b-form-checkbox :disabled="myATokenBalance == 0"
                             v-model="redirectionEnabled"
                             @change="switchAaveInterestForwarding()" name="forwarding-button" switch size="lg"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="myATokenBalance == 0" class="text-left mt-3">
      <hr>
      <b>Tip:</b> You don't have 'aToken' balance yet.
      In order to enable <i>Passive Charity</i>:
      <br>
      1. Deposit <b>DAI</b> on <a href="https://app.aave.com/home" target="_blank"> Aave protocol</a>
      <br>
      2. Enable Passive charity here
    </div>
  </div>

</template>

<script>

import AAVE_RESERVES from '../graphql/AaveReserves.gql'

export default {
  name: 'PassiveCharity',
  data() {
    return {
      aboutPassiveCharity: false,
      myATokenBalance: 0,
      yieldVaultBalance: 0,
      historicYieldVaultBalance: 0,
      redirectionEnabled: false,
      forwardingAccounts: null,
      cumulatedDeposit: 0,
    }
  },

  apollo: {},

  mounted() {
    this.loadFinancials();
  },

  computed: {},

  methods: {
    loadFinancials() {
      this.loadMyATokenBalance();
      this.loadYieldVault();
      this.loadForwarders();
    },
    async loadForwarders() {
      let reserves = await this.$apollo.query({
        query: AAVE_RESERVES,
        variables: {
          address: this.$store.state.yieldVaultAddress,
        },
      })
      const daiReservesCollection = reserves.data.userReserves.filter(res => res.reserve.symbol == 'DAI');
      this.forwardingAccounts = daiReservesCollection.length;
      daiReservesCollection
        .forEach(reserve => this.cumulatedDeposit += Number(window.web3.utils.fromWei(reserve.principalATokenBalance.toString(), 'ether')));
    },
    loadMyATokenBalance() {
      let self = this;
      this.$store.state.aTokenInstance().methods.balanceOf(this.$store.state.web3.coinbase).call().then((aTokenBalance) => {
        self.myATokenBalance = window.web3.utils.fromWei(aTokenBalance.toString(), 'ether');
      });

      this.$store.state.aTokenInstance().methods.getInterestRedirectionAddress(this.$store.state.web3.coinbase).call().then((destination) => {
        if (destination == this.$store.state.yieldVaultInstance().options.address) {
          self.redirectionEnabled = true;
        }
      });
    },
    loadYieldVault() {
      let self = this;
      this.$store.state.yieldVaultInstance().methods.balance(this.$store.state.aTokenInstance().options.address).call().then((aTokenBalance) => {
        self.yieldVaultBalance = window.web3.utils.fromWei(aTokenBalance.toString(), 'ether');
      });
      this.$store.state.yieldVaultInstance().methods.historicBalance(this.$store.state.aTokenInstance().options.address).call().then((aTokenBalance) => {
        self.historicYieldVaultBalance = window.web3.utils.fromWei(aTokenBalance.toString(), 'ether');
      });
    },
    switchAaveInterestForwarding() {
      if (this.redirectionEnabled) {
        this.disableAaveInterestForwarding();
      } else {
        this.enableAaveInterestForwarding();
      }
    },
    enableAaveInterestForwarding() {
      const self = this;
      this.$store.state.aTokenInstance().methods.redirectInterestStream(this.$store.state.yieldVaultAddress)
        .send({from: this.$store.state.web3.coinbase})
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            self.loadFinancials();
          }
        })
        .on('error', () => {
          self.redirectionEnabled = !self.redirectionEnabled;
        });
    },
    disableAaveInterestForwarding() {
      const self = this;
      this.$store.state.aTokenInstance().methods.redirectInterestStream('0x0000000000000000000000000000000000000000')
        .send({from: this.$store.state.web3.coinbase})
        .on('confirmation', (confirmationNumber, receipt) => {
          if (confirmationNumber == 1) {
            self.loadFinancials();
          }
        })
        .on('error', () => {
          self.redirectionEnabled = !self.redirectionEnabled;
        });
    },
  },
}
</script>

<style scoped>
  .apollo {
    padding: 12px;
  }

  label {
    display: block;
    margin-bottom: 6px;
  }

  .error {
    color: red;
  }

</style>
