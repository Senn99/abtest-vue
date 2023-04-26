<template>
  <div class="app-container" style="text-align: -webkit-center; font-size: 20px">
    <el-divider>分流接口 URL</el-divider>
    <div class="reflux_params" style="width:max-content;color: #0695f8">
      {{ reflux.url }}
    </div>
    <el-divider>分流TQS</el-divider>
    <div class="reflux_params">
      {{ reflux.tqs }}
    </div>
    <el-divider>分流状态</el-divider>
    <div class="reflux_params">
      {{ reflux.status | statusFilter }}
    </div>
    <el-divider>分流接口创建时间</el-divider>
    <div class="reflux_params">
      {{ reflux.createTime }}
    </div>
    <el-divider>分流接口更新时间</el-divider>
    <div class="reflux_params">
      {{ reflux.updateTime }}
    </div>
    <el-divider>分流接口操作</el-divider>
    <div class="reflux_params">
      <el-button v-if="reflux" type="success" @click="handleEdit">
        修改
      </el-button>
    </div>
    <el-dialog title="edit reflux" :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="URL" prop="type">
          <el-input v-model="temp.url" />
        </el-form-item>

        <el-form-item label="TQS" prop="type">
          <el-input v-model="temp.tqs" />
        </el-form-item>

        <el-form-item label="Status" prop="type">
          <el-select v-model="temp.status" placeholder="status" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="handleUpdate">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editReflux, getReflux } from '@/api/company'

const statusOptions = [
  { key: '0', display_name: '已创建' },
  { key: '2', display_name: '运行中' },
  { key: '3', display_name: '已暂停' },
  { key: '4', display_name: '已结束' }
]

export default {
  name: 'ReFlux',
  filters: {
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
      reflux: {
        companyId: 1,
        url: 'http://localhost:8080 (默认)',
        tqs: 100,
        status: 1,
        createTime: '2023-04-14 09:40:06',
        updateTime: '2023-04-14 17:40:05'
      },
      temp: {
        url: 'url',
        tqs: 0,
        status: 0
      },
      statusOptions,
      dialogFormVisible: false
    }
  },
  created() {
    this.getReflux()
  },
  methods: {
    getReflux() {
      getReflux(this.$store.state.ab_user.companyId).then(response => {
        console.log(response.data)
        this.reflux = response.data.obj
      })
    },
    handleEdit() {
      this.temp = this.reflux
      this.dialogFormVisible = true
    },
    handleUpdate() {
      editReflux(this.temp).then(response => {
        if (response.data.obj) {
          this.$notify({
            title: 'Update',
            message: 'Update Success',
            type: 'success',
            duration: 2000
          })
        }
        this.dialogFormVisible = false
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
