<template>
  <modal class="sell-modal"
         v-if="sellModal"
         @close="sellModal = false">
    <div slot="header">
      Sell my <b>{{ this.$store.state.tokenSym }}</b>
    </div>
    <div slot="body">
      <div class="form-group text-center">
        <vue-numeric
          id="sell-input"
          class="form-control"
          v-model="amount"
          v-bind:currency="this.$store.state.tokenSym"
          currency-symbol-position="suffix"
          v-bind:min="0"
          v-bind:max="Math.floor(Number(this.$store.state.tokenMyBalance) * 100)/100"
          v-bind:minus="false"
          focus="focus"
          @blur="estimateSell"
          v-bind:precision="2"/>
      </div>
      Estimated return
      <strong>≈ {{ myReturn }} ΞTH</strong>
    </div>
    <div slot="buttons">
      <b-button
        size="lg"
        class="confirmBtn shadow-lg w-75"
        v-on:click="sell()">
        Sell
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
  name: "SellModal",
  mixins: [State],
  components: {
    Modal,
    VueNumeric,
  },
  data() {
    return {
      sellModal: false,
      amount: 0,
      myReturn: 0,
    };
  },
  beforeCreate() {
    const self = this;
    EventBus.subscribe('OPEN_SELL', () => {
      self.sellModal = true;
      self.amount = Math.floor(Number(self.$store.state.tokenMyBalance) * 100) / 100;
      self.estimateSell();
    });
  },
  mounted() {

  },
  methods: {
    estimateSell() {
      if (this.amount > 0) {
        const amount = this.toWei(this.amount);
        this.$store.state.bondingVaultInstance().methods
          .calculateReturn(amount)
          .call({from: this.$store.state.web3.coinbase}).then((result) => {
          this.myReturn = parseFloat(this.fromWei(result)).toFixed(3)
        });
      } else {
        this.myReturn = 0;
      }
    },
    sell() {
      const self = this;
      self.sellModal = false;
      EventBus.publish('SHOW_CONFIRMATION_WAITING', {msg: 'Selling ' + self.amount.toString() + ' ' + self.$store.state.tokenSym});
      self.$store.state.bondingVaultInstance().methods
        .sell(this.toWei(self.amount.toString(), 'ether'))
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
          self.sellModal = true;
        });
    },
  },
}
</script>

<style scoped>

</style>
