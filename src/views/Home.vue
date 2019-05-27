<template>
  <div class="container">
    <img src="../assets/header.jpg">
    <metamask-warning v-if="!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase"/>
    <network-warning v-if="!(!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase) &&
              this.$store.state.web3.networkId != this.$store.state.requiredNetwork"/>
    <div v-show="this.$store.state.web3.networkId === this.$store.state.requiredNetwork">
      <DescriptionPlate/>
      <div class="charityCounter row justify-content-center">
        <h2>
          1
        </h2>
      </div>
      <FundCard name="Chance.by"/>
      <div class="new-community">
        <h5>
          <router-link to="/about">Register new donation community for kids</router-link>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MetamaskWarning from '@/components/MetamaskWarning';
import NetworkWarning from '@/components/NetworkWarning';
import FundCard from '@/components/FundCard.vue'
import DescriptionPlate from '@/components/DescriptionPlate'

export default {
  name: 'home',
  components: {
    MetamaskWarning,
    NetworkWarning,
    FundCard,
    DescriptionPlate
  },

}
</script>

<style lang="scss" scoped>
  .new-community {
    margin-top: 50px;
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }
</style>
