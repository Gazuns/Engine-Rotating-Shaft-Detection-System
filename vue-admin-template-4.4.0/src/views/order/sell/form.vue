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
        <el-form-item label="Buyer">
          <el-input v-model="form.buyer" />
        </el-form-item>
        <el-form-item label="Type">
          <el-input v-model="form.type" />
        </el-form-item>
        <el-form-item label="Number">
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
import * as api from '@/api/order'
import * as dayjs from 'dayjs'

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
        buyer: '',
        type: '',
        dire: 0,
        num: 0,
        time: 0
      },
      last: 0
    }
  },
  watch: {
    formView() {
      this.view = this.formView
    },
    selectData() {
      console.log(this.selectData)
      this.form.id = this.selectData.id
      this.form.buyer = this.selectData.Buyer
      this.form.type = this.selectData.ComponentsType
      this.form.dire = this.selectData.Direction
      this.form.num = this.selectData.Number
      this.form.time = this.selectData.CreateTime
      console.log(this.form)
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
      if (this.update && (this.form.id === '' || this.form.buyer === '' || this.form.type === '' || this.form.dire === '' || this.form.num === '' || this.form.time === '')) {
        this.$message({
          message: '输入不应为空',
          type: 'error',
          duration: 1.5 * 1000
        })
        return
      }
      if (this.update) {
        api.updateOrder(this.form.id, this.form.buyer, this.form.num, this.form.dire, this.form.type, this.form.time)
      } else {
        api.addOrder(this.last, this.form.buyer, this.form.num, 1, this.form.type, dayjs().unix())
      }
      this.$message({
        message: '操作成功',
        type: 'success',
        duration: 3 * 1000
      })
      this.handleClose()
    },
    formReset() {
      this.form.id = ''
      this.form.buyer = ''
      this.form.type = ''
      this.form.dire = 0
      this.form.num = 0
      this.form.time = 0
    }
  }
}
</script>

<style>
.el-drawer__body {
  padding: 20px;
}
</style>
