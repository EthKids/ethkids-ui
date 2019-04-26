<template>
  <div>
    <footer class="home text-center">
      <div class="copyright">
        &copy; {{ currentYear }} EthKids.io. All Rights Reserved.
        <br>
        <a href="mailto:kivanov82@yahoo.com"> kivanov82@yahoo.com</a>
        <div>
          Support us: 0x9c9550871C8d714e90eE03E610B21F156381bDF1
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'CustomFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
  footer {
    margin-top: 100px;
    width: 100%;
    font-size: 14px;
    line-height: 22px;
  }

  footer .copyright {
    margin-top: 10px;
  }
</style>
