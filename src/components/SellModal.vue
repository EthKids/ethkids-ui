<template>
  <modal class="sell-modal"
         v-if="sellModal"
         @close="sellModal = false">
    <div slot="header">
      Sell my {{this.$store.state.tokenSym}}
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
      <strong>≈ {{myReturn}} ΞTH</strong>
      <b-button class="btn-primary custom-btn-action"
                variant="primary"
                @click="sell()">
        Sell
      </b-button>
    </div>
  </modal>
</template>

<script>
import VueNumeric from 'vue-numeric';
import Modal from '@/components/Modal';
import EventBus from '@/utils/event-bus';

export default {
  name: "SellModal",
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
      self.amount = Number(this.$store.state.tokenMyBalance);
      self.estimateSell();
    });
  },
  mounted() {

  },
  methods: {
    estimateSell() {
      if (this.amount > 0) {
        this.$store.state.communityInstance().methods.myReturn(window.web3.utils.toWei(this.amount.toString(), 'ether'))
          .call({from: this.$store.state.web3.coinbase}).then((result) => {
          this.myReturn = parseFloat(window.web3.utils.fromWei(result.toString(), 'ether')).toFixed(3)
        });
      } else {
        this.myReturn = 0;
      }
    },
    sell() {
      const self = this;
      self.sellModal = false;
      EventBus.publish('OPEN_LOADING', 'Processing your transaction...');
      self.$store.state.bondingVaultInstance().methods
        .sell(window.web3.utils.toWei(self.amount.toString(), 'ether'))
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
}
</script>

<style scoped>

</style>
