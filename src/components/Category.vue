<template>
  <div id="category">
    <h1>Category {{ $route.params.id }}</h1>
    <div class="category">
      <div v-for="item in category" :class="['category',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.id }} - {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    apollo: {
      category: {
        query: gql`query Category($id: String!){
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
    }
  }
</script>

<style>
</style>
