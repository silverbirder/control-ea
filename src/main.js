import Vue from "vue";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.axios = axios
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
