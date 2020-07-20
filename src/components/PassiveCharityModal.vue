<template>
  <modal v-if="showModal"
         @close="showModal = false">
    <div slot="body">
      <div slot="header" class="">
      </div>
    </div>
    <div slot="body">
      <passive-charity/>
    </div>
    <div slot="buttons">
      <b-button
        size="lg"
        class="confirmBtn shadow-lg w-75"
        v-on:click="showModal = false">
        Close
      </b-button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Modal';
import PassiveCharity from "./PassiveCharity";

export default {
  name: "PassiveCharityModal",
  components: {
    PassiveCharity,
    Modal,
  },
  data() {
    return {
      showModal: false,
    }
  },
  beforeCreate() {
    const self = this;
    EventBus.subscribe('SHOW_PASSIVE_CHARITY', (data) => {
      self.showModal = true;
    });
  },

}
</script>

<style scoped>

  .confirmBtn {
    background-color: #ff0065;
    color: white;
    margin: 10px;
  }

  .confirmBtn:hover {
    background-color: #a10342;
  }

</style>
