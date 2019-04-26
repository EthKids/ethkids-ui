<template>
  <div id="app">
    <fixed-header>
      <div class="navbar">
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
import FixedHeader from 'vue-fixed-header'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import CustomFooter from '@/components/CustomFooter';

export default {
  components: {
    FixedHeader,
    FontAwesomeIcon,
    CustomFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.icon {
  padding-left: 30px;
  width: 35px;
  color: black;
}
</style>
