<template>
  <div id="topnav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/"><img src="../assets/decix.png" height="50%"></el-menu-item>
      <el-menu-item index="apollo">Apollo</el-menu-item>
    </el-menu>
  </div>
</template>

<style>
</style>

<script>
  export default {
    name: 'topnav',
    data () {
      return {
        activeIndex: this.$route.path.substring(1)
      }
    },
    methods: {
    }
  }
</script>
