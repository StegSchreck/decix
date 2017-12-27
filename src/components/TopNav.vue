<template>
  <div id="topnav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/"><img src="../assets/decix.png" height="50%"></el-menu-item>
      <el-menu-item index="users">Users</el-menu-item>
      <el-menu-item index="apollo">Apollo</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: 'topnav',
    data () {
      return {
        activeIndex: this.$route.path.replace('/', '')
      }
    }
  }
</script>
