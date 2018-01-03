<template>
  <div id="alternatives">
    <h1>Existing Alternatives</h1>
    <div class="alternatives">
      <div v-for="item in alternative" :class="['alternative',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.sorting }}: {{ item.id }} - {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    apollo: {
      alternative: gql`query {
        alternative {
          id
          title
          sorting
        }
      }`
    },
    data () {
      return {
        alternative: []
      }
    }
  }
</script>

<style>
</style>
