<template>
  <div id="category">
    <h1>Category {{ $route.params.id }}</h1>
    <div class="category">
      <div v-for="item in category" :class="['category',{optimistic: item.id === -1}]" :title="item.id">
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
      category: {
        query: gql`query Category($id: ID!){
          category (id: $id){
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
        category: [],
        itemId: this.$route.params.id
      }
    },
    methods: {
      deleteItem () {
        this.$apollo.mutate({
          mutation: gql`mutation ($id: ID!) {
              deleteCategory(id: $id)
            }`,
          variables: {
            id: this.itemId
          }
        }).then((data) => {
          // Result
          console.log(data.data.deleteCategory)
          if (data.data.deleteCategory) this.$router.push('/categories')
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
