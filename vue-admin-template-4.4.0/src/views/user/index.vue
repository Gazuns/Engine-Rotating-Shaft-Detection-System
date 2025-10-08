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
      <el-table-column label="ID" prop="id" width="75" />
      <el-table-column label="Name" prop="Name" />
      <el-table-column label="Authority" width="100" prop="Tag">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Tag | tagFliter">{{ scope.row.Tag }}</el-tag>
        </template>
      </el-table-column>
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
      :last-i-d="lastID"
      @response="handleFormClose"
    />
  </div>
</template>

<script>
import * as api from '@/api/users'
import DetailView from './form.vue'

export default {
  filters: {
    tagFliter(Tag) {
      const tagMap = {
        管理员: 'warning',
        用户: ''
      }
      return tagMap[Tag]
    }
  },
  components: {
    DetailView
  },
  data() {
    return {
      list: null,
      listLoading: true,
      selectData: null,
      detailShow: false,
      update: false,
      lastID: 0,
      search: ''
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
        for (var x in this.list) {
          this.list[x].Tag = this.list[x].Authority ? '管理员' : '用户'
        }
        this.listLoading = false
      })
    },
    addForm() {
      this.detailShow = true
      this.update = false
      this.lastID = this.list.length ? this.list[this.list.length - 1].id + 1 : 1
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
        api.deleteUser(this.list[index].id)
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
