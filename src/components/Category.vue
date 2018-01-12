<template>
  <div id="category" class="section">
    <h1>Category {{ $route.params.id }}</h1>
    <div class="category">
      <div v-for="item in category" :class="['category',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.id }} - {{ item.title }}<br>
        {{ item.description }}
      </div>
      <el-button type="danger" plain icon="el-icon-delete" @click="deleteItem"/>
    </div>
  </div>
</template>

<script>
  import { CATEGORY_QUERY, DELETE_CATEGORY_MUTATION } from '../constants/graphql'

  export default {
    apollo: {
      category: {
        query: CATEGORY_QUERY,
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
          mutation: DELETE_CATEGORY_MUTATION,
          variables: {
            id: this.itemId
          }
        }).then((data) => {
          // console.log(data.data.deleteCategory)
          if (data.data.deleteCategory) this.$router.push('/categories')
          else return false
        }).catch((error) => {
          console.error(error)
          return false
        })
      }
    }
  }
</script>

<style>
</style>
