<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/header.jpg">
    <DescriptionPlate/>
    <FundCard count="1" name="Chance" fundAddress="0x" shortDescription="This is a charity donation fund whihi bla bla bla"/>
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
