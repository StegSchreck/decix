<template>
  <div id="matrixes" class="section">
    <h1>Existing Matrixes</h1>
    <div class="matrixes">
      <div id="CreateForm">
        <el-form :model="createForm" ref="createForm" label-width="40px" status-icon>
          <el-form-item prop="title" label="Title">
            <el-input v-model="createForm.title" autofocus>
              <el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitForm('createForm')"/>
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-collapse>
        <el-collapse-item v-for="item in matrix" :key="item.id" :title="item.title" :name="item.id">
          <div>ID: {{ item.id }}</div>
          <div>Description: {{ item.description }}</div>
          <router-link :to="{ name: 'Matrix', params: { id: item.id } }">go to matrix</router-link>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import { ALL_MATRIXES_QUERY, CHANGED_MATRIX_SUBSCRIPTION, NEW_MATRIX_MUTATION } from '../constants/graphql'

  export default {
    beforeMount () {
      this.$apollo.queries.matrix.refetch()
    },
    apollo: {
      matrix: {
        query: ALL_MATRIXES_QUERY,
        update (data) {
          return data.matrix
        },
        subscribeToMore: [{
          document: CHANGED_MATRIX_SUBSCRIPTION,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              matrix: subscriptionData.data.matrixChange
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
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$apollo.mutate({
              mutation: NEW_MATRIX_MUTATION,
              variables: {
                title: this.createForm.title
              }
            }).then((data) => {
              // if (data.data.createMatrix) this.$router.push('/matrix/' + data.data.createMatrix.id)
              return !!data.data.createMatrix
            }).catch((error) => {
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
