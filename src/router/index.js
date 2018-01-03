import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Apollo from '@/components/Apollo'
import Matrixes from '@/components/Matrixes'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Hello', component: HelloWorld },
    { path: '/apollo', name: 'Apollo', component: Apollo },
    { path: '/matrixes', name: 'Matrixes', component: Matrixes }
  ]
})
