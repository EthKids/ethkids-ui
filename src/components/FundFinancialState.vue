<template>
  <div class="container stateContainer">
    <div class="row">
      <div class="col-sm-6">
        <h3>
          <a target="_blank" v-bind:href="getCommunityAddressLink">{{this.$store.state.totalDonationsRaised}}</a>
        </h3>
        USD, total
      </div>
      <div class="col-sm-6">
        <h3>
          <a target="_blank" v-bind:href="getCharityVaultLink">{{this.$store.state.charityVaultBalance}}</a>
        </h3>
        USD, current
      </div>
      <!--<div class="col-sm-4">
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
              :disabled="this.$store.state.readOnly"
              type="button"
              value="Sell my tokens"
              @click="sellBack()"/></dd>
        </dl>
      </div>-->
    </div>
  </div>
</template>

<script>
import {getIERC20Contract} from "../utils/getContract";

export default {
  name: 'FundFinancialState',
  components: {},
  computed: {
    getCommunityAddressLink() {
      return `https://etherscan.io/address/${this.$store.state.communityAddress}`;
    },
    getCharityVaultLink() {
      return `https://etherscan.io/address/${this.$store.state.charityVaultAddress}`;
    },
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'registerToken') {
        self.loadTokenSupply();
      }
      if (mutation.type === 'registerCharityVault') {
        self.loadCharityVault();
      }
      if (mutation.type == 'registerCommunity') {
        window.web3.eth.getBlockNumber().then((currentBlock) => {

          let latestDonationBlock = 0;
          self.$store.state.communityInstance().events.LogDonationReceived({
            fromBlock: currentBlock
          }, (e, res) => {
            if (!e && latestDonationBlock < res.blockNumber) {
              this.$store.commit('financialChange');
              this.reloadFinancialState();
              latestDonationBlock = res.blockNumber;
            }
          });

          let latestSoldBlock = 0;
          self.$store.state.bondingVaultInstance().events.LogTokensSold({
            fromBlock: currentBlock
          }, (e, res) => {
            if (!e && latestSoldBlock < res.blockNumber) {
              this.$store.commit('financialChange');
              this.reloadFinancialState();
              latestSoldBlock = res.blockNumber;
            }
          });

          let latestPassToCharityBlock = 0;
          self.$store.state.communityInstance().events.LogPassToCharity({
            fromBlock: currentBlock
          }, (e, res) => {
            if (!e && latestPassToCharityBlock < res.blockNumber) {
              this.$store.commit('financialChange');
              this.reloadFinancialState();
              latestPassToCharityBlock = res.blockNumber;
            }
          });
        });
      }
    });
  },
  methods: {
    reloadFinancialState() {
      this.loadTokenSupply();
      this.loadCharityVault();
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
  },

}
</script>

<style scoped>

  .stateContainer {
    padding-top: 30px;
    border-top: 1px dashed #b8b8b8;
  }

</style>
