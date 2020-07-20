<template>
  <div>
    <footer class="home text-center">
      <div class="copyright">
        Join our <a href="https://t.me/joinchat/K1v4ShPV57D0zfjybfRFDQ" target="_blank">Telegram</a>
        <br>
        &copy; {{ currentYear }} EthKids.io. All Rights Reserved.
        <br>
        <a href="mailto:info.ethkids@gmail.com"> info.ethkids@gmail.com</a>
      </div>
      <div class="col-md-6 row support">
        <div class="col-lg-6">
          <a href="https://opensea.io/assets/0xcdb3c6176b66fed1b656199bfebc498005975d1e/3" target="_blank">
            <img
              src="https://lh3.googleusercontent.com/952HYYV2ChxyiGXaLy40X56SwbHkSzsvdrrm9UuR2G65kkSDxlwSN0TYOfC21fQw06vP5lASUSXvXihozuudPjwIkg=s250"/>
          </a>
        </div>
        <div class="col-lg-6">
          <b>EthKids</b> is a non-commercial project run be a group of like-minded volunteers.
          <br>
          Your help will enable us to keep running and maintaining this project
          <br>
          Support us:
          <br>
          <b>0xDdC0E4931936d9F590Ccb29f7f4758751479d0A8</b>
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
    margin-top: 50px;
    width: 100%;
    font-size: 14px;
    line-height: 22px;
  }

  footer .copyright {
    margin-top: 10px;
  }

  .support {
    margin: 10px auto 20px auto;
    padding: 1.25rem;
    background-color: #f8f9fa;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
</style>
