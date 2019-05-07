<template>
  <div id="app">
    <fixed-header>
      <div>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        <a href="teleta" class="icon">
          <font-awesome-icon size="lg" :icon="['fab', 'telegram-plane']"/>
        </a>
        <a href="github" class="icon">
          <font-awesome-icon size="lg" :icon="['fab', 'github']"/>
        </a>
      </div>
    </fixed-header>
    <router-view/>
    <custom-footer/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import FixedHeader from 'vue-fixed-header'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import CustomFooter from '@/components/CustomFooter'

export default {
  components: {
    FixedHeader,
    FontAwesomeIcon,
    CustomFooter
  },
  data() {
    return {
      isLoading: false,
      loaderText: '',
    };
  },
  beforeCreate() {
    const self = this;
    //subscriptions
    this.$store.subscribe((mutation) => {

    });

    //dispatchers
    this.$store.dispatch('registerWeb3').then(() => {
      this.$store.dispatch('registerContracts');
    });

  }
}
</script>

<style>
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
</style>
