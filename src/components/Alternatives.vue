<template>
  <div id="alternatives">
    <h1>Existing Alternatives</h1>
    <div class="alternatives">
      <div id="CreateForm">
        <el-form :model="createForm" ref="createForm" label-width="40px" status-icon>
          <el-form-item prop="title" label="Title">
            <el-input v-model="createForm.title" autofocus>
              <el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitForm('createForm')"/>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-for="item in alternative" :class="['alternative',{optimistic: item.id === -1}]" :title="item.id">
        <router-link :to="{ name: 'Alternative', params: { id: item.id } }"> {{ item.sorting }}: {{ item.id }} - {{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { ALL_ALTERNATIVES_QUERY, CHANGED_ALTERNATIVE_SUBSCRIPTION, NEW_ALTERNATIVE_MUTATION } from '../constants/graphql'

  export default {
    beforeMount () {
      this.$apollo.queries.alternative.refetch()
    },
    apollo: {
      alternative: {
        query: ALL_ALTERNATIVES_QUERY,
        update (data) {
          return data.alternative
        },
        subscribeToMore: [{
          document: CHANGED_ALTERNATIVE_SUBSCRIPTION,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              alternative: subscriptionData.data.alternativeChange
            }
          }
        }]
      }
    },
    data () {
      return {
        alternative: [],
        createForm: {
          title: ''
        }
      }
    },
    methods: {
      getHighestSorting () {
        return Math.max.apply(Math, this.alternative.map(c => { return c.sorting }))
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$apollo.mutate({
              mutation: NEW_ALTERNATIVE_MUTATION,
              variables: {
                title: this.createForm.title,
                sorting: this.getHighestSorting() + 1
              }
            }).then((data) => {
              // console.log(data.data)
              if (data.data.createAlternative) this.$router.push('/alternative/' + data.data.createAlternative.id)
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
