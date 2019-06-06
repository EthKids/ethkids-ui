<template>
  <div id="app">
    <fixed-header>
      <div>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        <a href="https://t.me/joinchat/K1v4ShPV57D0zfjybfRFDQ" target="_blank" class="icon">
          <font-awesome-icon size="lg" :icon="['fab', 'telegram-plane']"/>
        </a>
        <a href="https://github.com/kivanov82/ethkids-contracts" class="icon" v-b-tooltip.hover v-bind:title="'Smart contracts'">
          <font-awesome-icon size="lg" :icon="['fab', 'github']"/>
        </a>
        <a href="https://github.com/kivanov82/ethkids-ui" class="icon" v-b-tooltip.hover v-bind:title="'User interface'">
          <font-awesome-icon size="lg" :icon="['fab', 'github']"/>
        </a>
      </div>
    </fixed-header>
    <router-view/>
    <custom-footer/>
    <loading
      :active.sync="isLoading"
      loader="bars"
      color="#007bff"
      background-color="#F1D7AD">
      <div slot="after" class="vld-text">
        {{loaderText}}
      </div>
    </loading>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import FixedHeader from 'vue-fixed-header'
import Loading from 'vue-loading-overlay';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import CustomFooter from '@/components/CustomFooter'
import Modal from '@/components/Modal';
import EventBus from '@/utils/event-bus';

export default {
  components: {
    Loading,
    FixedHeader,
    FontAwesomeIcon,
    CustomFooter,
    Modal,
  },
  data() {
    return {
      isLoading: false,
      loaderText: '',
    };
  },
  beforeCreate() {
    const self = this;

    //dispatchers
    this.$store.dispatch('registerWeb3').then(() => {
      this.$store.dispatch('registerContracts');
    });

    EventBus.subscribe('OPEN_LOADING', (text) => {
      self.isLoading = true;
      self.loaderText = text;
    });
    EventBus.subscribe('CLOSE_LOADING', (text) => {
      self.isLoading = false;
    });

  }
}
</script>

<style lang="scss">
  @import '../node_modules/vue-loading-overlay/dist/vue-loading.css';

  #app {
    font-family: 'Cairo', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h1 {
    line-height: 1.3;
    letter-spacing: .1px;
    text-align: center;
    font-weight: 200;
    font-size: 2.75rem;
  }

  h2 {
    font-weight: 300;
  }

  .highlighted {
    color: #ffbc4e;
  }

  a:hover {
    color: #ffbc4e;
  }

  .custom-btn-action {
    background-color: #ffbc4e;
    box-shadow: 0 0 2px #ffbc4e, 0 0 25px rgba(255, 188, 78, 0.58), 0 0 5px rgba(255, 188, 78, 0.15);
    margin: 7px;
  }

  .custom-btn-action:hover {
    background-color: #ffb131;
    box-shadow: 0 0 2px #ffbc4e, 0 0 25px rgba(255, 188, 78, 0.58), 0 0 5px rgba(255, 188, 78, 0.15);
    text-shadow: 0 0 2px #ffbc4e, 0 0 25px rgba(255, 188, 78, 0.58), 0 0 5px rgba(255, 188, 78, 0.15);
  }

  .icon {
    padding-left: 30px;
    color: black;
  }

  .vld-overlay {

  .vld-background {
    opacity: 0.9;
  }

  .vld-icon {
    position: relative;
    width: 100%;
    text-align: center;

  svg {
    width: 120px;
    height: 70px;
  }

  }
  }
  .vld-text {
    color: #5e6bde;
    text-align: center;
    font-size: 24px;
    width: 100%;
  }
</style>
