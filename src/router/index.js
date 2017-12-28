import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Apollo from '@/components/Apollo'
import Users from '@/components/Users'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Hello', component: HelloWorld },
    { path: '/apollo', name: 'Apollo', component: Apollo },
    { path: '/users', name: 'Users', component: Users },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register }
  ]
})
