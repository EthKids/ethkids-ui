<template>
  <div>
    <h3>
      Transferred to charity
    </h3>
    <div class="row header">
      <div class="col-4">
        Amount
      </div>
      <div class="col-4">
        When
      </div>
      <div class="col-4">
        Notes
      </div>
    </div>
    <div class="row"
         v-for="item in items"
         v-bind:key="item.whenDate">
      <div class="col-4">
        <a v-bind:href="item.link" target="_blank">{{ item.amount }} ETH</a>
      </div>
      <div class="col-4">
        <div v-b-tooltip.hover v-bind:title="item.whenDate">
          {{ item.when }}
        </div>
      </div>
      <div class="col-4">
        <div v-b-tooltip.hover v-bind:title="item.notes">
          {{ item.notesShort }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import State from "@/mixins/State";

export default {
  name: "TransfersTrail",
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
          mutation.payload.contract().getPastEvents('LogPassToCharity', {fromBlock: self.$store.state.registryCreationBlock,}, (e, events) => {
            for (const event of events) {
              self.onTransferReceived(event, eventTxs, self);
            }
          });
        } else {
          //live listening
          mutation.payload.contract().events.LogPassToCharity({fromBlock: self.$store.state.registryCreationBlock}, (e, event) => {
            self.onTransferReceived(event, eventTxs, self);
          });
        }
      }
    });
  },
  methods: {
    onTransferReceived(event, transfersTxs, self) {
      //dodgy duplicates
      if (transfersTxs.has(event.transactionHash)) return;
      transfersTxs.add(event.transactionHash);

      this.xWeb3().web3Instance.eth.getBlock(event.blockNumber).then((block) => {
        self.$store.commit('registerCommunityTransfer', {
          name: this.name,
          blockNo: block.number,
          link: `https://etherscan.io/tx/${event.transactionHash}`,
          amount: parseFloat(this.fromWei(event.returnValues.amount.toString(), 'ether')).toFixed(2),
          when: self.moment(Number(block.timestamp), 'X').fromNow(),
          whenDate: self.moment(Number(block.timestamp), 'X').format('MMMM Do YYYY'),
          notes: event.returnValues.ipfsHash,
          notesShort: event.returnValues.ipfsHash.toString().substr(0, 12) + '...',
        });
        self.items = self.community(self.name).communityTransfers;
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
