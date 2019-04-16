import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'

Vue.use(VueMaterial)
Vue.use(VueRouter)

Vue.component('router-link', Vue.options.components.RouterLink)
