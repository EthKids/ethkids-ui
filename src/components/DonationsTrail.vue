<template>
  <div>
    <h3>
      Last donations
    </h3>
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
    <div class="row" v-for="item in this.$store.state.communityDonations"
         v-bind:class="{ highlighted: item.fullAddress == $store.state.web3.coinbase}">
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

export default {
  name: "DonationsTrail",
  data() {
    return {};
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity') {
        var eventTxs = new Set();
        if (self.$store.state.readOnly) {
          //search past blocks
          self.$store.state.communityInstance().getPastEvents('LogDonationReceived', {fromBlock: self.$store.state.communityCreationBlock,}, (e, events) => {
            for (const event of events) {
              self.onDonationReceived(event, eventTxs, self);
            }
          });
        } else {
          //live listening
          self.$store.state.communityInstance().events.LogDonationReceived({fromBlock: self.$store.state.communityCreationBlock}, (e, event) => {
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

      window.web3.eth.getBlock(event.blockNumber).then((block) => {
        self.$store.commit('registerCommunityDonation', {
          blockNo: block.number,
          from: event.returnValues.from.toString().substr(0, 12) + '...',
          fullAddress: event.returnValues.from.toString(),
          link: `${this.$store.state.etherscan}/tx/${event.transactionHash}`,
          amount: parseFloat(window.web3.utils.fromWei(event.returnValues.amount.toString(), 'ether')).toFixed(3),
          when: self.moment(Number(block.timestamp), 'X').fromNow(),
          whenDate: self.moment(Number(block.timestamp), 'X').format('MMMM Do YYYY'),
        });
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
