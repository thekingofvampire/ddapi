import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import nav from './components/nav'
Vue.component('NAV', nav)

import commonInput from './components/commonInput'
Vue.component('commonInput', commonInput)

import commonSelect from './components/commonSelect'
Vue.component('commonSelect', commonSelect)



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import '../src/assets/js/jquery-form'

// import axios from 'axios'
import instance from './assets/js/axios'
Vue.prototype.$axios = instance;

import async from 'async'
Vue.prototype.$async = async;

import qs from 'qs'
Vue.prototype.$qs = qs;



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')