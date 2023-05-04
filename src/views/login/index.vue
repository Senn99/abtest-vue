<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.email"
          placeholder="Username"
          name="email"
          type="email"
          tabindex="1"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin">Login</el-button>

    </el-form>

    <el-dialog title="Join Company" :visible.sync="dialogFormVisible">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="clist"
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
        <el-table-column label="操作" align="center" width="100px" class-name="small-padding fixed-width" prop="data">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleJoin(row.companyId)">
              申请加入
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="createFormVisible" style="text-align: -webkit-center; font-size: 20px; color: #36a3f7">
        <el-divider>创建企业</el-divider>
        <el-form :model="company" label-position="left" label-width="100px">
          <el-form-item label="Name" prop="type" style="color: white">
            <el-input v-model="company.companyName" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleCreateCompany">
          CreateCompany
        </el-button>
        <el-divider />
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createFormVisible = true">
          Create
        </el-button>
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'
import { ab_login } from '@/api/abtest/user'
import { listAllCompany, addCompanyJoinApply, createCompany } from '@/api/company'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    return {
      loginForm: {
        email: '123456@qq.com',
        password: '123456'
      },
      apply: {},
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      dialogFormVisible: false,
      createFormVisible: false,
      clist: null,
      userId: -1,
      company: {
        companyName: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true

      ab_login(this.loginForm).then(response => {
        const user = response.data.obj
        if (response.data.code === 200) {
          this.$notify({
            title: 'Success',
            message: response.data.message,
            type: 'success',
            duration: 2000
          })

          if (user.companyId == null) {
            this.apply.userId = user.userId
            this.userId = user.userId
            listAllCompany().then(response => {
              // alert(response.data)
              this.clist = response.data.obj.list
            })
            this.dialogFormVisible = true
          } else {
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                ab_login(this.loginForm).then(response => {
                  this.$store.state.ab_user = response.data.obj
                })

                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          }
        } else if (response.data.code === 400) {
          this.$notify({
            title: 'Warming',
            message: '账号密码错误',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleJoin(companyId) {
      this.apply.companyId = companyId
      // alert(this.apply)
      // console.log(this.apply)
      addCompanyJoinApply(this.apply).then(response => {
        if (response.data.obj) {
          this.$notify({
            title: 'Success',
            message: 'Join Apply Successfully',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Error',
            message: 'Join Apply Exist..',
            type: 'warning',
            duration: 2000
          })
        }
      })
    },
    handleCreateCompany() {
      this.company.userId = this.userId
      console.log(this.company)
      createCompany(this.company).then(response => {
        if (response.data.obj) {
          this.$notify({
            title: 'Success',
            message: 'Create Apply Successfully',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Error',
            message: 'Create Apply Exist..',
            type: 'warning',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
