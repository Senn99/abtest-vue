<template>
  <div class="app-container">

    <el-divider>企业名单</el-divider>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.companyId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="创建者名称" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.creatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="企业创建时间" min-width="20px" align="center">
        <template slot-scope="{row}">
          <span>
            {{ row.createTime }}
          </span>
        </template>
      </el-table-column>
    </el-table>

    <el-divider>企业创建申请名单</el-divider>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="applyList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.createApplyId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="企业名称" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.companyName }} </span>
        </template>
      </el-table-column>

      <el-table-column label="用户名称" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }} </span>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status | applyStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="50px" align="center">
        <template v-if="row.status===0" slot-scope="{row}">
          <el-button type="success" @click="handleApplyStatus2Agree(row.createApplyId)">
            通过
          </el-button>
          <el-button type="danger" @click="handleApplyStatus2Refuse(row.createApplyId)">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { fetchCreateApplyList, editCreateApplyStatus2Agree, editCreateApplyStatus2Refuse, listAllCompany } from '@/api/company'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CompanyUser',
  components: { Pagination },
  directives: { waves },
  filters: {
    applyStatusFilter(status) {
      const statusMap = {
        0: '已创建',
        1: '已通过',
        2: '已拒绝'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      applyList: null,
      listLoading: true
    }
  },
  created() {
    this.getApplyList()
    this.getList()
  },
  methods: {
    getList() {
      listAllCompany().then(response => {
        this.list = response.data.obj.list
      })
    },
    getApplyList() {
      this.listLoading = true
      fetchCreateApplyList().then(response => {
        this.applyList = response.data.obj.list
        // this.total = response.data.obj.total
        // Just to simulate the time of the request

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleApplyStatus2Agree(apply_id) {
      editCreateApplyStatus2Agree(apply_id).then(response => {
        if (response.data.obj) {
          this.$notify({
            title: 'Success',
            message: 'Agree Successfully',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Failed',
            message: 'Agree Failed',
            type: 'warning',
            duration: 2000
          })
        }
        this.getList()
        this.getApplyList()
      })
    },
    handleApplyStatus2Refuse(apply_id) {
      editCreateApplyStatus2Refuse(apply_id).then(response => {
        if (response.data.obj) {
          this.$notify({
            title: 'Success',
            message: 'Refuse Successfully',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Failed',
            message: 'Refuse Failed',
            type: 'warning',
            duration: 2000
          })
        }
        this.getApplyList()
      })
    }

  }
}
</script>
