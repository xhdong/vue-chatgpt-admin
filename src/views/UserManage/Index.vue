<template>
  <el-row class="app-container">
    <table-data :loading="listLoading" :data="list" @disabled="disabledUser" />

    <div class="page-wrapper">
      <el-pagination
        small
        layout="prev, pager, next"
        :current-page="pageNum"
        :total="total"
        :page-size="pageSize"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-row>
</template>

<script>
import TableData from '@/components/UserManage/TableData.vue'
import { getList, disabledUser } from '@/api/user'

export default {
  components: {
    TableData
  },
  data() {
    return {
      list: null,
      listLoading: true,
      pageNum: 1,
      total: 0,
      pageSize: 10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageNum = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    fetchData() {
      this.listLoading = true
      getList({ id: 1 }).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    disabledUser(row) {
      this.$confirm('是否继续禁用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          disabledUser(row.id).then(() => {
            this.$message.success('禁用成功')
            this.fetchData()
          })
        })
        .catch(e => {
          console.log(e)
          this.$message({
            type: 'info',
            message: '下单已取消'
          })
        })
    }
  }
}
</script>

<style scoped></style>
