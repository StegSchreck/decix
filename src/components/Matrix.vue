<template>
  <div id="matrix">
    <h1>Matrix {{ $route.params.id }}</h1>
    <div class="matrix">
      <div v-for="item in matrix" :class="['matrix',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.id }} - {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    apollo: {
      matrix: {
        query: gql`query Matrix($id: String!){
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
    }
  }
</script>

<style>
</style>
