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
        <el-form-item label="Type">
          <el-input v-model="form.type" />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Num">
          <el-input v-model="form.num" />
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
import * as api from '@/api/component'

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
    }
  },
  data() {
    return {
      view: false,
      update: false,
      form: {
        type: '',
        name: '',
        num: 0
      }
    }
  },
  watch: {
    formView() {
      this.view = this.formView
    },
    selectData() {
      this.form.type = this.selectData.Type
      this.form.name = this.selectData.Name
      this.form.num = this.selectData.Number
    },
    updateData() {
      this.update = this.updateData
    }
  },
  methods: {
    handleClose(done) {
      this.view = false
      this.formReset()
      this.$emit('response', false)
    },
    submit() {
      if (this.form.type === '' || this.form.type === '' || this.form.num === '') {
        this.$message({
          message: '输入不应为空',
          type: 'error',
          duration: 1.5 * 1000
        })
        return
      }
      if (this.update) {
        api.updateComponent(this.form.type, this.form.name, this.form.num)
      } else {
        api.addComponent(this.form.type, this.form.name, this.form.num)
      }
      this.$message({
        message: '操作成功',
        type: 'success',
        duration: 3 * 1000
      })
      this.handleClose()
    },
    formReset() {
      this.form.type = ''
      this.form.name = ''
      this.form.num = 0
    }
  }
}
</script>

<style>
.el-drawer__body {
  padding: 20px;
}
</style>
