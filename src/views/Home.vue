<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/header.jpg">
    <DescriptionPlate/>
    <div class="row justify-content-center">
      <h2>
        1
      </h2>
    </div>
    <FundCard name="Chance.by" fundAddress="0x" shortDescription="This is a charity donation fund whihi bla bla bla"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FundCard from '@/components/FundCard.vue'
import DescriptionPlate from '@/components/DescriptionPlate'

export default {
  name: 'home',
  components: {
    FundCard,
    DescriptionPlate
  }
}
</script>
