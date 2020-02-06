<template>
  <div class="row">
    <div class="col-sm">
      <h3>
        Audit trail
      </h3>
      <div class="row">
        <div class="col-sm-6">
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
        <div class="col-sm-6">
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
          <div class="row" v-for="item in this.$store.state.communityTransfers">
            <div class="col-4">
              <a v-bind:href="item.link" target="_blank">{{ item.amount }} USD</a>
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
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LogTrail",
  data() {
    return {

    };
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity') {
        var eventTxs = new Set();
        var transfersTxs = new Set()
        /*self.$store.state.communityInstance().events.LogDonationReceived({fromBlock: self.$store.state.communityCreationBlock}, (e, event) => {
          //dodgy duplicates
          if (eventTxs.has(event.transactionHash)) return;
          eventTxs.add(event.transactionHash);

          window.web3.eth.getBlock(event.blockNumber).then((block) => {
            self.$store.commit('registerCommunityDonation', {
              blockNo: block.number,
              from: event.returnValues.from.toString().substr(0, 12) + '...',
              fullAddress: event.returnValues.from.toString(),
              link: `https://etherscan.io/tx/${event.transactionHash}`,
              amount: parseFloat(window.web3.utils.fromWei(event.returnValues.amount.toString(), 'ether')).toFixed(3),
              when: self.moment(Number(block.timestamp), 'X').fromNow(),
              whenDate: self.moment(Number(block.timestamp), 'X').format('MMMM Do YYYY'),
            });
          });
        })
        self.$store.state.communityInstance().events.LogPassToCharity({fromBlock: self.$store.state.communityCreationBlock}, (e, event) => {
          //dodgy duplicates
          if (transfersTxs.has(event.transactionHash)) return;
          transfersTxs.add(event.transactionHash);

          window.web3.eth.getBlock(event.blockNumber).then((block) => {
            self.$store.commit('registerCommunityTransfer', {
              blockNo: block.number,
              link: `https://etherscan.io/tx/${event.transactionHash}`,
              amount: parseFloat(window.web3.utils.fromWei(event.returnValues.amount.toString(), 'ether')).toFixed(3),
              when: self.moment(Number(block.timestamp), 'X').fromNow(),
              whenDate: self.moment(Number(block.timestamp), 'X').format('MMMM Do YYYY'),
              notes: event.returnValues.ipfsHash,
              notesShort: event.returnValues.ipfsHash.toString().substr(0, 12) + '...',
            });

          });
        })*/
      }
    });
  }
}
</script>

<style scoped>
  .header {
    font-weight: bold;
    background-color: rgb(235, 235, 235);
  }

</style>
