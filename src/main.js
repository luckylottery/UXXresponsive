import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/main.scss";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueCarousel from "vue-carousel";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { ToggleButton } from "vue-js-toggle-button";
import VueCharts from "vue-chartjs";
import { Bar, Line, Timeseries } from "vue-chartjs";

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
// import { faXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);
library.add(faWindowClose);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueCharts);
Vue.use(Bar, Line);

Vue.use(VueCarousel);

Vue.component("ToggleButton", ToggleButton);
Vue.use(ToggleButton);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

