<template>
  <div id="app">
    <topnav></topnav>
    <router-view></router-view>
  </div>
</template>

<script>
import Topnav from './components/TopNav'

export default {
  components: {Topnav},
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
