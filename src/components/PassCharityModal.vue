<template>
  <modal class="pass-modal"
         v-if="passModal"
         @close="passModal = false">
    <div slot="header">
      Pass funds further to charity
    </div>
    <div slot="subheader">
      {{ title }}
    </div>
    <div slot="body">
      <div class="form-group text-center">
        <vue-numeric
          id="pass-input"
          class="form-control"
          v-model="passFunds"
          currency="ETH"
          currency-symbol-position="suffix"
          v-bind:min="0"
          v-bind:max="Number(vaultBalance)"
          v-bind:minus="false"
          focus="focus"
          v-bind:precision="3"/>
      </div>
      <div class="form-group text-center">
        <b-form-input v-model="intermediary" placeholder="Enter the intermediary address"></b-form-input>
        <div class="mt-2 text-danger">{{ warning }}</div>
      </div>
      <div class="form-group text-center">
        <b-form-input v-model="ipfsHash" placeholder="Describe the precise destination of the taken funds"></b-form-input>
      </div>
    </div>
    <div slot="buttons">
      <b-button
        size="lg"
        class="confirmBtn shadow-lg w-75"
        v-on:click="transfer()">
        {{ this.btnText }}
      </b-button>
    </div>
  </modal>
</template>

<script>
import VueNumeric from 'vue-numeric';
import Modal from '@/components/Modal';
import EventBus from '@/utils/event-bus';
import State from "@/mixins/State";

export default {
  name: 'PassCharityModal',
  mixins: [State],
  props: {
    name: String,
    title: String,
  },
  components: {
    Modal,
    VueNumeric,
  },
  data() {
    return {
      btnText: 'Transfer',
      passModal: false,
      vaultBalance: 0,
      passFunds: 0,
      intermediary: null,
      warning: '',
      ipfsHash: '',
    };
  },
  beforeCreate() {
    const self = this;
    EventBus.subscribe('PASS_CHARITY', (arg) => {
      if (arg.community === self.name) {
        self.passModal = true;
        self.passFunds = Math.floor(Number(self.vaultBalance) * 100) / 100;
      }
    });
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCharityVaultBalance' && mutation.payload.name === this.name) {
        self.vaultBalance = mutation.payload.balance;
      }
    })
  },
  methods: {
    transfer() {
      const self = this;
      if (!window.web3.utils.isAddress(self.intermediary)) {
        self.warning = 'Wrong Ethereum address';
        return;
      } else {
        self.warning = '';
      }
      self.passModal = false;
      EventBus.publish('SHOW_CONFIRMATION_WAITING', {msg: 'Passing ' + self.passFunds.toString() + ' ETH'});
      self.community(self.name).contract().methods
        .passToCharityWithInterest(window.web3.utils.toWei(self.passFunds.toString(), 'ether'),
          self.intermediary,
          self.ipfsHash,
          self.$store.state.dai,
          self.$store.state.adai)
        .send({from: self.$store.state.web3.coinbase})
        .on('transactionHash', (transactionHash) => {
          EventBus.publish('SHOW_CONFIRMATION_DONE', {tx: transactionHash});
          EventBus.publish('TX_CONFIRMING');
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          EventBus.publish('TX_CONFIRMED');
        })
        .on('error', () => {
          EventBus.publish('CLOSE_CONFIRMATION_WAITING');
          self.passModal = true;
        });
    },
  },
};
</script>

<style scoped>

</style>
