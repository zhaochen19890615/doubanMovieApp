import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Details from '@/components/details'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'Details',
      component: Details
    }
  ]
})
