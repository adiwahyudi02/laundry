import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import router from './router'
import store from './store'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)

const app = new Vue({
    el: '#app',
    router,
    store
});