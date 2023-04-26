<template>
  <div class="app-container">
    <!--    <span>-->
    <!--      这是实验详情页面。-->
    <!--      {{ flight }}-->
    <!--    </span>-->
    <div class="f">
      <el-divider />
      实验名称： {{ flight.flight.name }}
      <el-divider />
    </div>
    <div class="f">
      <el-divider />
      实验创建者：{{ flight.owner.name }}
      <el-divider />
    </div>
    <div class="f">
      <el-divider />
      实验用户：
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="flight.users"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="用户名称" min-width="40px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="用户身份" min-width="80px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.position | positionFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="f">
      <el-divider />
      <span v-bind="flight.flight.status">实验状态：{{ flight.flight.status | statusFilter }}</span>
      <el-button type="primary" @click="editFlightStatus(1)">
        测试实验
      </el-button>
      <el-button type="success" @click="editFlightStatus(2)">
        运行实验
      </el-button>
      <el-button type="warning" @click="editFlightStatus(3)">
        暂停实验
      </el-button>
      <el-button type="danger" @click="endFlight">
        结束实验
      </el-button>
      <el-divider />
    </div>
    <div class="f">
      <el-divider />
      实验流量：{{ flight.flight.traffic / 10 + '%' }}
      <el-divider />
    </div>
    <div class="f">
      <el-divider />
      实验过滤条件： {{ flight.flight.filter }}
      <el-divider />
    </div>
    <div class="f">
      <el-divider />
      实验层：
      <el-divider />
      <div>   名称： {{ flight.layer.name }}</div>
      <el-divider />
      <div>   url： {{ flight.layer.token +'/'+ flight.layer.flowUnit +'/'+ (flight.layer.traffic / 10) +'%' }}</div>
      <el-divider />
    </div>
    <div class="f">
      <el-divider />
      实验组：
      <el-divider />
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="flight.versions"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" prop="id" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.versionId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="实验组名称" min-width="40px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="实验组配置" min-width="80px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.config }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实验组创建时间" width="200px">
          <template slot-scope="{row}">
            <span>{{ row.createTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import { fetchFlightById, editFlightStatus2Run, editFlightStatus2Test, editFlightStatus2Pause, endFlight } from '@/api/company'

export default {
  name: 'FlightDetail',
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
    },
    positionFilter(status) {
      const statusMap = {
        0: '创建者',
        1: '管理员',
        2: '普通用户'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      flight_id: undefined,
      flight: undefined
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$data.flight_id = this.$route.query.flight_id
      this.getFlight(this.$data.flight_id)
    },
    getFlight(flight_id) {
      fetchFlightById(flight_id).then(response => {
        this.flight = response.data.obj
      })
    },
    editFlightStatus(status) {
      if (status === 1) {
        editFlightStatus2Test(this.$data.flight.flightId)
      }
      if (status === 2) {
        editFlightStatus2Run(this.$data.flight.flightId)
      }
      if (status === 3) {
        editFlightStatus2Pause(this.$data.flight.flightId)
      }
      this.$router.go(0)
      this.$message({
        message: '操作Success',
        type: 'success'
      })
    },
    endFlight() {
      endFlight(this.$data.flight.flightId)
      this.$router.go(0)
    }
  }
}
</script>
<style>
.f {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 15px;
  position: center;
  padding: 15px
}
</style>
