<template>
  <div class="container">
    <dl class="row">
      <dt class="col-sm-7">Token</dt>
      <dd class="col-sm-5"><a v-bind:href="getTokenLink">{{this.$store.state.tokenSym}}</a></dd>

      <dt class="col-sm-7">Total raised up to now</dt>
      <dd class="col-sm-5"><a v-bind:href="getCommunityAddressLink">{{this.$store.state.totalDonationsRaised}} ETH </a></dd>


      <dt class="col-sm-7">Current charity fund</dt>
      <dd class="col-sm-5"><a v-bind:href="getCharityVaultLink">{{this.$store.state.charityVaultBalance}} ETH</a></dd>

      <dt class="col-sm-7">Community funds</dt>
      <dd class="col-sm-5"><a v-bind:href="getBondingVaultAddressLink">{{this.$store.state.bondingVaultBalance}} ETH</a></dd>


      <dt class="col-sm-7">My tokens</dt>
      <dd class="col-sm-5"> {{this.$store.state.tokenMyBalance + '/' + this.$store.state.tokenTotalSupply}} {{this.$store.state.tokenSym}}</dd>

      <dt class="col-sm-7"></dt>
      <dd class="col-sm-5">
        <input
          class="btn btn-primary btn-sm custom-btn-action"
          type="button"
          value="Sell back"
          @click="donate()"/></dd>
    </dl>
  </div>
</template>

<script>

export default {
  name: 'FundFinancialState',
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
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'registerToken') {
        let tokenInstance = mutation.payload;
        tokenInstance.methods.balanceOf(self.$store.state.web3.coinbase).call().then((tokenBalance) => {
          self.$store.commit('registerTokenMyBalance', window.web3.utils.fromWei(tokenBalance.toString(), 'ether'))
        });
        tokenInstance.methods.totalSupply().call().then((totalSupply) => {
          self.$store.commit('registerTokenTotalSupply', window.web3.utils.fromWei(totalSupply.toString(), 'ether'))
        });
      }
    });
  }
}
</script>

<style scoped>

</style>
