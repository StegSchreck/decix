<template>
  <div id="alternative">
    <h1>Alternative {{ $route.params.id }}</h1>
    <div class="alternative">
      <div v-for="item in alternative" :class="['alternative',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.id }} - {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    apollo: {
      alternative: {
        query: gql`query Alternative($id: String!){
          alternative (id: $id){
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
        alternative: [],
        itemId: this.$route.params.id
      }
    }
  }
</script>

<style>
</style>
