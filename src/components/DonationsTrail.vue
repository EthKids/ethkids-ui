<template>
  <div>
    <span class="bigText">
      Donation trail
    </span>
    <br>
    <div class="row header">
      <div class="col-4">
        From
      </div>
      <div class="col-4">
        Donated
      </div>
      <div class="col-4">
        When
      </div>
    </div>
    <div
      class="row"
      v-for="item in items"
      v-bind:class="{ highlighted: item.fullAddress == $store.state.web3.coinbase}"
      v-bind:key="item.link">
      <div class="col-4">
        {{ item.from }}
      </div>
      <div class="col-4">
        <a v-bind:href="item.link" target="_blank">{{ item.amount }} ΞTH</a>
      </div>
      <div class="col-4">
        <div v-b-tooltip.hover v-bind:title="item.whenDate">
          {{ item.when }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import State from "@/mixins/State";
import KyberAPI from "@/services/KyberApi";

export default {
  name: "DonationsTrail",
  mixins: [State],
  props: {
    name: String,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity' && mutation.payload.name === this.name) {
        var eventTxs = new Set();
        if (self.$store.state.readOnly) {
          //search past blocks
          mutation.payload.contract().getPastEvents('LogDonationReceived', {fromBlock: self.$store.state.registryCreationBlock,}, (e, events) => {
            for (const event of events) {
              self.onDonationReceived(event, eventTxs, self);
            }
          });
        } else {
          //live listening
          mutation.payload.contract().events.LogDonationReceived({fromBlock: self.$store.state.registryCreationBlock}, (e, event) => {
            self.onDonationReceived(event, eventTxs, self);
          });
        }
      }
    });
  },
  methods: {
    onDonationReceived(event, eventTxs, self) {
      //dodgy duplicates
      if (eventTxs.has(event.transactionHash)) return;
      eventTxs.add(event.transactionHash);

      this.xWeb3().web3Instance.eth.getBlock(event.blockNumber).then((block) => {
        self.$store.commit('registerCommunityDonation', {
          name: this.name,
          blockNo: block.number,
          from: event.returnValues.from.toString().substr(0, 12) + '...',
          fullAddress: event.returnValues.from.toString(),
          link: `${this.$store.state.etherscan}/tx/${event.transactionHash}`,
          amount: parseFloat(this.fromWei(event.returnValues.amount)).toFixed(3),
          when: self.moment(Number(block.timestamp), 'X').fromNow(),
          whenDate: self.moment(Number(block.timestamp), 'X').format('MMMM Do YYYY'),
        });
        self.items = self.community(self.name).communityDonations;
      });
    },
  }
}
</script>

<style scoped>
.header {
  font-weight: bold;
  background-color: rgb(235, 235, 235);
}

</style>
