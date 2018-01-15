<template>
  <div id="categories" class="section">
    <h1>Existing Categories</h1>
    <div class="categories">
      <div id="CreateForm">
        <el-form :model="createForm" ref="createForm" label-width="40px" status-icon>
          <el-form-item prop="title" label="Title">
            <el-input v-model="createForm.title" autofocus>
              <el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitForm('createForm')"/>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-for="item in category" :class="['category',{optimistic: item.id === -1}]" :title="item.id">
        <router-link :to="{ name: 'Category', params: { id: item.id } }"> {{ item.sorting }}: {{ item.id }} - {{ item.title }} ({{ item.weight }}%)</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { ALL_CATEGORIES_QUERY, CHANGED_CATEGORIES_SUBSCRIPTION, NEW_CATEGORY_MUTATION } from '../constants/graphql'

  export default {
    beforeMount () {
      this.$apollo.queries.category.refetch()
    },
    apollo: {
      category: {
        query: ALL_CATEGORIES_QUERY,
        update (data) {
          return data.category
        },
        subscribeToMore: [{
          document: CHANGED_CATEGORIES_SUBSCRIPTION,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              category: subscriptionData.data.categoriesChange
            }
          }
        }]
      }
    },
    data () {
      return {
        category: [],
        createForm: {
          title: ''
        }
      }
    },
    methods: {
      getHighestSorting () {
        return Math.max.apply(Math, this.category.map(c => { return c.sorting }))
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$apollo.mutate({
              mutation: NEW_CATEGORY_MUTATION,
              variables: {
                title: this.createForm.title,
                sorting: this.getHighestSorting() + 1
              }
            }).then((data) => {
              if (data.data.createCategory) this.$router.push('/category/' + data.data.createCategory.id)
              else return false
            }).catch((error) => {
              console.error(error)
              return false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style>
</style>
