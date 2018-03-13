<template>
  <div id="matrix">
    <div class="matrix" v-for="item in matrix">
      <div class="section">
        <h1>Matrix {{ item.title }}</h1>
          <div :class="['matrix',{optimistic: item.id === -1}]" :title="item.id">
            {{ item.description }}
          </div>
          <el-button-group>
            <el-button type="primary" plain icon="el-icon-edit"/><!--@click="editMatrix"-->
            <el-button type="info" plain icon="el-icon-download"/><!--@click="downloadMatrix"-->
            <el-button type="danger" plain icon="el-icon-delete" @click="deleteMatrix"/>
          </el-button-group>
      </div>

      <div class="section">
        <el-row>
          <el-col :span="12" style="padding-right:10px;">
            <h1>Assigned categories</h1>
            <el-button type="primary" size="mini" icon="el-icon-circle-plus" plain @click="categoryDialogVisible = true" style="width: 100%"/>
            <el-collapse v-if="item.categories.length > 0">
              <el-collapse-item v-for="category in item.categories" :key="category.id" :title="category.title" :name="category.id">
                <div>Description: {{ category.description }}</div>
                <div>Sorting: {{ category.sorting }}</div>
                <div>Weight: {{ category.weight }}</div>
                [<router-link :to="{ name: 'Category', params: { id: category.id } }">category {{ category.id }}</router-link>]
              </el-collapse-item>
            </el-collapse>
            <el-alert
              title="No category assigned yet."
              type="info"
              :closable="false"
              center
              show-icon
              v-else/>
          </el-col>
          <el-col :span="12" style="padding-left:10px;">
            <h2>Assigned alternatives</h2>
            <el-button type="primary" size="mini" icon="el-icon-circle-plus" plain @click="alternativeDialogVisible = true" style="width: 100%"/>
            <el-collapse v-if="item.alternatives.length > 0">
              <el-collapse-item v-for="alternative in item.alternatives" :key="alternative.id" :title="alternative.title" :name="alternative.id">
                <div>Description: {{ alternative.description }}</div>
                <div>Sorting: {{ alternative.sorting }}</div>
                [<router-link :to="{ name: 'Alternative', params: { id: alternative.id } }">alternative {{ alternative.id }}</router-link>]
              </el-collapse-item>
            </el-collapse>
            <el-alert
              title="No alternative assigned yet."
              type="info"
              :closable="false"
              center
              show-icon
              v-else/>
          </el-col>
        </el-row>
      </div>

      <div class="section">
        <h2>Decision matrix</h2>
        <el-table :data="item.alternatives" :default-sort = "{ prop: 'sorting', order: 'ascending' }" stripe style="width: 100%">
          <el-table-column label="Alternative" prop="title" sortable fixed/>
          <el-table-column v-for="category in item.categories" :key="category.id" :label="category.title" :prop="category.id"/>
        </el-table>
      </div>


      <el-dialog
        title="Create new category"
        :visible.sync="categoryDialogVisible"
        width="50%">
        <div id="CreateCategoryForm">
          <el-form :model="createCategoryForm" ref="createCategoryForm" label-width="40px" status-icon>
            <el-form-item prop="title" label="Title">
              <el-input v-model="createCategoryForm.title" :autofocus="categoryDialogVisible">
                <el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitCategoryForm"/>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="categoryDialogVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Create new alternative"
        :visible.sync="alternativeDialogVisible"
        width="50%">
        <div id="CreateAlternativeForm">
          <el-form :model="createAlternativeForm" ref="createAlternativeForm" label-width="40px" status-icon>
            <el-form-item prop="title" label="Title">
              <el-input v-model="createAlternativeForm.title"  :autofocus="alternativeDialogVisible">
                <el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitAlternativeForm"/>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alternativeDialogVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    MATRIX_QUERY,
    DELETE_MATRIX_MUTATION,
    NEW_CATEGORY_MUTATION,
    NEW_ALTERNATIVE_MUTATION,
    CHANGED_MATRIX_SUBSCRIPTION
  } from '../constants/graphql'

  export default {
    beforeMount () {
      this.$apollo.queries.matrix.refetch()
    },
    apollo: {
      matrix: {
        query: MATRIX_QUERY,
        update (data) {
          return data.matrix
        },
        variables () {
          return {
            id: this.itemId
          }
        },
        subscribeToMore: [{
          document: CHANGED_MATRIX_SUBSCRIPTION,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              matrix: subscriptionData.data.matrixChange
            }
          },
          variables () {
            return {
              id: this.itemId
            }
          }
        }]
      }
    },
    data () {
      return {
        matrix: [],
        itemId: this.$route.params.id,
        categoryDialogVisible: false,
        alternativeDialogVisible: false,
        createCategoryForm: {
          title: ''
        },
        createAlternativeForm: {
          title: ''
        }
      }
    },
    methods: {
      deleteMatrix () {
        this.$apollo.mutate({
          mutation: DELETE_MATRIX_MUTATION,
          variables: {
            id: this.itemId
          }
        }).then((data) => {
          if (data.data.deleteMatrix) this.$router.push('/matrixes')
          else return false
        }).catch((error) => {
          console.error(error)
          return false
        })
      },
      getHighestCategorySorting () {
        if (this.matrix[0].categories !== undefined && this.matrix[0].categories.length > 0) {
          return Math.max.apply(Math, this.matrix[0].categories.map(c => {
            return c.sorting
          }))
        } else {
          return 0
        }
      },
      getHighestAlternativeSorting () {
        if (this.matrix[0].alternatives !== undefined && this.matrix[0].alternatives.length > 0) {
          return Math.max.apply(Math, this.matrix[0].alternatives.map(a => {
            return a.sorting
          }))
        } else {
          return 0
        }
      },
      submitCategoryForm () {
        this.$apollo.mutate({
          mutation: NEW_CATEGORY_MUTATION,
          variables: {
            title: this.createCategoryForm.title,
            sorting: this.getHighestCategorySorting() + 1,
            matrixID: this.matrix[0].id
          }
        }).then((data) => {
          if (data.data.createCategory) this.categoryDialogVisible = false // this.$router.push('/category/' + data.data.createCategory.id)
          else return false
        }).catch((error) => {
          console.error(error)
          return false
        })
      },
      submitAlternativeForm () {
        this.$apollo.mutate({
          mutation: NEW_ALTERNATIVE_MUTATION,
          variables: {
            title: this.createAlternativeForm.title,
            sorting: this.getHighestAlternativeSorting() + 1,
            matrixID: this.matrix[0].id
          }
        }).then((data) => {
          if (data.data.createAlternative) this.alternativeDialogVisible = false // this.$router.push('/alternative/' + data.data.createAlternative.id)
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
  .el-table .el-table_1_column_1 .cell {
    font-weight: bold;
    text-align: left;
  }
  .el-collapse-item__header {
    padding-left: 21px;
  }
</style>
