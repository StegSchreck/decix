<template>
  <div id="matrix">
    <div class="matrix" v-for="item in matrix">
      <div class="section">
        <h1>Matrix <span>{{ item.title }}</span></h1>
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
                <div><i class="el-icon-tickets"></i> Description: {{ category.description }}</div>
                <div><i class="el-icon-sort"></i> Sorting: {{ category.sorting }}</div>
                <div><i class="el-icon-warning"></i> Weight: {{ category.weight }}</div>
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
                <div><i class="el-icon-tickets"></i> Description: {{ alternative.description }}</div>
                <div><i class="el-icon-sort"></i> Sorting: {{ alternative.sorting }}</div>
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
        <el-button type="primary" plain icon="el-icon-edit-outline" @click="entryDialogVisible = true">Add entry</el-button>
        <el-table :data="tableData" :default-sort = "{ prop: 'sorting', order: 'ascending' }" border stripe style="width: 100%" v-if="item.alternatives.length > 0">
          <el-table-column label="Alternative" prop="alternative" sortable fixed/>
          <el-table-column v-for="category in item.categories" :key="category.id" :label="category.title" :prop="category.title"/>
          <el-table-column
            label="Operations">
            <template slot-scope="scope">
              <el-button
                size="mini">
                <!--@click="handleEdit(scope.$index, scope.row)">-->
                Edit</el-button>
              <el-button
                size="mini"
                type="danger">
                <!--@click="handleDelete(scope.$index, scope.row)">-->
              Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <el-dialog
        title="Create new category"
        :visible.sync="categoryDialogVisible"
        width="50%">
        <div id="CreateCategoryForm">
          <el-form :model="createCategoryForm" ref="createCategoryForm" label-width="80px" status-icon>
            <el-form-item prop="title" label="Title">
              <el-input v-model="createCategoryForm.title" :autofocus="categoryDialogVisible">
                <!--<el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitCategoryForm"/>-->
              </el-input>
            </el-form-item>
            <el-form-item prop="weight" label="Weight">
              <el-input-number v-model="createCategoryForm.weight" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item prop="decription" label="Description">
              <el-input v-model="createCategoryForm.description" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitCategoryForm">Create</el-button>
          <el-button type="info" icon="el-icon-circle-close-outline" @click="categoryDialogVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Create new alternative"
        :visible.sync="alternativeDialogVisible"
        width="50%">
        <div id="CreateAlternativeForm">
          <el-form :model="createAlternativeForm" ref="createAlternativeForm" label-width="80px" status-icon>
            <el-form-item prop="title" label="Title">
              <el-input v-model="createAlternativeForm.title" :autofocus="alternativeDialogVisible">
                <!--<el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitAlternativeForm"/>-->
              </el-input>
            </el-form-item>
            <el-form-item prop="decription" label="Description">
              <el-input v-model="createAlternativeForm.description" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitAlternativeForm">Create</el-button>
          <el-button type="info" icon="el-icon-circle-close-outline" @click="alternativeDialogVisible = false">Cancel</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Create new entry"
        :visible.sync="entryDialogVisible"
        width="50%">
        <div id="CreateEntryForm">
          <el-form :model="createEntryForm" ref="createEntryForm" label-width="80px" status-icon>
            <el-form-item prop="value" label="Value">
              <el-input v-model="createEntryForm.value" :autofocus="entryDialogVisible">
                <!--<el-button slot="append" icon="el-icon-circle-plus" type="primary" @click="submitAlternativeForm"/>-->
              </el-input>
            </el-form-item>
            <el-form-item prop="comment" label="Comment">
              <el-input v-model="createEntryForm.comment" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-select v-model="createEntryForm.alternativeID" filterable auto-complete placeholder="Select Alternative">
              <el-option v-for="alternative in item.alternatives"
                :key="alternative.id"
                :label="alternative.title"
                :value="alternative.id">
              </el-option>
            </el-select><br/>
            <el-select v-model="createEntryForm.categoryID" filterable auto-complete placeholder="Select Category">
              <el-option v-for="category in item.categories"
                :key="category.id"
                :label="category.title"
                :value="category.id">
              </el-option>
            </el-select>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="submitEntryForm">Create</el-button>
          <el-button type="info" icon="el-icon-circle-close-outline" @click="entryDialogVisible = false">Cancel</el-button>
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
    NEW_ENTRY_MUTATION,
    CHANGED_MATRIX_SUBSCRIPTION
  } from '../constants/graphql'

  export default {
    beforeMount () {
      this.$apollo.queries.matrix.refetch()
      this.collectTableData()
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
        entryDialogVisible: false,
        createCategoryForm: {
          title: '',
          weight: 0,
          description: ''
        },
        createAlternativeForm: {
          title: '',
          description: ''
        },
        createEntryForm: {
          value: '',
          comment: '',
          alternativeID: '',
          categoryID: ''
        },
        tableData: []
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
            description: this.createCategoryForm.description,
            weight: this.createCategoryForm.weight,
            sorting: this.getHighestCategorySorting() + 1, // always add at bottom
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
            description: this.createAlternativeForm.description,
            sorting: this.getHighestAlternativeSorting() + 1, // always add at bottom
            matrixID: this.matrix[0].id
          }
        }).then((data) => {
          if (data.data.createAlternative) this.alternativeDialogVisible = false // this.$router.push('/alternative/' + data.data.createAlternative.id)
          else return false
        }).catch((error) => {
          console.error(error)
          return false
        })
      },
      submitEntryForm () {
        this.$apollo.mutate({
          mutation: NEW_ENTRY_MUTATION,
          variables: {
            value: this.createEntryForm.value,
            comment: this.createEntryForm.comment,
            alternativeID: this.createEntryForm.alternativeID,
            categoryID: this.createEntryForm.categoryID
          }
        }).then((data) => {
          if (data.data.createEntry) this.entryDialogVisible = false
          else return false
        }).catch((error) => {
          console.error(error)
          return false
        })
      },
      collectTableData () {
        let matrix = {}
        this.$apollo.query({
          query: MATRIX_QUERY,
          variables: {
            id: this.itemId
          }
        }).then((data) => {
          matrix = data.data.matrix[0]
          if (matrix.categories !== undefined && matrix.categories.length > 0 &&
            matrix.alternatives !== undefined && matrix.alternatives.length > 0) {
            let populatedAlternative = {}
            matrix.categories.forEach(function (category) {
              matrix.alternatives.forEach(function (alternative) {
                populatedAlternative['alternative'] = alternative.title
                let entry = alternative.entries.filter(entry => entry.category.id === category.id)[0]
                if (entry !== undefined) {
                  populatedAlternative[category.title] = entry.value
                } else {
                  populatedAlternative[category.title] = 'bla'
                }
              })
            })
            this.tableData.push(populatedAlternative)
          }
        }).catch((error) => {
          console.error(error)
          return false
        })
      }
    }
  }
</script>

<style>
  h1 span {
    font-family: monospace;
  }
  .el-table .cell {
    text-align: left;
  }
  .el-table .el-table_1_column_1 .cell,
  .el-table tr td:first-of-type {
    font-weight: bold;
    text-align: left;
  }
  .el-collapse-item__header {
    padding-left: 21px;
  }
</style>
