<template>
  <div id="alternative" class="section">
    <h1>Alternative {{ $route.params.id }}</h1>
    <div class="alternative">
      <div v-for="item in alternative" :class="['alternative',{optimistic: item.id === -1}]" :title="item.id">
        {{ item.id }} - {{ item.title }}<br>
        {{ item.description }}<br>
        [<router-link :to="{ name: 'Matrix', params: { id: item.matrix.id } }">matrix {{ item.matrix.title }}</router-link>]
      </div>
      <el-button type="danger" plain icon="el-icon-delete" @click="deleteAlternative"/>
    </div>
  </div>
</template>

<script>
  import { ALTERNATIVE_QUERY, DELETE_ALTERNATIVE_MUTATION } from '../constants/graphql'

  export default {
    apollo: {
      alternative: {
        query: ALTERNATIVE_QUERY,
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
      deleteAlternative () {
        this.$apollo.mutate({
          mutation: DELETE_ALTERNATIVE_MUTATION,
          variables: {
            id: this.itemId
          }
        }).then((data) => {
          if (data.data.deleteAlternative) this.$router.push('/alternatives')
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
