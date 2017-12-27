<template>
  <div id="topnav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/"><img src="../assets/decix.png" height="50%"></el-menu-item>
      <el-menu-item index="users">Users</el-menu-item>
      <el-menu-item index="apollo">Apollo</el-menu-item>
      <el-container id="HeaderLoginButton">
        <el-button type="primary" icon="el-icon-arrow-right" @click="goToLoginPage">Login</el-button>
        <el-button icon="el-icon-arrow-right" @click="goToSignUpPage">Sign Up</el-button>
      </el-container>
    </el-menu>
    <!--<div class="line"></div>-->
  </div>
</template>

<style>
  #HeaderLoginButton {
    float: right;
    margin: 10px;
  }
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
      goToLoginPage () {
        this.$router.push('/login')
      },
      goToSignUpPage () {
        this.$router.push('/sign-up')
      }
    }
  }
</script>
