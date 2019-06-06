<template>
  <div>
    <footer class="home text-center">
      <div class="copyright">
        Join our <a href="https://t.me/joinchat/K1v4ShPV57D0zfjybfRFDQ" target="_blank">Telegram</a>
        <br>
        &copy; {{ currentYear }} EthKids.io. All Rights Reserved.
        <br>
        <a href="mailto:info.ethkids@gmail.com"> info.ethkids@gmail.com</a>
        <div>
          Support us: 0xDdC0E4931936d9F590Ccb29f7f4758751479d0A8
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
