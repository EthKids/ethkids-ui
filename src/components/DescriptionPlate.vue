<template>
  <div class="descriptionContainer">
    <b-card
      overlay
      :img-src="background"
      img-alt="Card Image"
      img-height="350vw"
      text-variant="white"
      title="Image Overlay"
      sub-title="Subtitle"
    >

      <!--<b-card-text>
        EthKids is an open source non-commercial decentralized protocol for charity donations for children.
        <br>
        Using the <a href="https://tokeneconomy.co/dynamic-token-bonding-curves-41d36e43befa" target="_blank"> dynamic bonding curve model</a> for
        donations,
        EthKids tries to solve the problem of short-lasting relations with the donors.
        <br>
        With the power of Ethereum Blockchain and the Decentralized Finance concept, EthKids puts in action conceptually new donation mechanism,
        where active regular contributors rewarded in a fair way
        <p>
          <router-link to="/about">Read more...</router-link>
        </p>
      </b-card-text>-->

      <b-card-body>
        <b-row>
          <b-col>
            <div class="bg-dark border-light" style="opacity: 0.48; blur:2px">
              EthKids is an open source non-commercial decentralized protocol for charity donations for children.
            </div>
          </b-col>
          <b-col>
            <div class="bg-dark border-light" style="opacity: 0.48; blur:2px">
              EthKids is an open source non-commercial decentralized protocol for charity donations for children.
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!--<p>EthKids is an open source non-commercial decentralized protocol for charity donations for children.
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
    </p>-->
  </div>
</template>

<script>
export default {
  name: "DescriptionPlate",
  data() {
    return {
      background: require('@/assets/header-new.png')
    }
  }
}
</script>

<style scoped>
  .descriptionContainer {
    margin-bottom: 40px;
  }

  .card-img {
    object-fit: cover !important;
  }

</style>
