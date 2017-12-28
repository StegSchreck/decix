<template>
  <div id="login">
    <h1>Login</h1>
    <el-row :gutter="20">
      <el-col :xs="3" :sm="2" :md="3" :lg="4" :xl="6">&nbsp;</el-col>
      <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="12">
        <div id="LoginForm">
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="140px" status-icon>
            <el-form-item prop="email" label="Email">
              <el-input v-model="loginForm.email" autofocus></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
              <el-button @click="resetForm('loginForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="6">&nbsp;</el-col>
    </el-row>
    <div>Don't have an account yet? <router-link to="signup">Register here.</router-link></div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please choose your password'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your email address'))
        } else {
          this.$apollo.query({
            query: gql`query ($email: String!) {
              user (email: $email) {
                email
              }
            }`,
            variables: {
              email: this.loginForm.email
            }
          }).then((data) => {
            // Result
            if (data.data.user.length > 0) {
              callback()
            } else {
              callback(new Error('This email is not registered'))
            }
          })
        }
      }
      return {
        loginForm: {
          email: '',
          pass: ''
        },
        rules: {
          email: [
            { required: true, message: 'Please enter your email address', trigger: 'blur' },
            { type: 'email', message: 'Please enter a correct email address', trigger: 'blur,change' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          pass: [
            { required: true, message: 'Please enter your password', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$apollo.mutate({
              mutation: gql`mutation ($email: String!, $password: String!) {
                authenticateUser(email: $email, password: $password) {
                  id
                  firstName
                  lastName
                  email
                }
              }`,
              variables: {
                email: this.loginForm.email,
                password: this.loginForm.pass
              }
            }).then((data) => {
              // Result
              console.log(data.data)
              if (data.data.authenticateUser) this.$router.push('/users')
              else return false
            }).catch((error) => {
              // Error
              console.error(error)
              return false
            })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
  body {
    min-width: 440px;
  }
  #login {
    min-width: 400px;
  }
  #LoginForm {
    transform: translateX(-70px);
    min-width: 300px;
  }
</style>
