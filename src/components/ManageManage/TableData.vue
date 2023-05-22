<template>
  <div v-loading="loading" class="table-wrapper">
    <el-table
      border
      :data="data"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
    >
      <el-table-column prop="userName" label="会员名" width />
      <el-table-column label="操作" width>
        <template slot-scope="scoped">
          <el-button size="mini" type="primary" plain @click="handleEdit(scoped.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleEdit(row) {
      console.log(row)
    }
  }
}
</script>

<style>
</style>
