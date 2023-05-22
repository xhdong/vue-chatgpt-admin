<template>
  <el-row class="app-container">
    <query-form
      :form="queryForm"
      :loading="loading"
      :page-num="pageNum"
      @query="handleQuery"
      @reset="handleReset"
    />

    <table-data :loading="loading" :data="tableData" />

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
import QueryForm from '@/components/ManageManage/QueryForm.vue'
import TableData from '@/components/ManageManage/TableData.vue'
export default {
  name: 'ManageManage',
  components: {
    QueryForm,
    TableData
  },
  data() {
    return {
      queryForm: {
        userName: ''
      },
      tableData: [],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    handleQuery(pageNum) {
      this.tableData = [
        {
          userName: 'xhdong'
        }
      ]
    },
    handleReset() {
      this.pageNum = 1
      this.handleQuery(this.pageNum)
    },
    handleSizeChange(val) {
      this.pageNum = val
      this.handleQuery(val)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.handleQuery(val)
    }
  },
  created() {
    this.handleQuery(this.pageNum)
  }
}
</script>

<style scoped></style>
