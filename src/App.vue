<template>
  <el-container id="app">
    <el-header id="header">
      <topnav/>
    </el-header>
    <el-main id="content">
      <router-view/>
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
    padding: 0;
  }
  #content .section {
    margin-top: 10px;
    background-color: white;
    padding: 5px 10px 25px 10px;
  }
  a {
    color: #41B883;
    text-decoration: none;
  }
  a:visited, a:visited {
    color: #7ACDA8;
    text-decoration: none;
  }
</style>
