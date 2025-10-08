<template>
  <el-drawer
    title="详细数据"
    :visible.sync="view"
    :append-to-body="true"
    :before-close="handleClose"
    custom-class="detail"
  >
    <div class="detail__content">
      <el-form ref="form" :model="form">
        <el-form-item label="Name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" show-password />
        </el-form-item>
        <el-form-item label="Authority">
          <el-radio-group v-model="form.auth" placeholder="Please choose a authority">
            <el-radio-button label="1">管理员</el-radio-button>
            <el-radio-button label="0">用户</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="detail__footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </el-drawer>
</template>

<script>
import * as api from '@/api/users'

export default {
  emits: ['response'],
  props: {
    formView: {
      type: Boolean,
      default: false
    },
    selectData: {
      type: Object,
      default: null
    },
    updateData: {
      type: Boolean,
      default: false
    },
    lastID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      view: false,
      update: false,
      form: {
        id: 0,
        name: '',
        password: '',
        auth: 0
      },
      last: 0
    }
  },
  watch: {
    formView() {
      this.view = this.formView
    },
    selectData() {
      this.form.id = this.selectData.id
      this.form.name = this.selectData.Name
      this.form.password = this.selectData.Password
      this.selectData.Authority ? this.form.auth = this.selectData.Authority : this.form.auth = 0
    },
    updateData() {
      this.update = this.updateData
    },
    lastID() {
      this.last = this.lastID
    }
  },
  methods: {
    handleClose(done) {
      this.view = false
      this.formReset()
      this.$emit('response', false)
    },
    submit() {
      this.form.auth = Number(this.form.auth)
      if (this.form.name === '' || (this.form.auth !== 0 && this.form.auth !== 1)) {
        this.$message({
          message: '输入不应为空',
          type: 'error',
          duration: 1.5 * 1000
        })
        return
      }
      if (this.update) {
        api.updateUser(this.form.id, this.form.name, this.form.password, this.form.auth)
      } else {
        api.addUser(this.last, this.form.name, this.form.password, this.form.auth)
      }
      this.$message({
        message: '操作成功',
        type: 'success',
        duration: 3 * 1000
      })
      this.handleClose()
    },
    formReset() {
      this.form.id = 0
      this.form.name = ''
      this.form.password = ''
      this.form.auth = 0
    }
  }
}
</script>

<style>
.el-drawer__body {
  padding: 20px;
}
</style>
