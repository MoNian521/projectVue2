// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import { Circle } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(Circle);

import request from './libs/request';
Vue.prototype.$http=request

Vue.config.productionTip = false
import myEachert from './components/eachertComponent'
Vue.component("myEachert", myEachert);

import './components/animate.css'

import 'animate.css'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
