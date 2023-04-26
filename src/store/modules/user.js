import { logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { ab_login } from '@/api/abtest/user'

const state = {
  token: getToken(),
  status: -1,
  c_status: -1,
  company_id: -1,
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const tokens = {
  0: 'admin-token',
  1: 'editor-token'
}

const rolesMap = {
  0: {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },
  1: {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_C_STATUS: (state, c_status) => {
    state.c_status = c_status
  },
  SET_COMPANY_ID: (state, company_id) => {
    state.company_id = company_id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      ab_login({ 'email': email.trim(), 'password': password }).then(response => {
        const data = response.data.obj
        // console.log(tokens[data.status])
        const token = tokens[data.status]
        commit('SET_TOKEN', token)
        setToken(token)
        const user = rolesMap[data.status]
        commit('SET_NAME', data.name)
        commit('SET_STATUS', data.status)
        commit('SET_C_STATUS', data.status)
        commit('SET_COMPANY_ID', data.companyId)
        commit('SET_AVATAR', user.avatar)
        commit('SET_INTRODUCTION', user.introduction)
        resolve()
      }).catch(error => {
        alert(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const { data } = state.status
      // console.log(state.status)
      if (state.status === -1) {
        reject('Verification failed, please Login again.')
      }
      // console.log(rolesMap[state.status].roles)
      resolve(rolesMap[state.status].roles)
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
