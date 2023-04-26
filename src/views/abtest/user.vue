<template>
  <div class="app-container">
    <!--    <div class="filter-container">-->
    <!--      <el-input v-model="listQuery.name" placeholder="name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>-->
    <!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
    <!--        搜索-->
    <!--      </el-button>-->
    <!--    </div>-->
    <el-divider>企业用户名单</el-divider>
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
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="企业身份" min-width="20px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status ">
            {{ row.companyUserStatus | companyStatusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column label="查看详情" align="center" width="100px" class-name="small-padding fixed-width" prop="data">-->
      <!--        <template>-->
      <!--          <el-button type="primary" size="mini" @click="handleDetail">-->
      <!--            查看-->
      <!--          </el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <!--    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>-->

    <el-divider>企业申请加入名单</el-divider>

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
          <span>{{ row.joinApplyId }}</span>
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
          <el-button type="success" @click="handleApplyStatus2Agree(row.joinApplyId)">
            通过
          </el-button>
          <el-button type="danger" @click="handleApplyStatus2Refuse(row.joinApplyId)">
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>-->
  </div>
</template>

<script>
import { fetchUserList, fetchJoinApplyList, editApplyStatus2Agree, editApplyStatus2Refuse } from '@/api/company'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CompanyUser',
  components: { Pagination },
  directives: { waves },
  filters: {
    // 页面的过滤条件
    companyStatusFilter(status) {
      const statusMap = {
        0: '创建者',
        1: '管理员',
        2: '普通用户'
      }
      return statusMap[status]
    },
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
      total: 0,
      listLoading: true,
      listQuery: {
        companyId: 1,
        page: 1,
        limit: 20,
        name: undefined
      }
    }
  },
  created() {
    this.getList()
    this.getApplyList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        this.list = response.data.obj.list
        this.total = response.data.obj.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getApplyList() {
      this.listLoading = true
      fetchJoinApplyList(this.listQuery.companyId).then(response => {
        this.applyList = response.data.obj.list
        // this.total = response.data.obj.total
        // Just to simulate the time of the request

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleApplyStatus2Agree(apply_id) {
      editApplyStatus2Agree(apply_id).then(response => {
        if (response.data.obj) {
          this.$notify({
            title: 'Success',
            message: 'Agree Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleApplyStatus2Refuse(apply_id) {
      editApplyStatus2Refuse(apply_id).then(response => {
        if (response.data.obj) {
          this.$notify({
            title: 'Success',
            message: 'Refuse Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    }

  }
}
</script>
