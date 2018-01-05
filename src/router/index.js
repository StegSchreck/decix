import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Matrixes from '@/components/Matrixes'
import Categories from '@/components/Categories'
import Alternatives from '@/components/Alternatives'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/matrixes', name: 'Matrixes', component: Matrixes },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/alternatives', name: 'Alternatives', component: Alternatives },
    { path: '*', redirect: '/' }
  ]
})
