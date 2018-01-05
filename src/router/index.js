import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Matrixes from '@/components/Matrixes'
import Categories from '@/components/Categories'
import Alternatives from '@/components/Alternatives'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Hello', component: HelloWorld },
    { path: '/matrixes', name: 'Matrixes', component: Matrixes },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/alternatives', name: 'Alternatives', component: Alternatives },
    { path: '*', redirect: '/' }
  ]
})
