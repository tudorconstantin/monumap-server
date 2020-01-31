import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import store from "./store";
import VuePortal from '@linusborg/vue-simple-portal';

Vue.config.productionTip = false

Vue.use(VuePortal, {
   name: 'portal', // optional, use to rename component
 })

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
