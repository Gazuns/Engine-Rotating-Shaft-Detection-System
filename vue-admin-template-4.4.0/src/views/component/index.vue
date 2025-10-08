<template>
  <div class="app-container">
    <el-button type="primary" @click="addForm()">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="Type" prop="Type" />
      <el-table-column label="Name" prop="Name" />
      <el-table-column label="Number" width="75" prop="Number" />
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="small" @click="updateForm(scope.$index)">Edit</el-button>
          <el-button size="small" type="danger" @click="deleteForm(scope.$index)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <DetailView
      :form-view="detailShow"
      :select-data="selectData"
      :update-data="update"
      @response="handleFormClose"
    />
  </div>
</template>

<script>
import * as api from '@/api/component'
import DetailView from './form.vue'

export default {
  components: {
    DetailView
  },
  data() {
    return {
      list: null,
      listLoading: true,
      selectData: null,
      detailShow: false,
      update: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getList().then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },
    addForm() {
      this.detailShow = true
      this.update = false
    },
    updateForm(index) {
      this.detailShow = true
      this.update = true
      this.selectData = this.list[index]
    },
    deleteForm(index) {
      this.$confirm('此操作将删除所选数据，是否继续？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteComponent(this.list[index].Type)
        this.fetchData()
        this.$message({
          type: 'success',
          message: '删除成功',
          duration: 3 * 1000
        })
      })
    },
    handleFormClose(value) {
      this.detailShow = value
      this.fetchData()
    }
  }
}
</script>
