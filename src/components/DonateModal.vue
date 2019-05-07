<template>
  <modal class="donate-modal"
         v-if="donateModal"
         @close="donateModal = false">
    <div slot="header">
      Donate to charity
    </div>
    <div slot="subheader">
      Chance.by
    </div>
    <div slot="body">
      <div class="form-group text-center">
        <vue-numeric
          id="donation-input"
          class="form-control"
          v-model="donation"
          currency="ΞTH"
          currency-symbol-position="suffix"
          v-bind:min="0"
          v-bind:minus="false"
          focus="focus"
          v-bind:precision="3"/>
      </div>
      <b-button class="btn-primary custom-btn-action"
                variant="primary"
                @click="donate()">
        Donate
      </b-button>
    </div>
  </modal>
</template>

<script>
import VueNumeric from 'vue-numeric';
import Modal from '@/components/Modal';
import EventBus from '@/utils/event-bus';

export default {
  name: 'DonateModal',
  components: {
    Modal,
    VueNumeric,
  },
  data() {
    return {
      donateModal: false,
      donation: 0.1,
    };
  },
  beforeCreate() {
    const self = this;
    EventBus.subscribe('OPEN_DONATE', () => {
      self.donateModal = true;
    });
  },
  methods: {
    donate() {
      const self = this;
      self.donateModal = false;
      self.$emit('show-loading', 'Processing your transaction...');
      self.$store.state.communityInstance().methods
        .donate()
        .send({from: self.$store.state.web3.coinbase, value: window.web3.utils.toWei(self.donation.toString(), 'ether')})
        .on('confirmation', () => {
        })
        .on('receipt', () => {
          self.$emit('hide-loading');
        })
        .on('error', () => {
          self.$emit('hide-loading');
        });
    },
  },
};
</script>

<style scoped>

</style>
