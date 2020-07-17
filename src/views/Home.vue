<template>
  <div>
    <DescriptionPlate/>
    <div class="container">
      <metamask-warning v-if="!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase || this.$store.state.readOnly"/>
      <network-warning v-if="!(!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase) &&
                this.$store.state.web3.networkId != this.$store.state.requiredNetwork"/>
      <div class="communities" v-show="this.$store.state.web3.networkId === this.$store.state.requiredNetwork">
        <FundCard name="Chance.by"/>
        <div class="new-community">
          <h5>
            <router-link to="/about">Add your charity community on Ethkids.io</router-link>
          </h5>
        </div>
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
import PassCharityModal from "../components/PassCharityModal";
import PassiveCharityModal from "../components/PassiveCharityModal";

export default {
  name: 'home',
  components: {
    PassiveCharityModal,
    PassCharityModal,
    MetamaskWarning,
    NetworkWarning,
    FundCard,
    DescriptionPlate
  },

}
</script>

<style lang="scss" scoped>
  .masthead {
    height: 20vh;
    min-height: 350px;
    background-image: url('../assets/header.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .new-community {
    margin-top: 50px;
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }
</style>
