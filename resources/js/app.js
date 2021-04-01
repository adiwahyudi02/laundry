import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import router from './router'
import store from './store'


//google maps
import * as VueGoogleMaps from 'vue2-google-maps' 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBYZohvBkfuYwNe-fkPgGeHdVIHOvmSIiw',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})


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