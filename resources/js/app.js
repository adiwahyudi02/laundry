import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import router from './router'
import store from './store'

import axios from 'axios'

const user = JSON.parse(localStorage.getItem('auth'));
if (user) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + user.token
}

//apexchart
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)


//format money
Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
  });
  return formatter.format(value);
});

//mapbox
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
Vue.use(VueMapbox, { mapboxgl: Mapbox });

const app = new Vue({
    el: '#app',
    router,
    store
});