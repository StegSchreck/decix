// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App'
import router from './router'

import 'isomorphic-fetch'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

const GRAPHQL_SERVER_HOST = 'localhost'
const GRAPHQL_SERVER_PORT = 3000

const networkInterface = createNetworkInterface({
  uri: `http://${GRAPHQL_SERVER_HOST}:${GRAPHQL_SERVER_PORT}/graphql`
})

const wsClient = new SubscriptionClient(`ws://${GRAPHQL_SERVER_HOST}:${GRAPHQL_SERVER_PORT}/subscriptions`, {
  reconnect: true
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true
})

Vue.use(VueApollo)

let loading = 0

const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient
  },
  defaultClient: apolloClient,
  defaultOptions: {
    // $loadingKey: 'loading',
  },
  watchLoading (state, mod) {
    loading += mod
    console.log('Global loading', loading, mod)
  },
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
