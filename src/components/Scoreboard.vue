<template>
  <div class="row justify-content-center">
    <div class="col-sm-6">
      <h3>
        Top donators
      </h3>
      <div v-for="address in donators" class="row" v-bind:class="{ highlighted: address.counter==2}">
        <div class="col-2">
          {{address.counter}}
        </div>
        <div class="col-8">
          {{address.address}}
        </div>
        <div class="col">
          {{address.amount}} ΞTH
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scoreboard",
  data() {
    return {
      donators: [{
        counter: 1,
        address: '0x9c9550871C8d714e90eE03E610B21F156381bDF1',
        amount: 15
      }, {
        counter: 2,
        address: '0x9c9550871C8d714e90eE03E610B21F156381bDF1',
        amount: 11
      }, {
        counter: 3,
        address: '0x9c9550871C8d714e90eE03E610B21F156381bDF1',
        amount: 5
      }]
    }
  },

}
</script>

<style scoped>

</style>
