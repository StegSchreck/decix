<template>
  <div id="matrix">
    <h1>Matrix {{ $route.params.id }}</h1>
    <div class="matrix">
      <div v-for="item in matrix" :class="['matrix',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.id }} - {{ item.title }}
      </div>
      <el-button type="danger" plain icon="el-icon-delete" @click="deleteItem"></el-button>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    apollo: {
      matrix: {
        query: gql`query Matrix($id: ID!){
          matrix (id: $id){
            id
            title
          }
        }`,
        variables () {
          return {
            id: this.itemId
          }
        }
      }
    },
    data () {
      return {
        matrix: [],
        itemId: this.$route.params.id
      }
    },
    methods: {
      deleteItem () {
        this.$apollo.mutate({
          mutation: gql`mutation ($id: ID!) {
              deleteMatrix(id: $id)
            }`,
          variables: {
            id: this.itemId
          }
        }).then((data) => {
          // Result
          console.log(data.data.deleteMatrix)
          if (data.data.deleteMatrix) this.$router.push('/matrixes')
          else return false
        }).catch((error) => {
          // Error
          console.error(error)
          return false
        })
      }
    }
  }
</script>

<style>
</style>
