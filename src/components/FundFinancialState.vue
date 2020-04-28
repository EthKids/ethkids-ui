<template>
  <div class="container stateContainer">
    <div class="row">
      <div class="col-sm-4">
        <h3>Community</h3>
        <dl class="row">
          <dt class="col-sm-7">Token</dt>
          <dd class="col-sm-5"><a target="_blank" v-bind:href="getTokenLink">{{this.$store.state.tokenSym}}</a></dd>
          <dt class="col-sm-7">Available</dt>
          <dd class="col-sm-5">{{this.$store.state.tokenTotalSupply}} {{this.$store.state.tokenSym}}</dd>
          <dt class="col-sm-7">Total donated up to now</dt>
          <dd class="col-sm-5"><a target="_blank" v-bind:href="getCommunityAddressLink">{{this.$store.state.totalDonationsRaised}} USD </a></dd>
        </dl>
      </div>
      <div class="col-sm-4">
        <h3>Vaults</h3>
        <dl class="row">
          <dt class="col-sm-7">Charity fund</dt>
          <dd class="col-sm-5"><a target="_blank" v-bind:href="getCharityVaultLink">{{this.$store.state.charityVaultBalance}} USD</a></dd>
          <dt class="col-sm-7"></dt>
          <dd class="col-sm-5"><a target="_blank" v-bind:href="getCharityVaultStatsLink">See stats</a></dd>

          <dt class="col-sm-7">Community fund</dt>
          <dd class="col-sm-5"><a target="_blank" v-bind:href="getBondingVaultAddressLink">{{this.$store.state.bondingVaultBalance}} ΞTH</a></dd>
          <dt class="col-sm-7"></dt>
          <dd class="col-sm-5"><a target="_blank" v-bind:href="getBondingVaultStatsLink">See stats</a></dd>
        </dl>
      </div>
      <div class="col-sm-4">
        <h3>My assets</h3>
        <dl class="row">
          <dt class="col-sm-7">My tokens</dt>
          <dd class="col-sm-5"> {{parseFloat(this.$store.state.tokenMyBalance).toFixed(2)}} {{this.$store.state.tokenSym}}</dd>

          <dt class="col-sm-7">My stake</dt>
          <dd class="col-sm-5"> {{getMyTokenPercent}}</dd>

          <dt class="col-sm-7">My tokens' value</dt>
          <dd class="col-sm-5">{{parseFloat(this.$store.state.tokenMyETHReturn).toFixed(2)}} ΞTH</dd>

          <dt class="col-lg-7 col-md-1"></dt>
          <dd class="col-lg-5 col-md-11">
            <input
              class="btn btn-primary btn-sm custom-btn-action"
              type="button"
              value="Sell my tokens"
              @click="sellBack()"/></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/utils/event-bus';
import {getIERC20Contract} from "../utils/getContract";

export default {
  name: 'FundFinancialState',
  components: {},
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
    getCharityVaultStatsLink() {
      return `https://etherscan.io/address/${this.$store.state.charityVaultAddress}#analytics`;
    },
    getBondingVaultAddressLink() {
      return `https://etherscan.io/address/${this.$store.state.bondingVaultAddress}`;
    },
    getBondingVaultStatsLink() {
      return `https://etherscan.io/address/${this.$store.state.bondingVaultAddress}#analytics`;
    },
    getMyTokenPercent() {
      if (this.$store.state.tokenTotalSupply > 0) {
        return ((Number(this.$store.state.tokenMyBalance) / this.$store.state.tokenTotalSupply) * 100).toFixed(1) + '%';
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
      if (mutation.type === 'pollWeb3Instance') {
        //happens initially or upon changing account
        if (self.$store.state.tokenInstance) {
          self.loadMyTokenBalance();
        }
      }
      if (mutation.type === 'registerCharityVault') {
        self.loadCharityVault();
      }
      if (mutation.type === 'registerBondingVault') {
        self.loadBondingVault();
        self.loadMyReturn();
      }
      if (mutation.type === 'registerTokenMyBalance') {
        self.loadMyReturn();
      }
      if (mutation.type == 'registerCommunity') {
        window.web3.eth.getBlockNumber().then((currentBlock) => {

          let latestDonationBlock = 0;
          self.$store.state.communityInstance().events.LogDonationReceived({
            fromBlock: currentBlock
          }, (e, res) => {
            if (!e && latestDonationBlock < res.blockNumber) {
              this.reloadFinancialState();
              latestDonationBlock = res.blockNumber;
            }
          });

          let latestSoldBlock = 0;
          self.$store.state.bondingVaultInstance().events.LogTokensSold({
            fromBlock: currentBlock
          }, (e, res) => {
            if (!e && latestSoldBlock < res.blockNumber) {
              this.reloadFinancialState();
              latestSoldBlock = res.blockNumber;
            }
          });

          let latestPassToCharityBlock = 0;
          self.$store.state.communityInstance().events.LogPassToCharity({
            fromBlock: currentBlock
          }, (e, res) => {
            if (!e && latestPassToCharityBlock < res.blockNumber) {
              this.reloadFinancialState();
              latestPassToCharityBlock = res.blockNumber;
            }
          });
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
      this.loadMyReturn();
    },
    loadMyTokenBalance() {
      let tokenInstance = this.$store.state.tokenInstance();
      let self = this;
      tokenInstance.methods.balanceOf(this.$store.state.web3.coinbase).call().then((tokenBalance) => {
        self.$store.commit('registerTokenMyBalance',
          window.web3.utils.fromWei(tokenBalance.toString(), 'ether'));
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
        let balanceUSD = window.web3.utils.fromWei(sumRaised.toString(), 'ether');
        this.$store.commit('registerTotalDonationsRaised', parseFloat(balanceUSD).toFixed(2));
      });

      getIERC20Contract(this.$store.state.stableTokenAddress).then((erc20Instance) => {
        erc20Instance.methods.balanceOf(charityVaultContract.options.address).call().then(ercBalance => {
          let balance = window.web3.utils.fromWei(ercBalance.toString(), 'ether');
          this.$store.commit('registerCharityVaultBalance',
            Math.floor(parseFloat(balance).toFixed(3) * 100) / 100);
        });
      });
    },
    loadBondingVault() {
      let bondingVaultContract = this.$store.state.bondingVaultInstance();
      window.web3.eth.getBalance(bondingVaultContract.options.address, (err, bondingVaultBalance) => {
        let balanceEth = window.web3.utils.fromWei(bondingVaultBalance.toString(), 'ether');
        this.$store.commit('registerBondingVaultBalance', parseFloat(balanceEth).toFixed(2));
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
    }
  },

}
</script>

<style scoped>

  .stateContainer {
    padding-top: 30px;
    border-top: 1px dashed #b8b8b8;
  }

</style>
