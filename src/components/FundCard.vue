<template>
  <div class="plate" v-on:click="onClickButton">
    <a class="icon">
      {{count}}
    </a>
    <div class="content">
      <div class="fundImage">
        <img src="http://www.chance.by/upload/iblock/a0c/320h200_cvetnoy.jpg" title="Фонд 'ШАНС'">
      </div>
      <div class="fundText">
        <div>{{name}}</div>
        <div>{{shortDescription}}...</div>
        <div>Read more...</div>
      </div>
    </div>
    <div class="fundFinState">
      <div>Token: <a href="https://etherscan.io/address/0xcd979b552b46c49f01c0d0cb9a481976bcd50f7d">CHANCE</a></div>
      <div>Total collected: <a href>{{100}} ETH </a></div>
      <div>Donation fund: <a href>{{10}} ETH</a></div>
      <div>Curve fund: <a href>{{2}} ETH</a></div>
      <div>My tokens: {{15/1500}} CHANCE</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FundCard',
  props: {
    count: String,
    name: String,
    fundAddress: String,
    shortDescription: String
  },
  methods: {
    onClickButton() {
      this.$router.push({path: `/fund/${this.fundAddress}`})
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .plate {
    display: table;
    border: 1px dashed #b8b8b8;
    border-radius: 10px;
    box-shadow: 0 0 15px #929292, 0 0 1px #c4c4c4, 0 0 1px #ececec;
    cursor: hand;
    cursor: pointer;
    height: 250px;
    width: 90%;
    margin-left: 100px;
    margin-right: 100px;
    font-size: 14px;
    line-height: 20px;
  }

  .plate:hover {
    background-color: rgba(238, 238, 238, 0.07);
    box-shadow: 0 0 15px #929292, 0 0 15px #c4c4c4, 0 0 15px #ececec;
  }

  .icon {
    display: table-cell;
    border-right: 1px dashed #b8b8b8;
    vertical-align: middle;
    padding: 13px 0;
    width: 100px;
    font-size: 24px;
    font-weight: bold;
  }

  .content {
    display: table;
  }

  .content div {
    white-space: nowrap;
  }

  .fundImage {
    display: table-cell;
    vertical-align: middle;
    padding: 13px 0;
    width: 350px;
  }

  .fundText {
    padding: 3px 10px;
    display: block;
  }

  .fundFinState {
    display: table-cell;
    border-left: 1px dashed #b8b8b8;
    vertical-align: middle;
    padding: 13px 0;
    width: 200px;
  }

  .fundFinState div {
    white-space: nowrap;
  }

</style>
