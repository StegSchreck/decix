<template>
  <div id="matrix">
    <div class="matrix" v-for="item in matrix">
      <div class="section">
        <h1>Matrix {{ $route.params.id }}</h1>
          <div :class="['matrix',{optimistic: item.id === -1}]" :title="item.id">
            {{ item.id }} - {{ item.title }}<br>
            {{ item.description }}
          </div>
          <el-button-group>
            <el-button type="primary" plain icon="el-icon-edit"/><!--@click="editMatrix"-->
            <el-button type="info" plain icon="el-icon-download"/><!--@click="downloadMatrix"-->
            <el-button type="danger" plain icon="el-icon-delete" @click="deleteMatrix"/>
          </el-button-group>
      </div>
      <div class="section">
        <h1>Assigned categories</h1>
        <el-button type="primary" icon="el-icon-circle-plus" plain @click="categoryDialogVisible = true" style="width: 100%"/>
        <el-collapse v-if="item.categories.length > 0">
          <el-collapse-item v-for="category in item.categories" :key="category.id" :title="category.title" :name="category.id">
            <div>Description: {{ category.description }}</div>
            <div>Sorting: {{ category.sorting }}</div>
            <div>Weight: {{ category.weight }}</div>
          </el-collapse-item>
        </el-collapse>
        <el-alert
          title="No category assigned yet."
          type="info"
          :closable="false"
          center
          show-icon
          v-else/>
      </div>
      <div class="section">
        <h2>Assigned alternatives</h2>
        <el-button type="primary" icon="el-icon-circle-plus" plain @click="alternativeDialogVisible = true" style="width: 100%"/>
        <el-collapse v-if="item.alternatives.length > 0">
          <el-collapse-item v-for="alternative in item.alternatives" :key="alternative.id" :title="alternative.title" :name="alternative.id">
            <div>Description: {{ alternative.description }}</div>
            <div>Sorting: {{ alternative.sorting }}</div>
          </el-collapse-item>
        </el-collapse>
        <el-alert
          title="No alternative assigned yet."
          type="info"
          :closable="false"
          center
          show-icon
          v-else/>
      </div>


      <el-dialog
        title="Create new category"
        :visible.sync="categoryDialogVisible"
        width="30%">
        <span>Here you can create a new category.</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="categoryDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="categoryDialogVisible = false">Confirm</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Create new alternative"
        :visible.sync="alternativeDialogVisible"
        width="30%">
        <span>Here you can create a new alternative.</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alternativeDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="alternativeDialogVisible = false">Confirm</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { MATRIX_QUERY, DELETE_MATRIX_MUTATION } from '../constants/graphql'

  export default {
    apollo: {
      matrix: {
        query: MATRIX_QUERY,
        variables () {
          return {
            id: this.itemId
          }
        }
      }
    },
    data () {
      return {
        matrix: [],
        itemId: this.$route.params.id,
        categoryDialogVisible: false,
        alternativeDialogVisible: false
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
      }
    }
  }
</script>

<style>
</style>
