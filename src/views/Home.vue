<template>
  <div>
    <sell-modal/>
    <passive-charity-modal/>
    <confirmation-modal/>
    <HeaderPlate/>
    <b-button
      size="lg"
      class="confirmBtn shadow-lg w-25"
      @click="openPassiveCharity()"
    >
      Passive charity
    </b-button>
    <div class="p-4">
      <network-warning v-if="this.$store.state.web3.networkId != this.$store.state.requiredNetwork"/>
      <web-three-modal/>
      <b-row align-h="around" class="communities" v-show="this.$store.state.web3.networkId === this.$store.state.requiredNetwork">
        <FundCard
          name="ChanceBY"
          title="Chance.by"
          url="https://www.eng.chance.by/"
          twitter="https://twitter.com/FondChance"
          vk="https://vk.com/chance_foundation"
          fb="https://www.facebook.com/FoundationChanceBelarus"
          youtube="http://www.youtube.com/user/chancefond"
          instagram="https://www.instagram.com/chance_foundation/"
        >
          <div slot="description">
            <p>
              <b>Chance.by</b> is the charity fund that helps children with severe diseases to raise funds for urgently required medicine or
              surgeries. <br>
              The fund in established back in 2008 in Belarus by a group of like minded people under a common idea:
              to make sure children who need medical care will get it regardless of the financial situation of their family.
            </p>
            <p>
              During the past years, over <strong>870 children</strong> got medical help for a total amount of <strong>$12 890 000</strong>
            </p>
          </div>
        </FundCard>
        <FundCard
          name="Kika"
          title="Kika.nl"
          url="https://www.kika.nl/"
          twitter="https://twitter.com/kika8118"
          fb="https://nl-nl.facebook.com/KiKa8118"
          youtube="https://www.youtube.com/user/8118KiKa"
          instagram="https://www.instagram.com/kika_kinderenkankervrij"
          linkedin="https://www.linkedin.com/company/stichting-kinderen-kankervrij-kika-"
        >
          <div slot="description">
            <p>
              Every year, more than <b>550 children in the Netherlands get cancer</b>. At the moment 75% of these children are cured. That must and
              can be improved.
            </p>
            <p>
              Our goal is to increase this percentage to 95%. <strong>KiKa</strong> raises funds for innovative research and other activities in the
              field of childhood cancer, aimed at less pain during treatment, more healing and a higher quality of life later in life.
            </p>
            <p>
              KiKa also focuses on providing information about childhood cancer.
            </p>
          </div>
        </FundCard>
        <FundCard
          name="BySol"
          title="BYSOL"
          url="https://bysol.org/english"
        >
          <div slot="description">
            <p>
              <b>BYSOL</b> supports <b>families</b> who was repressed, prosecuted, or lost their jobs because of participating
              in strikes or peaceful protests in Belarus
            </p>
            <p>
              Thanks to the donations of ordinary citizens we already have more than <b>EUR 1.700.000</b> in our Fund. We offer the compensation of
              1500 euro (500 euro x 3 months) to every repressed person.
            </p>
          </div>
        </FundCard>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NetworkWarning from '@/components/NetworkWarning';
import FundCard from '@/components/FundCard.vue'
import HeaderPlate from '@/components/HeaderPlate'
import PassiveCharityModal from "../components/PassiveCharityModal";
import SellModal from "@/components/SellModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import WebThreeModal from "@/components/WebThreeModal";

export default {
  name: 'Home',
  components: {
    WebThreeModal,
    PassiveCharityModal,
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


</style>
