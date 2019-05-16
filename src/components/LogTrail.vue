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
            <div class="col-sm-4">
              From
            </div>
            <div class="col-sm-4">
              Donated
            </div>
            <div class="col-sm-4">
              When
            </div>
          </div>
          <div class="row" v-for="item in donations">
            <div class="col-sm-4">
              {{ item.from }}
            </div>
            <div class="col-sm-4">
              <a v-bind:href="item.link">{{ item.amount }} ΞTH</a>
            </div>
            <div class="col-sm-4">
              {{ item.when }}
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <h3>
            Transferred to charity
          </h3>
          <div class="row header">
            <div class="col-sm-4">
              Amount
            </div>
            <div class="col-sm-4">
              When
            </div>
            <div class="col-sm-4">
              Notes
            </div>
          </div>
          <div class="row" v-for="item in transfers">
            <div class="col-sm-4">
              <a v-bind:href="item.link">{{ item.amount }} ΞTH</a>
            </div>
            <div class="col-sm-4">
              {{ item.when }}
            </div>
            <div class="col-sm-4">
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
      donations: [],
      transfers: [],
    };
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity') {
        var eventTxs = new Set();
        var transfersTxs = new Set()
        self.$store.state.communityInstance().events.LogDonationReceived({fromBlock: self.$store.state.communityCreationBlock}, (e, event) => {
          //dodgy duplicates
          if (eventTxs.has(event.transactionHash)) return;
          eventTxs.add(event.transactionHash);

          window.web3.eth.getBlockNumber().then((currentBlock) => {
            self.donations.unshift({
              from: event.returnValues.from.toString().substr(0, 16) + '...',
              link: `https://etherscan.io/tx/${event.transactionHash}`,
              amount: parseFloat(window.web3.utils.fromWei(event.returnValues.amount.toString(), 'ether')).toFixed(3),
              when: self.moment().subtract((Number(currentBlock) - Number(event.blockNumber)) * 14, 's').fromNow(),
            });

          });
        })
        self.$store.state.communityInstance().events.LogPassToCharity({fromBlock: self.$store.state.communityCreationBlock}, (e, event) => {
          //dodgy duplicates
          if (transfersTxs.has(event.transactionHash)) return;
          transfersTxs.add(event.transactionHash);

          window.web3.eth.getBlockNumber().then((currentBlock) => {
            self.transfers.unshift({
              link: `https://etherscan.io/tx/${event.transactionHash}`,
              amount: parseFloat(window.web3.utils.fromWei(event.returnValues.amount.toString(), 'ether')).toFixed(3),
              when: self.moment().subtract((Number(currentBlock) - Number(event.blockNumber)) * 14, 's').fromNow(),
              notes: event.returnValues.ipfsHash,
              notesShort: event.returnValues.ipfsHash.toString().substr(0, 16) + '...',
            });

          });
        })
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
