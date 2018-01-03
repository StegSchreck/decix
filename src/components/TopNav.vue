<template>
  <div id="topnav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/"><img src="../assets/decix.png" height="50%"></el-menu-item>
      <el-menu-item index="apollo">Apollo</el-menu-item>
      <el-menu-item index="matrixes">Matrixes</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: this.$route.path.substring(1)
      }
    },
    methods: {
    }
  }
</script>

<style>
</style>
