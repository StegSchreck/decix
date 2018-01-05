<template>
  <div id="alternative">
    <h1>Alternative {{ $route.params.id }}</h1>
    <div class="alternative">
      <div v-for="item in alternative" :class="['alternative',{optimistic: item.id === -1}]" :title="item.id">
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
      alternative: {
        query: gql`query Alternative($id: ID!){
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
    },
    methods: {
      deleteItem () {
        this.$apollo.mutate({
          mutation: gql`mutation ($id: ID!) {
              deleteAlternative(id: $id)
            }`,
          variables: {
            id: this.itemId
          }
        }).then((data) => {
          // Result
          console.log(data.data.deleteAlternative)
          if (data.data.deleteAlternative) this.$router.push('/alternatives')
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
