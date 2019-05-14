<template>
  <div class="container">
    <sell-modal/>
    <dl class="row">
      <dt class="col-sm-7">Token</dt>
      <dd class="col-sm-5"><a v-bind:href="getTokenLink">{{this.$store.state.tokenSym}}</a></dd>

      <dt class="col-sm-7">Total raised up to now</dt>
      <dd class="col-sm-5"><a v-bind:href="getCommunityAddressLink">{{this.$store.state.totalDonationsRaised}} ΞTH </a></dd>


      <dt class="col-sm-7">Current charity fund</dt>
      <dd class="col-sm-5"><a v-bind:href="getCharityVaultLink">{{this.$store.state.charityVaultBalance}} ΞTH</a></dd>

      <dt class="col-sm-7">Community funds</dt>
      <dd class="col-sm-5"><a v-bind:href="getBondingVaultAddressLink">{{this.$store.state.bondingVaultBalance}} ΞTH</a></dd>


      <dt class="col-sm-7">My tokens</dt>
      <dd class="col-sm-5"> {{this.$store.state.tokenMyBalance + '/' + this.$store.state.tokenTotalSupply}} {{this.$store.state.tokenSym}}</dd>

      <dt class="col-sm-7">My stake</dt>
      <dd class="col-sm-5"> {{getMyTokenPercent}}</dd>

      <dt class="col-sm-7">My tokens' value</dt>
      <dd class="col-sm-5">{{this.$store.state.tokenMyETHValue}} ΞTH</dd>

      <dt class="col-sm-7"></dt>
      <dd class="col-sm-5">
        <input
          class="btn btn-primary btn-sm custom-btn-action"
          type="button"
          value="Sell my tokens"
          @click="sellBack()"/></dd>
    </dl>
  </div>
</template>

<script>
import SellModal from '@/components/SellModal';
import EventBus from '@/utils/event-bus';

export default {
  name: 'FundFinancialState',
  components: {
    EventBus,
    SellModal,
  },
  computed: {
    getTokenLink() {
      return `https://etherscan.io/address/${this.$store.state.tokenAddress}`;
    },
    getCommunityAddressLink() {
      return `https://etherscan.io/address/${this.$store.state.communityAddress}`;
    },
    getCharityVaultLink() {
      return `https://etherscan.io/address/${this.$store.state.charityVaultAddress}`;
    },
    getBondingVaultAddressLink() {
      return `https://etherscan.io/address/${this.$store.state.bondingVaultAddress}`;
    },
    getMyTokenPercent() {
      if (this.$store.state.tokenTotalSupply > 0) {
        return ((this.$store.state.tokenMyBalance / this.$store.state.tokenTotalSupply) * 100).toFixed(1) + '%';
      } else {
        return '0%';
      }

    }
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'registerToken') {
        self.loadMyTokenBalance();
        self.loadTokenSupply();
      }
      if (mutation.type === 'registerCharityVault') {
        self.loadCharityVault();
      }
      if (mutation.type === 'registerBondingVault') {
        self.loadBondingVault();
      }
      if (mutation.type == 'registerCommunity') {
        let latestDonationBlock = 0;
        self.$store.state.communityInstance().events.LogDonationReceived({}, (e, res) => {
          if (!e && latestDonationBlock < res.blockNumber) {
            this.reloadFinancialState();
            latestDonationBlock = res.blockNumber;
          }
        });

        let latestSoldBlock = 0;
        self.$store.state.communityInstance().events.LogTokensSold({}, (e, res) => {
          if (!e && latestSoldBlock < res.blockNumber) {
            this.reloadFinancialState();
            latestSoldBlock = res.blockNumber;
          }
        });
      }
    });
  },
  methods: {
    sellBack() {
      EventBus.publish('OPEN_SELL');
    },
    reloadFinancialState() {
      this.loadMyTokenBalance();
      this.loadTokenSupply();
      this.loadCharityVault();
      this.loadBondingVault();
    },
    loadMyTokenBalance() {
      let tokenInstance = this.$store.state.tokenInstance();
      tokenInstance.methods.balanceOf(this.$store.state.web3.coinbase).call().then((tokenBalance) => {
        this.$store.commit('registerTokenMyBalance',
          Math.floor(parseFloat(window.web3.utils.fromWei(tokenBalance.toString(), 'ether')).toFixed(3) * 100) / 100);

        if (Number(tokenBalance) > 0) {
          this.$store.state.communityInstance().methods.myReturn(tokenBalance)
            .call({from: this.$store.state.web3.coinbase}).then((result) => {
            this.$store.commit('registerTokenMyETHValue', parseFloat(window.web3.utils.fromWei(result.amountOfEth.toString(), 'ether')).toFixed(3));
          }).catch((e) => {
            throw e;
          });
        }

      });
    },
    loadTokenSupply() {
      let tokenInstance = this.$store.state.tokenInstance();
      tokenInstance.methods.totalSupply().call().then((totalSupply) => {
        this.$store.commit('registerTokenTotalSupply',
          Math.floor(parseFloat(window.web3.utils.fromWei(totalSupply.toString(), 'ether')).toFixed(3) * 100) / 100);
      });
    },
    loadCharityVault() {
      let charityVaultContract = this.$store.state.charityVaultInstance();
      charityVaultContract.methods.sumStats().call().then((sumRaised) => {
        let balanceEth = window.web3.utils.fromWei(sumRaised.toString(), 'ether');
        this.$store.commit('registerTotalDonationsRaised', parseFloat(balanceEth).toFixed(3));
      });

      window.web3.eth.getBalance(charityVaultContract.options.address, (err, charityBalance) => {
        let balanceEth = window.web3.utils.fromWei(charityBalance.toString(), 'ether');
        this.$store.commit('registerCharityVaultBalance', parseFloat(balanceEth).toFixed(3));
      });
    },
    loadBondingVault() {
      let bondingVaultContract = this.$store.state.bondingVaultInstance();
      window.web3.eth.getBalance(bondingVaultContract.options.address, (err, bondingVaultBalance) => {
        let balanceEth = window.web3.utils.fromWei(bondingVaultBalance.toString(), 'ether');
        this.$store.commit('registerBondingVaultBalance', parseFloat(balanceEth).toFixed(3));
      });
    }
  }
}
</script>

<style scoped>

</style>
