<template>
  <div id="matrixes">
    <h1>Existing Matrixes</h1>
    <div class="matrixes">
      <div v-for="item in matrix" :class="['matrix',{optimistic: item.id === -1}]" :title="item.id">
        <router-link :to="{ name: 'Matrix', params: { id: item.id } }">{{ item.id }} - {{ item.title }}</router-link>
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
