<template>
  <div id="matrixes">
    <h1>Existing Matrixes</h1>

    <h2>Matrixes</h2>
    <div class="matrixes">
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
      matrix: gql`query {
        matrix {
          id
          title
        }
      }`
    },
    data () {
      return {
        matrix: []
      }
    }
  }
</script>

<style>
</style>
