import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Classification from '@/components/classification/Classification'
import Search from '@/components/search/Search'
import List from '@/components/list/List'
import Details from '@/components/details/Details'
import MakeOrder from '@/components/order/MakeOrder'
import NewAddress from '@/components/common/NewAddress'
import ShopCart from '@/components/shopcart/ShopCart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/classification',
      name: 'Classification',
      component: Classification
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/makeorder',
      name: 'MakeOrder',
      component: MakeOrder
    },
    {
      path: '/newaddress',
      name: 'NewAddress',
      component: NewAddress
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart
    }
  ]
})
