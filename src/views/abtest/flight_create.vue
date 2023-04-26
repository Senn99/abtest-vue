<template>
  <div class="app-container">
    <el-form ref="dynamicValidateForm" :model="flightForm" label-width="auto" class="demo-dynamic" size="medium">
      <el-form-item
        prop="flight.name"
        label="实验名称"
      >
        <el-input v-model="flightForm.email" placeholder="vue-test" class="small" />
      </el-form-item>
      <el-form-item
        prop="owner.userId"
        label="实验创建者编号"
      >
        <el-input v-model="flightForm.owner.userId" class="small" />
      </el-form-item>
      <el-form-item label="实验用户：" />
      <el-form-item
        v-for="(user, index) in flightForm.users"
        :key="user.key"
        :label="'用户-' + index"
      >
        <span>编号：</span>
        <el-input v-model="user.userId" class="small" style="" />
        <el-select v-model="user.position" placeholder="身份">
          <el-option label="管理员" value="1" />
          <el-option label="创建者" value="2" />
        </el-select>
        <el-button @click.prevent="removeUser(user)">删除</el-button>
      </el-form-item>

      <el-form-item
        prop="layer.layerId"
        label="实验层"
      >
        <el-select v-model="flightForm.layer.layerId" placeholder="实验层">
          <el-option
            v-for="item in layer"
            :key="item.layerId"
            :label="`${item.token}/${item.flow_unit}/${item.traffic / 10}`"
            :value="item.layerId"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        prop="flight.traffic"
        label="实验流量"
      >
        <el-input v-model="flightForm.flight.traffic" class="small" placeholder="5" />
      </el-form-item>

      <el-form-item
        prop="flight.filter"
        label="实验过滤条件"
      >
        <el-input v-model="flightForm.flight.filter" type="text" class="small" placeholder="{'age':'18'}" />
      </el-form-item>

      <el-form-item label="实验测试用户：" />

      <el-form-item
        v-for="(user, index) in flightForm.testUsers"
        :key="user.key"
        :label="'测试用户-' + index"
      >
        <span>编号：</span>
        <el-input v-model="user.flowContent" class="small" style="" />
        <el-button @click.prevent="removeTestUser(user)">删除</el-button>
      </el-form-item>

      <el-form-item label="实验组：" />
      <el-form-item
        v-for="(version, index) in flightForm.versions"
        :key="version.key"
        :label="'实验组-' + index"
      >
        <span>名称：</span>
        <el-input v-model="version.name" class="small" style="" />
        <span> 配置：</span>
        <el-input v-model="version.config" class="small" style="" />
        <el-button @click.prevent="removeVersion(version)">删除</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="addUser">新增实验用户</el-button>
        <el-button @click="addTestUser">新增实验测试用户</el-button>
        <el-button @click="addVersion">新增实验组</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { fetchCompanyLayerList, addFlight } from '@/api/company'

export default {
  filter: {
    layerUrlMap(item) {
      return item.token + '/' + item.flow_unit + '/' + (item.traffic / 10)
    }
  },
  data() {
    return {
      flightForm: {
        flightId: undefined,
        owner: {
          userId: 1
        },
        users: [{
          userId: 2,
          position: 1
        }],
        testUsers: [{
          flowContent: '1001'
        }],
        flight: {
          companyId: 1,
          name: 'vue-test',
          status: 0,
          traffic: 5,
          layerId: 1,
          filter: '{age:18}'
        },
        layer: {
          layerId: undefined
        },
        versions: [
          {
            name: 'vue-v1',
            config: '{color:red}'
          },
          {
            name: 'vue-v1',
            config: '{color:blue}'
          }
        ]
      },
      layer: undefined
    }
  },
  created() {
    this.listLayers(1)
  },
  methods: {

    listLayers(id) {
      fetchCompanyLayerList(id).then(response => {
        this.layer = response.data.obj
      })
    },
    submitForm() {
      addFlight(this.flightForm).then(response => {
        this.$message({
          message: response.data,
          type: 'success'
        })
      })
    },
    addUser() {
      this.flightForm.users.push({
        userId: '',
        position: '',
        key: Date.now()
      })
    },
    removeUser(item) {
      var index = this.flightForm.users.indexOf(item)
      if (index !== -1) {
        this.flightForm.users.splice(index, 1)
      }
    },

    addTestUser() {
      this.flightForm.testUsers.push({
        flow_content: '',
        key: Date.now()
      })
    },
    removeTestUser(item) {
      var index = this.flightForm.testUsers.indexOf(item)
      if (index !== -1) {
        this.flightForm.testUsers.splice(index, 1)
      }
    },

    addVersion() {
      this.flightForm.versions.push({
        name: '',
        config: '',
        key: Date.now()
      })
    },
    removeVersion(item) {
      var index = this.flightForm.versions.indexOf(item)
      if (index !== -1) {
        this.flightForm.versions.splice(index, 1)
      }
    }
  }
}
</script>
<style>
.small{
  width:200px;
  margin-bottom:10px;
}
</style>
