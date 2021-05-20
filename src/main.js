import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";

import "@/ui";

Vue.config.productionTip = false;

new Vue({
  el: "#container",
  store,
  router,
  render: (h) => h(App),
});
