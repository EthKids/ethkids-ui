<template>
  <div class="container">
    <dl class="row">
      <dt class="col-sm-7">Token</dt>
      <dd class="col-sm-5"><a v-bind:href="getTokenLink">CHANCE</a></dd>

      <dt class="col-sm-7">Total raised up to now</dt>
      <dd class="col-sm-5"><a v-bind:href="getCommunityAddressLink">{{this.$store.state.totalDonationsRaised}} ETH </a></dd>


      <dt class="col-sm-7">Current charity fund</dt>
      <dd class="col-sm-5"><a v-bind:href="getCharityVaultLink">{{this.$store.state.charityVaultBalance}} ETH</a></dd>

      <dt class="col-sm-7">Community funds</dt>
      <dd class="col-sm-5"><a href>{{2}} ETH</a></dd>


      <dt class="col-sm-7">My tokens</dt>
      <dd class="col-sm-5"> {{'15/1500'}} CHANCE</dd>

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
  },
}
</script>

<style scoped>

</style>
