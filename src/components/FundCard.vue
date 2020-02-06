<template>
  <div class="container fundContainer">
    <donate-modal/>
    <pass-charity-modal/>
    <sell-modal/>
    <div class="col-12">
      <div>
        <h2 class="mt-0">{{name}}</h2>
        <h6>
          <a href="https://www.eng.chance.by/" target="_blank">https://www.chance.by</a>
        </h6>
        <ul class="social list-inline">
          <li class="list-inline-item">
            <a href="https://twitter.com/FondChance" class="icon">
              <font-awesome-icon size="lg" :icon="['fab', 'twitter']"/>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://vk.com/chance_foundation" class="icon">
              <font-awesome-icon size="lg" :icon="['fab', 'vk']"/>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://www.facebook.com/FoundationChanceBelarus" class="icon">
              <font-awesome-icon size="lg" :icon="['fab', 'facebook-f']"/>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="http://www.youtube.com/user/chancefond" class="icon">
              <font-awesome-icon size="lg" :icon="['fab', 'youtube']"/>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://www.instagram.com/chance_foundation/" class="icon">
              <font-awesome-icon size="lg" :icon="['fab', 'instagram']"/>
            </a>
          </li>
        </ul>

      </div>

      <div class="fundDescription">
        <p>
          Chance.by is the charity fund that helps children with severe diseases to raise funds for urgently required medicine or surgeries.
        </p>
        <p>
          The fund in established back in 2008 in Belarus by a group of like minded people under a common idea:
          to make sure children who need medical care will get it regardless of the financial situation of their family.
          <br>
          Since 2009 the number of people and companies who donate to the fund has been continually expanding.
          <br>
          In 2013 Chance.by has signed the partnership with the Ministry of Health of Republic Belarus to find the systematic solution for helping
          children.
          <br>
          During the past years, over <strong>870 children</strong> got medical help for a total amount of <strong>$12 890 000</strong>
        </p>
      </div>
    </div>
    <FundFinancialState/>
    <div class="row justify-content-center">
      <div class="actions">
        <input
          class="btn btn-primary btn-lg custom-btn-action"
          type="button"
          value="Donate"
          @click="donate()"/>
      </div>
      <div v-show="this.isAdmin" class="actions">
        <input
          class="btn btn-primary btn-lg custom-btn-action"
          type="button"
          value="Pass to charity"
          @click="passCharity()"/>
      </div>
    </div>
    <hr>

    <LogTrail/>
  </div>

</template>

<script>
import EventBus from '@/utils/event-bus';
import FundFinancialState from '@/components/FundFinancialState'
import LogTrail from '@/components/LogTrail'
import Scoreboard from '@/components/Scoreboard'
import DonateModal from '@/components/DonateModal';
import PassCharityModal from '@/components/PassCharityModal';
import SellModal from '@/components/SellModal';

export default {
  name: 'FundCard',
  props: {
    name: String,
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  methods: {
    donate() {
      EventBus.publish('OPEN_DONATE');
    },
    passCharity() {
      EventBus.publish('PASS_CHARITY');
    },
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity') {
        self.$store.state.communityInstance().methods.isSigner(self.$store.state.web3.coinbase).call().then((isSigner) => {
          self.isAdmin = isSigner;
        });
      }
    });
  },
  components: {
    FundFinancialState,
    LogTrail,
    Scoreboard,
    DonateModal,
    PassCharityModal,
    SellModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fundContainer {
    border: 1px dashed #b8b8b8;
    border-radius: 10px;
  }

  .social {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  ul {
    text-align: left;
  }

  ul li {
    display: inline-block;
  }

  .fundDescription {
    text-align: left;
    text-justify: inter-word;
  }

</style>
