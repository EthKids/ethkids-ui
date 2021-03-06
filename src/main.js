import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faLink, faAddressCard, faInfoCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {faTelegramPlane, faTwitter, faVk, faFacebookF, faYoutube, faInstagram, faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import moment from 'moment'
import vSelect from 'vue-select'
import {createProvider} from './vue-apollo'


Vue.use(BootstrapVue)
library.add(faLink, faInfoCircle, faCheckCircle, faTelegramPlane, faTwitter, faVk, faFacebookF, faYoutube, faInstagram, faGithub, faLinkedin);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-select', vSelect)
Vue.config.productionTip = false;
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  apolloProvider: createProvider({aaveUrl: store.state.aaveGraphQL}),
  render: h => h(App)
}).$mount('#app')
