<template>
  <div class="">
    <h3>Passive charity</h3>
    <dl class="row">
      <dt class="col-sm-7">My aDAI</dt>
      <dd class="col-sm-5">
        {{parseFloat(myATokenBalance).toFixed(2)}} aDAI
      </dd>

      <dt class="col-sm-6">
        <input
          class="btn btn-primary btn-lg custom-btn-action"
          :disabled="this.redirectionEnabled"
          type="button"
          value="Enable forwarding"
          @click="enableAaveInterestForwarding()"/>
      </dt>
      <dd class="col-sm-6">
        <input
          class="btn btn-primary btn-lg custom-btn-action"
          :disabled="!this.redirectionEnabled"
          type="button"
          value="Disable forwarding"
          @click="disableAaveInterestForwarding()"/>
      </dd>

      <dt class="col-sm-6">{{forwardingAccounts}} contributors</dt>
      <dd class="col-sm-6">From {{parseFloat(cumulatedDeposit).toFixed(2)}} DAI</dd>

      <dt class="col-sm-6">
        Total raised {{parseFloat(historicYieldVaultBalance).toFixed(2)}} aDAI
      </dt>
      <dd class="col-sm-6">
        Current: {{parseFloat(yieldVaultBalance).toFixed(6)}} aDAI
      </dd>

    </dl>
  </div>

</template>

<script>

import AAVE_RESERVES from '../graphql/AaveReserves.gql'

export default {
  name: 'PassiveCharity',
  data() {
    return {
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
    this.loadMyATokenBalance();
    this.loadYieldVault();
    this.loadForwarders();
    /*this.$store.subscribe(async (mutation) => {
      if (mutation.type === 'registerAToken') {
        this.loadMyATokenBalance();
        this.loadYieldVault();
        this.loadForwarders();
      }
    })*/
  },

  computed: {},

  methods: {
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
        .forEach(reserve => this.cumulatedDeposit += window.web3.utils.fromWei(reserve.principalATokenBalance.toString(), 'ether'));
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
    enableAaveInterestForwarding() {
      this.$store.state.aTokenInstance().methods.redirectInterestStream(this.$store.state.yieldVaultAddress)
        .send({from: this.$store.state.web3.coinbase});
    },
    disableAaveInterestForwarding() {
      this.$store.state.aTokenInstance().methods.redirectInterestStream('0x0000000000000000000000000000000000000000')
        .send({from: this.$store.state.web3.coinbase});
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
