<template>
  <div class="container stateContainer">
    <h3>
      <a target="_blank" v-bind:href="charityVaultLink">${{ parseFloat(this.cumulatedBalance.toString()).toFixed(2) }}</a>
    </h3>
    <!--<span>
      Total <a target="_blank" v-bind:href="communityAddressLink">${{totalDonationsRaised}}</a>
    </span>-->
  </div>
</template>

<script>
import {getIERC20Contract} from "../utils/getContract";
import State from "@/mixins/State";

export default {
  name: 'FundFinancialState',
  mixins: [State],
  props: {
    name: String,
  },
  components: {},
  data() {
    return {
      cumulatedBalance: 0,
      totalDonationsRaised: 0,
      communityAddressLink: '',
      charityVaultLink: '',
    }
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity' && mutation.payload.name === this.name) {
        self.loadCharityVault();
        this.communityAddressLink = `${this.$store.state.etherscan}/address/${mutation.payload.address}`;
        this.charityVaultLink = `${this.$store.state.etherscan}/address/${mutation.payload.vaultAddress}`;

        window.web3.eth.getBlockNumber().then((currentBlock) => {

          let latestDonationBlock = 0;
          mutation.payload.contract().events.LogDonationReceived({
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
          mutation.payload.contract().events.LogPassToCharity({
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
      this.loadCharityVault();
    },
    loadCharityVault() {
      let charityVaultContract = this.community(this.name).vaultContract();
      charityVaultContract.methods.sumErcStats().call().then((sumRaised) => {
        let balanceUSD = window.web3.utils.fromWei(sumRaised.toString(), 'ether');
        this.totalDonationsRaised = parseFloat(balanceUSD).toFixed(2);
      });

      getIERC20Contract(this.$store.state.stableTokenAddress).then((erc20Instance) => {
        // sum up 'DAI' raised + yield 'aDAI'
        erc20Instance.methods.balanceOf(charityVaultContract.options.address).call().then(ercBalance => {
          let balance = window.web3.utils.fromWei(ercBalance.toString(), 'ether');
          this.$store.commit('registerCharityVaultBalance', {
            name: this.name,
            balance: balance
          });
          let self = this;
          this.$store.state.yieldVaultInstance().methods.communityVaultBalance(this.$store.state.aTokenInstance().options.address).call().then((aTokenBalance) => {
            self.cumulatedBalance = Number(balance) + Number(window.web3.utils.fromWei(aTokenBalance.toString(), 'ether'));
          });
        })
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
