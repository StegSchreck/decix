<template>
  <div id="matrixes">
    <h1>Existing Matrixes</h1>
    <div class="matrixes">
      <div id="CreateForm">
        <el-form :model="createForm" ref="createForm" label-width="40px" status-icon>
          <el-form-item prop="title" label="Title">
            <el-input v-model="createForm.title" autofocus>
              <el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitForm('createForm')"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-for="item in allMatrixes" :class="['matrix',{optimistic: item.id === -1}]" :title="item.id">
        <router-link :to="{ name: 'Matrix', params: { id: item.id } }">{{ item.id }} - {{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    apollo: {
      matrix: {
        query: gql`query {
          matrix {
            id
            title
          }
        }`,
        update (data) {
          return data.matrix
        },
        subscribeToMore: [{
          document: gql`subscription matrix {
            matrixAdded {
              id
              title
            }
          }`,
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            if (previousResult.matrix.find(item => item.id === subscriptionData.data.matrixAdded.id)) {
              return previousResult
            }
            return {
              matrix: [
                ...previousResult.matrix,
                // Add the new matrix
                subscriptionData.data.matrixAdded
              ]
            }
          }
        }]
      }
    },
    data () {
      return {
        matrix: [],
        createForm: {
          title: ''
        }
      }
    },
    computed: {
      allMatrixes: function () {
        return this.matrix
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$apollo.mutate({
              mutation: gql`mutation ($title: String!) {
                  createMatrix(title: $title) {
                    id
                  }
                }`,
              variables: {
                title: this.createForm.title
              }
            }).then((data) => {
              // Result
              // console.log(data.data)
              // if (data.data.createMatrix) this.$router.push('/matrix/' + data.data.createMatrix.id)
              return !!data.data.createMatrix
            }).catch((error) => {
              // Error
              console.error(error)
              return false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style>
</style>
