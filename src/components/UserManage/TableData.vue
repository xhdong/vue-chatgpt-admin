<template>
  <div class="table-wrapper">
    <el-table
      v-loading="loading"
      :data="data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="200">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="用户名" align="center" width>
        <template slot-scope="scope">{{ scope.row.loginName }}</template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.status | statusFilter }}</template>
      </el-table-column>
      <el-table-column label="用户类型" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.vipGrade }}</template>
      </el-table-column>
      <el-table-column label="余额" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column label="Unionid" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.unionid }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleRecharge(scope.row)">充值</el-button>
          <el-button type="danger" size="mini" @click="handleDisabledUser(scope.row)">禁用</el-button>
          <el-button size="mini">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import config from '@/config/dict.js'
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
  filters: {
    statusFilter(status) {
      return config.statusMap[status]
    }
  },
  methods: {
    handleRecharge(row) {
      console.log(row)
      this.$emit('recharge')
    },
    handleDisabledUser(row) {
      console.log(row)
      this.$emit('disabled')
    }
  }
}
</script>

<style>
</style>
