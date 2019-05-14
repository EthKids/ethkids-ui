<template>
  <div class="container">
    <!--<img src="../assets/header.jpg">-->
    <metamask-warning v-if="!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase"/>
    <network-warning v-if="!(!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase) &&
              this.$store.state.web3.networkId != this.$store.state.requiredNetwork"/>
    <div v-if="this.$store.state.web3.networkId == this.$store.state.requiredNetwork">
      <DescriptionPlate/>
      <div class="row justify-content-center">
        <h2>
          1
        </h2>
      </div>
      <FundCard name="Chance.by" fundAddress="0x" shortDescription="This is a charity donation fund whihi bla bla bla"/>
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
