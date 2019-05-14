<template>
  <div class="check-metamask">
    <div>
      <h2 class="highlighted">Mainnet only</h2>
      <p>Hooray! We're running on Mainnet now, please switch the network.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NetworkWarning',
  data() {
    return {
      btnDisabled: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  .check-metamask {
    padding: 100px 10px 0px 10px;
    display: inline-block;
  }
</style>
