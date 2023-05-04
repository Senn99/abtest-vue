<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" placeholder="status" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建实验
      </el-button>
    </div>

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
          <span>{{ row.flightId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="实验名称" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ownerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实验状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status ">
            {{ row.status | statusFilter }}
          </el-tag>
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
      <el-table-column label="查看详情" align="center" width="100px" class-name="small-padding fixed-width" prop="data">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleDetail(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>-->
  </div>
</template>

<script>
import { fetchFlightList, fetchFlightListWithFilter } from '@/api/company'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const statusOptions = [
  { key: '0', display_name: '已创建' },
  { key: '1', display_name: '测试中' },
  { key: '2', display_name: '运行中' },
  { key: '3', display_name: '已暂停' },
  { key: '4', display_name: '已结束' }
]

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    // 页面的过滤条件
    statusFilter(status) {
      const statusMap = {
        0: '已创建',
        1: '测试中',
        2: '运行中',
        3: '已暂停',
        4: '已结束'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        companyId: 1,
        page: 1,
        limit: 20,
        name: undefined,
        status: undefined
      },
      statusOptions,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.listQuery.companyId = this.$store.getters.company_id
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchFlightList(this.listQuery).then(response => {
        this.list = response.data.obj.list
        this.total = response.data.obj.total
        console.log(response.data.obj.total)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDetail(row) {
      this.$router.push({ path: '/flight/detail', query: { 'flight_id': row.flightId }})
    },
    handleCreate() {
      this.$router.push('/flight/create')
    },
    handleFilter() {
      this.listQuery.page = 1
      fetchFlightListWithFilter(this.listQuery).then(response => {
        this.$set(this.$data, 'list', response.data.obj.list)
        this.$forceUpdate()
        if (response.data.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Select Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row) // copy obj
    //   this.temp.timestamp = new Date(this.temp.timestamp)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // updateData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp)
    //       tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //       updateArticle(tempData).then(() => {
    //         const index = this.list.findIndex(v => v.id === this.temp.id)
    //         this.list.splice(index, 1, this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: 'Update Successfully',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const data = this.formatJson(filterVal)
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: 'table-list'
    //     })
    //     this.downloadLoading = false
    //   })
    // },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
