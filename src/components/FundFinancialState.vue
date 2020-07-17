<template>
  <div class="container stateContainer">
    <h3>
      <a target="_blank" v-bind:href="getCharityVaultLink">${{parseFloat(this.cumulatedBalance.toString()).toFixed(2)}}</a>
    </h3>
    <span>
      Total <a target="_blank" v-bind:href="getCommunityAddressLink">${{this.$store.state.totalDonationsRaised}}</a>
    </span>
  </div>
</template>

<script>
import {getIERC20Contract} from "../utils/getContract";

export default {
  name: 'FundFinancialState',
  components: {},
  data() {
    return {
      cumulatedBalance: 0,
    }
  },
  computed: {
    getCommunityAddressLink() {
      return `${this.$store.state.etherscan}/address/${this.$store.state.communityAddress}`;
    },
    getCharityVaultLink() {
      return `${this.$store.state.etherscan}/address/${this.$store.state.charityVaultAddress}`;
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
          this.$store.commit('registerCharityVaultBalance', balance);

          let self = this;
          this.$store.state.yieldVaultInstance().methods.communityVaultBalance(this.$store.state.aTokenInstance().options.address).call().then((aTokenBalance) => {
            self.cumulatedBalance = Number(balance) + Number(window.web3.utils.fromWei(aTokenBalance.toString(), 'ether'));
          });

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
