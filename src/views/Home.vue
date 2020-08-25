<template>
  <div>
    <sell-modal/>
    <passive-charity-modal/>
    <confirmation-modal/>
    <HeaderPlate/>
    <div class="container">
      <metamask-warning v-if="!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase || this.$store.state.readOnly"/>
      <network-warning v-if="!(!this.$store.state.web3.isInjected || !this.$store.state.web3.coinbase) &&
                this.$store.state.web3.networkId != this.$store.state.requiredNetwork"/>
      <div class="communities" v-show="this.$store.state.web3.networkId === this.$store.state.requiredNetwork">
        <b-button
          size="lg"
          class="confirmBtn shadow-lg w-25"
          @click="openPassiveCharity()"
        >
          Passive charity
        </b-button>
        <FundCard name="Chance.by"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MetamaskWarning from '@/components/MetamaskWarning';
import NetworkWarning from '@/components/NetworkWarning';
import FundCard from '@/components/FundCard.vue'
import HeaderPlate from '@/components/HeaderPlate'
import PassiveCharityModal from "../components/PassiveCharityModal";
import SellModal from "@/components/SellModal";
import ConfirmationModal from "@/components/ConfirmationModal";

export default {
  name: 'Home',
  components: {
    PassiveCharityModal,
    MetamaskWarning,
    NetworkWarning,
    FundCard,
    HeaderPlate,
    SellModal,
    ConfirmationModal,
  },
  methods: {
    openPassiveCharity() {
      EventBus.publish('SHOW_PASSIVE_CHARITY', {});
    },
  }
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
