<template>
  <div class="container stateContainer">
    <h3>
      <a target="_blank" v-bind:href="charityVaultLink">${{ parseFloat(this.totalDonationsRaised.toString()).toFixed(2) }}</a>
    </h3>
  </div>
</template>

<script>
import {getIERC20Contract} from "../utils/getContract";
import State from "@/mixins/State";
import KyberAPI from "@/services/KyberApi";

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
      charityVaultLink: '',
    }
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity' && mutation.payload.name === this.name) {
        self.loadCharityVault();
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
    this.loadCharityVault();
  },
  methods: {
    reloadFinancialState() {
      this.loadCharityVault();
    },
    loadCharityVault() {
      if (this.community(this.name)) {
        let self = this;
        let charityVaultContract = this.community(this.name).vaultContract();


        KyberAPI.fetchFxUSD(this.$store.state.kyberAPI + "/change24h", 'ETH')
          .then((rate) => {
            this.$store.state.yieldVaultInstance().methods.communityVaultBalance(this.$store.state.aTokenInstance().options.address).call().then((aTokenBalance) => {
              const yieldUSD = Number(window.web3.utils.fromWei(aTokenBalance.toString(), 'ether'));

              window.web3.eth.getBalance(charityVaultContract.options.address, (err, charityVaultBalance) => {
                let balanceETH = window.web3.utils.fromWei(charityVaultBalance.toString(), 'ether');
                this.$store.commit('registerCharityVaultBalance', {
                  name: this.name,
                  balance: balanceETH
                });

                const balanceUSD = (rate * balanceETH).toFixed(2);
                //current: balance + yield
                self.cumulatedBalance = Number(balanceUSD) + yieldUSD;
              });

              charityVaultContract.methods.sumStats().call().then((sumRaised) => {
                let balanceETH = window.web3.utils.fromWei(sumRaised.toString(), 'ether');
                //historic: historic from vault + yield
                self.totalDonationsRaised = (rate * balanceETH).toFixed(2) + yieldUSD;
              });
            });
          });
      }
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
