<template>
  <modal v-if="showModal"
         @close="showModal = false">
    <div slot="body">
      <div v-if="showWaiting" slot="header" class="">
        <b-spinner style="width: 5rem; height: 5rem;" variant="primary" label="Spinning"></b-spinner>
      </div>
      <div v-if="showDone" slot="header" class="">
        <font-awesome-icon icon="check-circle" style="width: 5rem; height: 5rem;" color="green"/>
      </div>
    </div>
    <div slot="body">
      <div v-if="showWaiting" class="secondary mt-2 boldText biggestText">
        Waiting For Confirmation
      </div>
      <div v-if="showDone" class="primary mt-2 boldText biggestText">
        Transaction Submitted
      </div>
      <div v-if="showWaiting" class="primary mt-2 bolderText">
        {{ waitingData.msg }}
      </div>
      <div v-if="showDone" class="primary mt-2 bolderText">
        {{ doneData.msg }}
      </div>
      <div v-if="showWaiting" class=" mt-2 smallerText">
        Confirm this transaction in your wallet
      </div>
      <div v-if="showDone" class=" mt-2 smallerText">
        <a v-bind:href="$store.state.etherscan + '/tx/' + doneData.tx" target="_blank">View on Etherscan</a>
      </div>
    </div>
    <div slot="buttons">
      <b-button
        v-if="showDone"
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

export default {
  name: "ConfirmationModal",
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      showWaiting: false,
      showDone: false,
      waitingData: {},
      doneData: {},
    }
  },
  beforeCreate() {
    const self = this;
    EventBus.subscribe('SHOW_CONFIRMATION_WAITING', (data) => {
      self.waitingData = data;
      self.showModal = true;
      self.showWaiting = true;
      self.showDone = false;
    });
    EventBus.subscribe('SHOW_CONFIRMATION_DONE', (data) => {
      self.showModal = true;
      self.showWaiting = false;
      self.doneData = data;
      self.showDone = true;
    });
    EventBus.subscribe('CLOSE_CONFIRMATION_WAITING', () => {
      self.showModal = false;
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
