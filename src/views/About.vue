<template>
  <div class="container">
    <h1>{{msg}}</h1>

    <h3>
      What is it for
    </h3>

    <h3>
      How it works
    </h3>

    <h3>
      How funds get to the charity fund
    </h3>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      msg: 'This is an about page',
    };
  },
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 100px 10px 0px 10px;
    height: 100vh;
  }
</style>
