import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import 'vue2-event-calendar/default.css'
import Calendar from 'vue2-event-calendar'

Vue.component('Calendar', Calendar)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
