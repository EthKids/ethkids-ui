<template>
  <div class="fundFinState">
    <div>Token: <a href="https://etherscan.io/address/0xcd979b552b46c49f01c0d0cb9a481976bcd50f7d">CHANCE</a></div>
    <div>Total collected: <a href>{{100}} ETH </a></div>
    <div>Donation fund: <a href>{{10}} ETH</a></div>
    <div>Curve fund: <a href>{{2}} ETH</a></div>
    <div>My tokens: {{'15/1500'}} CHANCE</div>
  </div>
</template>

<script>
export default {
  name: 'FundFinancialState'
}
</script>

<style scoped>
  .fundFinState {
    display: table-cell;
    vertical-align: middle;
    padding: 13px 0;
    width: 200px;
  }

</style>
