<template>
  <div class="app-container" style="text-align: -webkit-center;">

    <div>
      <el-divider>分流操作</el-divider>
      <el-form :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Token" prop="type">
          <el-input v-model="temp.token" />
        </el-form-item>

        <el-form-item label="Flow Unit" prop="type">
          <el-select v-model="temp.flowUnit" placeholder="flow_unit" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in unitOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item label="UID" prop="type">
          <el-input v-model="temp.uid" />
        </el-form-item>

        <el-form-item label="RID" prop="type">
          <el-input v-model="temp.rid" />
        </el-form-item>

        <el-form-item label="DID" prop="type">
          <el-input v-model="temp.did" />
        </el-form-item>

        <el-form-item label="RequestConfig" prop="type">
          <el-input v-model="temp.requestConfig" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleFlow">
          请求
        </el-button>
      </div>
    </div>

    <el-divider>分流记录</el-divider>
    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column label="分流id" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.flowId }} </span>
        </template>
      </el-table-column>
      <el-table-column label="分流命中vid list" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vidList }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分流命中配置" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.config }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分流请求" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.request }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分流message" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.message }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分流时间" min-width="30px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="50px" align="center">
        <template slot-scope="{$index}">
          <el-button @click="handleDelete($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { flowRequest } from '@/api/abtest/flow'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const unitOptions = [
  { key: 'uid', display_name: 'UID' },
  { key: 'did', display_name: 'DID' },
  { key: 'rid', display_name: 'RID' }
]

export default {
  name: 'CompanyUser',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      temp: {
        uid: '123456',
        rid: '123456',
        did: '123456',
        token: 'ab_test',
        flowUnit: 'uid',
        requestConfig: '{age:18}'
      },
      listLoading: true,
      unitOptions
    }
  },
  created() {
  },
  methods: {
    handleFlow() {
      flowRequest(this.temp).then(response => {
        if (response.data.obj != null) {
          console.log(this.list)
          this.list.push(response.data.obj)
          console.log(this.list)
        }
      })
    },
    handleDelete(index) {
      this.list.splice(index, 1)
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
