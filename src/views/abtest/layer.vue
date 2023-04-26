<template>
  <div class="app-container" style="text-align: -webkit-center;">
    <!--    <div class="filter-container">-->
    <!--      <el-input v-model="listQuery.name" placeholder="name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>-->
    <!--      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">-->
    <!--        搜索-->
    <!--      </el-button>-->
    <!--    </div>-->
    <el-divider>实验层</el-divider>
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
          <span>{{ row.layerId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="测试实验数量" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.test }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Token" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.token }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分流单位" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.flowUnit }}</span>
        </template>
      </el-table-column>

      <el-table-column label="剩余流量" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.traffic }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开始时间" min-width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="actionVisible">
      <el-divider>实验层操作</el-divider>
      <div class="reflux_params">
        <el-button type="success" @click="handleEdit">
          添加
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { fetchLayerList } from '@/api/company'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CompanyUser',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      actionVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLayerList(this.$store.state.ab_user.companyId).then(response => {
        this.list = response.data.obj
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
<style>
.reflux_params{
  width:max-content;
  color: #0695f8
}
</style>
