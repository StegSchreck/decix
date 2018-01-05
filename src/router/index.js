import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Matrixes from '@/components/Matrixes'
import Matrix from '@/components/Matrix'
import Categories from '@/components/Categories'
import Category from '@/components/Category'
import Alternatives from '@/components/Alternatives'
import Alternative from '@/components/Alternative'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/matrixes', name: 'Matrixes', component: Matrixes },
    { path: '/matrix/:id', name: 'Matrix', component: Matrix },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/category/:id', name: 'Category', component: Category },
    { path: '/alternatives', name: 'Alternatives', component: Alternatives },
    { path: '/alternative/:id', name: 'Alternative', component: Alternative },
    { path: '*', redirect: '/' }
  ]
})
