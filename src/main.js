// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../theme/index.css'

import 'isomorphic-fetch'

import { ApolloClient, createNetworkInterface } from 'apollo-client'

const GRAPHQL_SERVER_HOST = 'localhost'
const GRAPHQL_SERVER_PORT = 3000

const networkInterface = createNetworkInterface({
  uri: `http://${GRAPHQL_SERVER_HOST}:${GRAPHQL_SERVER_PORT}/graphql`
})

const apolloClient = new ApolloClient({
  networkInterface: networkInterface,
  connectToDevTools: true
})

Vue.use(VueApollo)
Vue.use(ElementUI)

const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient
  },
  defaultClient: apolloClient,
  defaultOptions: {},
  errorHandler (error) {
    console.log('Global error handler')
    console.error(error)
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
