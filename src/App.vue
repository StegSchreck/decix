<template>
  <el-container id="app">
    <el-header id="header">
      <topnav></topnav>
    </el-header>
    <el-main id="content">
      <router-view></router-view>
    </el-main>
    </el-container>
</template>

<script>
  import Topnav from './components/TopNav'

  export default {
    components: { Topnav },
    name: 'app'
  }
</script>

<style>
  body {
    background-color: #151d26;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #header {
    padding: 0;
  }
  #content {
    margin-top: 20px;
    background-color: white;
    padding: 5px 10px;
  }
</style>
