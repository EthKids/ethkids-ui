<template>
  <div class="descriptionContainer">
    <sell-modal/>
    <b-card
      overlay
      :img-src="background"
      img-alt="Card Image"
      img-height="350vw"
      text-variant="white"
    >
      <b-card-body>
        <b-row>
          <b-col class="d-none d-md-block">
          </b-col>
          <b-col sm="6" class="d-none d-sm-block">
            <div class="bg-dark border-light rounded" style="height: 90%; opacity: 0.7; blur:2px">
              EthKids is the open source non-commercial decentralized protocol for charity donations for children.
              <br><br>
              Using the dynamic bonding curve model for the donation rewards,
              EthKids tries to solve the problem of short-lasting relations with the donors.
              <br>
              <p>
                <router-link to="/about">Read more...</router-link>
              </p>
            </div>
          </b-col>
          <b-col sm="6" md="4">
            <div class="bg-dark border-light rounded" style="height: 90%; opacity: 0.7; blur:2px">
              <h3>My assets</h3>
              <dl class="row">
                <dt class="col-sm-7">My tokens</dt>
                <dd class="col-sm-5">
                  <a target="_blank" v-bind:href="getTokenLink">
                    {{parseFloat(this.$store.state.tokenMyBalance).toFixed(2)}} {{this.$store.state.tokenSym}}
                  </a>
                </dd>

                <dt class="col-sm-7">My stake</dt>
                <dd class="col-sm-5"> {{getMyTokenPercent}}</dd>

                <dt class="col-sm-7">My tokens' value</dt>
                <dd class="col-sm-5">{{parseFloat(this.$store.state.tokenMyETHReturn).toFixed(2)}} ΞTH</dd>

                <dt class="col-sm-7">Community fund</dt>
                <dd class="col-sm-5"><a target="_blank" v-bind:href="getBondingVaultAddressLink">{{this.$store.state.bondingVaultBalance}} ΞTH</a>
                </dd>

                <dt class="col-lg-7 col-md-1"></dt>
                <dd class="col-lg-5 col-md-11">
                  <input
                    class="btn btn-primary btn-lg custom-btn-action"
                    :disabled="this.$store.state.readOnly"
                    type="button"
                    value="Sell"
                    @click="sellBack()"/></dd>
              </dl>
            </div>
          </b-col>
        </b-row>

        <div class="bg-dark border-light rounded" style="height: 90%; opacity: 0.7; blur:2px">
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
                @click="sellBack()"/>
            </dd>

            <dt class="col-sm-6">5 contributors</dt>
            <dd class="col-sm-6">From 5000 DAI</dd>

            <dt class="col-sm-6">
              Total raised {{parseFloat(historicYieldVaultBalance).toFixed(2)}} aDAI
            </dt>
            <dd class="col-sm-6">
              Current: {{parseFloat(yieldVaultBalance).toFixed(6)}} aDAI
            </dd>

          </dl>
        </div>

      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import SellModal from '@/components/SellModal';
export default {
  name: "DescriptionPlate",
  components: {
    SellModal,
  },
  data() {
    return {
      background: require('@/assets/header-new.png'),
      myATokenBalance: 0,
      yieldVaultBalance: 0,
      historicYieldVaultBalance: 0,
      redirectionEnabled: false,
    }
  },
  computed: {
    getTokenLink() {
      return `https://etherscan.io/address/${this.$store.state.tokenAddress}`;
    },
    getMyTokenPercent() {
      if (this.$store.state.tokenTotalSupply > 0) {
        return ((Number(this.$store.state.tokenMyBalance) / this.$store.state.tokenTotalSupply) * 100).toFixed(1) + '%';
      } else {
        return '0%';
      }
    },
    getBondingVaultAddressLink() {
      return `https://etherscan.io/address/${this.$store.state.bondingVaultAddress}`;
    },
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'registerToken') {
        self.loadMyTokenBalance();
      }
      if (mutation.type === 'pollWeb3Instance') {
        //happens initially or upon changing account
        if (self.$store.state.tokenInstance) {
          self.loadMyTokenBalance();
        }
      }
      if (mutation.type === 'registerTokenMyBalance') {
        self.loadMyReturn();
      }
      if (mutation.type === 'financialChange') {
        self.reloadFinancialState();
      }
      if (mutation.type === 'registerBondingVault') {
        self.loadBondingVault();
      }
      if (mutation.type === 'registerAToken') {
        self.loadMyATokenBalance();
        self.loadYieldVault();
      }
    });
  },
  methods: {
    sellBack() {
      EventBus.publish('OPEN_SELL');
    },
    reloadFinancialState() {
      this.loadMyTokenBalance();
      this.loadMyReturn();
      this.loadBondingVault();
    },
    loadMyTokenBalance() {
      let tokenInstance = this.$store.state.tokenInstance();
      let self = this;
      tokenInstance.methods.balanceOf(this.$store.state.web3.coinbase).call().then((tokenBalance) => {
        self.$store.commit('registerTokenMyBalance',
          window.web3.utils.fromWei(tokenBalance.toString(), 'ether'));
      });
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
    loadMyReturn() {
      const myTokenBalance = window.web3.utils.toWei(this.$store.state.tokenMyBalance, 'ether');
      if (Number(myTokenBalance) > 0 && this.$store.state.bondingVaultInstance) {
        this.$store.state.bondingVaultInstance().methods.calculateReturn(myTokenBalance, this.$store.state.web3.coinbase)
          .call({from: this.$store.state.web3.coinbase}).then((result) => {
          this.$store.commit('registerTokenMyETHReturn', window.web3.utils.fromWei(result.toString(), 'ether'));
        }).catch((e) => {
          throw e;
        });
      } else {
        this.$store.commit('registerTokenMyETHReturn', "0");
      }
    },
    loadBondingVault() {
      let bondingVaultContract = this.$store.state.bondingVaultInstance();
      window.web3.eth.getBalance(bondingVaultContract.options.address, (err, bondingVaultBalance) => {
        let balanceEth = window.web3.utils.fromWei(bondingVaultBalance.toString(), 'ether');
        this.$store.commit('registerBondingVaultBalance', parseFloat(balanceEth).toFixed(2));
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
      let self = this;
      this.$store.state.aTokenInstance().methods.redirectInterestStream(this.$store.state.yieldVaultAddress)
        .send({from: self.$store.state.web3.coinbase});
    },
  }
}
</script>

<style scoped>
  .descriptionContainer {
    margin-bottom: 40px;
  }

  .card-img {
    object-fit: cover !important;
    object-position: 0 0;
  }

</style>
