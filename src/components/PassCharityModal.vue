<template>
  <modal class="pass-modal"
         v-if="passModal"
         @close="passModal = false">
    <div slot="header">
      Pass funds further to charity
    </div>
    <div slot="subheader">
      Chance.by
    </div>
    <div slot="body">
      <div class="form-group text-center">
        <vue-numeric
          id="pass-input"
          class="form-control"
          v-model="passFunds"
          currency="ΞTH"
          currency-symbol-position="suffix"
          v-bind:min="0"
          v-bind:max="Number(this.$store.state.charityVaultBalance)"
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
      <b-button class="btn-primary custom-btn-action"
                variant="primary"
                @click="transfer()">
        {{this.btnText}}
      </b-button>
    </div>
  </modal>
</template>

<script>
import VueNumeric from 'vue-numeric';
import Modal from '@/components/Modal';
import EventBus from '@/utils/event-bus';

export default {
    name: 'PassCharityModal',
    components: {
        Modal,
        VueNumeric,
    },
    data() {
        return {
            btnText: 'Transfer',
            passModal: false,
            passFunds: 0.1,
            intermediary: null,
            warning: '',
            ipfsHash: '',
        };
    },
    beforeCreate() {
        const self = this;
        EventBus.subscribe('PASS_CHARITY', () => {
            self.passModal = true;
        });
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
            EventBus.publish('OPEN_LOADING', 'Waiting for sending...');
            self.$store.state.communityInstance().methods
                .passToCharity(window.web3.utils.toWei(self.passFunds.toString(), 'ether'), self.intermediary, self.ipfsHash)
                .send({from: self.$store.state.web3.coinbase})
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber == 1) {
                        EventBus.publish('CLOSE_LOADING');
                    }
                })
                .on('receipt', () => {

                })
                .on('error', () => {
                    EventBus.publish('CLOSE_LOADING');
                });
        },
    },
};
</script>

<style scoped>

</style>
