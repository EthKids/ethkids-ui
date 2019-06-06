<template>
  <div class="descriptionContainer">
    <h1 class="display-3 highlighted">EthKids</h1>
    <p>EthKids is an open source non-commercial decentralized protocol for charity donations for children.
      <br>
      Using the <a href="https://tokeneconomy.co/dynamic-token-bonding-curves-41d36e43befa" target="_blank"> dynamic bonding curve model</a> for
      donations,
      EthKids tries to solve the problem of short-lasting relations with the donators.
      <br>
      With the power of Ethereum Blockchain and the Decentralized Finance concept, EthKids puts in action conceptually new donation mechanism,
      where active regular contributors rewarded in a fair way
    </p>
    <p>
      <router-link to="/about">Read more...</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "DescriptionPlate"
}
</script>

<style scoped>
  .descriptionContainer {
    margin-bottom: 40px;
  }

</style>
