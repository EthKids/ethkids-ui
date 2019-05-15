import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faLink, faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {faTelegramPlane, faTwitter, faVk, faFacebookF, faYoutube, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import moment from 'moment'

Vue.use(BootstrapVue)
library.add(faLink, faTelegramPlane, faTwitter, faVk, faFacebookF, faYoutube, faInstagram, faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
