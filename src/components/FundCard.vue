<template>
  <div class="container fundContainer">
    <donate-modal/>
    <div class="row">
      <div class="col-sm-8">
        <div class="media">
          <div class="col-sm">
            <img class="mr-3" src="http://www.chance.by/upload/iblock/a0c/320h200_cvetnoy.jpg" title="Фонд 'ШАНС'">
            <ul class="social">
              <li>
                <a href="https://twitter.com/FondChance" class="icon">
                  <font-awesome-icon size="lg" :icon="['fab', 'twitter']"/>
                </a>
              </li>
              <li>
                <a href="https://vk.com/chance_foundation" class="icon">
                  <font-awesome-icon size="lg" :icon="['fab', 'vk']"/>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/FoundationChanceBelarus" class="icon">
                  <font-awesome-icon size="lg" :icon="['fab', 'facebook-f']"/>
                </a>
              </li>
              <li>
                <a href="http://www.youtube.com/user/chancefond" class="icon">
                  <font-awesome-icon size="lg" :icon="['fab', 'youtube']"/>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/chance_foundation/" class="icon">
                  <font-awesome-icon size="lg" :icon="['fab', 'instagram']"/>
                </a>
              </li>
            </ul>
          </div>
          <div class="media-body">
            <h2 class="mt-0">{{name}}</h2>
            <h6>
              <a href="https://www.chance.by/">https://www.chance.by</a>
            </h6>
            Lorem ipsum dolor sit amet, sed te brute deserunt vulputate, singulis reprehendunt ei vim.

            Lorem ipsum dolor sit amet, sed te brute deserunt vulputate, singulis reprehendunt ei vim.
          </div>
        </div>

        <div class="fundDescription">
          <p>
            Lorem ipsum dolor sit amet, sed te brute deserunt vulputate, singulis reprehendunt ei vim.

            Lorem ipsum dolor sit amet, sed te brute deserunt vulputate, singulis reprehendunt ei vim. Ei sit laoreet perpetua. Causae explicari vim
            an, per te percipit appellantur, quo ad suas omnesque. An illud labore pri, fabulas volutpat per ut. Duo ea utamur adipiscing, mel eu
            eligendi menandri, et doming mnesarchum dissentias pro. Verterem maluisset has te, duo epicurei dissentias id.

            Mel te esse tractatos. Has ea omnes percipitur, odio doctus integre ex pro. Et mea aeque nostrud delenit. Ius ne numquam quaerendum
            ullamcorper.
          </p>
          <p>906 children helped</p>
          <p>10 years active</p>
          <p>$13,615,100 raised in donations</p>
          <p>11 employees</p>
        </div>
      </div>
      <div class="col-sm">
        <FundFinancialState/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="actions">
        <input
          class="btn btn-primary btn-lg custom-btn-action"
          type="button"
          value="Donate"
          @click="donate()"/>
      </div>
    </div>
    <hr>

    <LogTrail/>
    <Scoreboard/>
  </div>

</template>

<script>
import EventBus from '@/utils/event-bus';
import FundFinancialState from '@/components/FundFinancialState'
import LogTrail from '@/components/LogTrail'
import Scoreboard from '@/components/Scoreboard'
import DonateModal from '@/components/DonateModal';

export default {
  name: 'FundCard',
  props: {
    name: String,
    fundAddress: String,
    shortDescription: String
  },
  methods: {
    donate() {
      EventBus.publish('OPEN_DONATE');
    },
  },
  components: {
    FundFinancialState,
    LogTrail,
    Scoreboard,
    DonateModal,
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
