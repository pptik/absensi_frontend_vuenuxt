import Vue from 'vue'
import VueSwal from 'vue-swal'
import VueRouter from 'vue-router'
Vue.use(VueSwal)
Vue.use(VueRouter)

Vue.component('router-link', Vue.options.components.RouterLink)
