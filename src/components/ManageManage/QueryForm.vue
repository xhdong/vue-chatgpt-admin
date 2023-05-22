<template>
  <div class="form-wrapper form-wrapper-md">
    <el-form ref="form" size="small" inline :model="form" label-width="100px" label-suffix="：">
      <div class="form-group">
        <el-form-item label="会员名" prop="userName">
          <el-input v-model="form.userName" placeholder="会员名" class="form-control" />
        </el-form-item>
      </div>
      <div class="btn-group">
        <el-button
          class="btn-cancel"
          size="small"
          icon="el-icon-refresh"
          @click="handleReset('form')"
        >重置</el-button>
        <el-button
          size="small"
          type="primary"
          class="btn-search"
          icon="el-icon-search"
          :loading="loading"
          @click="handleQuery"
        >搜索</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    pageNum: {
      type: Number,
      default: () => 1
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleReset(formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    handleQuery() {
      this.$emit('query', this.pageNum, 'query')
    }
  }
}
</script>

<style>
</style>
