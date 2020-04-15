import Vue from 'vue'
import Router from 'vue-router'
import enterpriseReport from '@/components/enterpriseReport'
import searchPage from '@/components/searchPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/dhclf/ygnb2019/',
  routes: [
    {
      path: '/:gpdm',
      name: 'enterpriseReport',
      component: enterpriseReport
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage
    }
  ]
})
