<template>
  <div class="main">
    <div class="about">
      <div class="fundImage">
        <img src="http://www.chance.by/upload/iblock/a0c/320h200_cvetnoy.jpg" title="Фонд 'ШАНС'">
      </div>
      <div class="fundText">
        <div class="fundDescription">
          <div>Chance.by</div>
          <div>Lorem ipsum dolor sit amet, sed te brute deserunt vulputate, singulis reprehendunt ei vim.</div>
          <div>
            Lorem ipsum dolor sit amet, sed te brute deserunt vulputate, singulis reprehendunt ei vim. Ei sit laoreet perpetua. Causae explicari vim
            an, per te percipit appellantur, quo ad suas omnesque. An illud labore pri, fabulas volutpat per ut. Duo ea utamur adipiscing, mel eu
            eligendi menandri, et doming mnesarchum dissentias pro. Verterem maluisset has te, duo epicurei dissentias id.

            Mel te esse tractatos. Has ea omnes percipitur, odio doctus integre ex pro. Et mea aeque nostrud delenit. Ius ne numquam quaerendum
            ullamcorper.
            <p>906 helped children</p>
            <p>10 active years</p>
            <p>$13,615,100 raised in donations</p>
            <p>11 employees</p>
          </div>
        </div>
        <div class="social">
          <ul>
            <li>
              <a href="https://www.chance.by/">https://www.chance.by/</a>
            </li>
            <li>
              <a href="https://twitter.com/FondChance">
                <font-awesome-icon size="lg" :icon="['fab', 'twitter']"/>
              </a>
            </li>
            <li>
              <a href="https://vk.com/chance_foundation">
                <font-awesome-icon size="lg" :icon="['fab', 'vk']"/>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/FoundationChanceBelarus">
                <font-awesome-icon size="lg" :icon="['fab', 'facebook-f']"/>
              </a>
            </li>
            <li>
              <a href="http://www.youtube.com/user/chancefond">
                <font-awesome-icon size="lg" :icon="['fab', 'youtube']"/>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/chance_foundation/">
                <font-awesome-icon size="lg" :icon="['fab', 'instagram']"/>
              </a>
            </li>
          </ul>
        </div>
        <div class="actions">
          <input
            class="btn btn-primary eth-btn-purple"
            type="button"
            value="Donate"
            @click="playDemo()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fund',
}
</script>

<style scoped>
  .main {
    padding: 100px 20px 0px 20px;
    height: 100vh;
  }

  .about {
    display: table;
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

  .social {
    margin-top: 50px;
  }

  ul {
    text-align: right;
    min-width: 140px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  ul li {
    display: inline-block;
    padding: 0 20px;
  }

  a {
    display: table;
  }

  a:hover {
    color: #ffbc4e;
  }

  .label {
    font-size: 16px;
    vertical-align: middle;
    padding: 8px;
    display: none;
  }

</style>
