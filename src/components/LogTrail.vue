<template>
  <div class="row">
    <div class="col-sm">
      <h3>
        Log trail
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
            Outcome
          </h3>
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

    };
  },
  mounted() {
    const self = this;
    this.$store.subscribe((mutation) => {
      if (mutation.type == 'registerCommunity') {
        self.$store.state.communityInstance().events.LogDonationReceived({fromBlock: self.$store.state.communityCreationBlock}, (e, event) => {
          window.web3.eth.getBlockNumber().then((currentBlock) => {
            self.donations.push({
              from: event.returnValues.from.toString().substr(0, 16) + '...',
              link: `https://etherscan.io/tx/${event.transactionHash}`,
              amount: parseFloat(window.web3.utils.fromWei(event.returnValues.amount.toString(), 'ether')).toFixed(3),
              when: self.moment(Number(currentBlock) - Number(event.blockNumber) * 14, "s").fromNow(),
            })
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
