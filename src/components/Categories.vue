<template>
  <div id="categories">
    <h1>Existing Categories</h1>
    <div class="categories">
      <div v-for="item in category" :class="['category',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.sorting }}: {{ item.id }} - {{ item.title }} ({{ item.weight }}%)
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    apollo: {
      category: gql`query {
        category {
          id
          title
          sorting
          weight
        }
      }`
    },
    data () {
      return {
        category: []
      }
    }
  }
</script>

<style>
</style>
