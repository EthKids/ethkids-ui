<template>
  <div id="app">
    <loading
      :active.sync="isLoading"
      loader="bars"
      color="#007bff"
      background-color="#F1D7AD">
      <div slot="after" class="vld-text">
        {{ loaderText }}
      </div>
    </loading>
    <router-view/>
    <custom-footer/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Loading from 'vue-loading-overlay';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import CustomFooter from '@/components/CustomFooter'
import Modal from '@/components/Modal';
import EventBus from '@/utils/event-bus';

export default {
  components: {
    Loading,
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
  @import "../node_modules/vue-select/src/scss/vue-select.scss";

  #app {
    font-family: 'Cairo', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  @font-face {
    font-family: "Arista";
    src: url("./assets/fonts/Arista2.0.ttf");
  }

  .niceFont {
    font-family: Arista;
    letter-spacing: 2px;
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
    color: #ff0065;
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

  .custom-btn-action.disabled, .custom-btn-action:disabled {
    color: #fff;
    background-color: #9e9e9e;
    border-color: #9e9e9e;
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

  .confirmBtn {
    background-color: #FA616E;
    color: white;
    margin: 10px;
  }

  .confirmBtn:hover {
    background-color: #a10342;
  }

  .secondary {
    color: #FA616E;
  }

  .secondary a {
    color: #FA616E;
  }

  .secondary-background {
    background-color: #FA616E;
  }

  .smallerText {
    font-size: 14px;
  }

  .biggestText {
    font-size: 26px;
  }

  .bolderText {
    font-weight: 600;
  }

  .boldText {
    font-weight: 700;
  }

</style>
