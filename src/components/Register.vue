<template>
  <div id="Register">
    <h1>Sign Up</h1>
    <el-row :gutter="20">
      <el-col :xs="3" :sm="2" :md="3" :lg="4" :xl="6">&nbsp;</el-col>
      <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="12">
        <div id="RegistrationForm">
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="140px" status-icon>
            <el-form-item prop="firstName" label="First name">
              <el-input v-model="loginForm.firstName"></el-input>
            </el-form-item>
            <el-form-item prop="lastName" label="Last name">
              <el-input v-model="loginForm.lastName"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pass">
              <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="checkPass">
              <el-input type="password" v-model="loginForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">Create account</el-button>
              <el-button @click="resetForm('loginForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="6">&nbsp;</el-col>
    </el-row>
    <div>Already have an account? <router-link to="login">Login here.</router-link></div>
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
          if (this.loginForm.checkPass !== '') {
            this.$refs.loginForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please confirm your chosen password'))
        } else if (value !== this.loginForm.pass) {
          callback(new Error('The entered passwords don\'t match!'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        // ask apollo for already registered mails
        if (value === '') {
          callback(new Error('Please enter your email address'))
        } else {
          let emailTaken = false
          this.$apollo.query({
            query: gql`query{
              allUsers {
                email
              }
            }`}).then((data) => {
              // Result
              const usrs = data.data.allUsers
              for (let i = 0; i < usrs.length; i++) {
                let user = usrs[0]
                if (user.email === value) {
                  emailTaken = true
                }
              }
              if (emailTaken) {
                callback(new Error('This email is already registered'))
              } else {
                callback()
              }
            })
        }
      }
      return {
        allUsers: [],
        loginForm: {
          firstName: '',
          lastName: '',
          email: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          firstName: [
            { required: true, message: 'Please enter your name', trigger: 'blur' }
          ],
          lastName: [
            { required: true, message: 'Please enter your name', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please enter your email address', trigger: 'blur' },
            { type: 'email', message: 'Please enter a correct email address', trigger: 'blur,change' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          pass: [
            { required: true, message: 'Please choose your password', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: 'Please confirm your chosen password', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
  #Register {
    min-width: 400px;
  }
  #RegistrationForm {
    transform: translateX(-70px);
    min-width: 300px;
  }
</style>
