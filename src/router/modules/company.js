/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const companyRouter = {
  path: '/company',
  component: Layout,
  redirect: '/abtest/company',
  name: '企业',
  meta: {
    title: '企业',
    icon: 'table',
    roles: ['admin', 'editor']
  },
  children: [
    {
      path: '/company/user',
      component: () => import('@/views/abtest/user'),
      name: 'User',
      meta: {
        title: '用户',
        roles: ['admin', 'editor']
      }
    },
    {
      path: '/company/flight',
      component: () => import('@/views/abtest/flight'),
      name: 'Flight',
      meta: {
        title: '实验',
        roles: ['admin', 'editor']
      }
    },
    {
      path: '/company/layer',
      component: () => import('@/views/abtest/layer'),
      name: 'Layer',
      meta: {
        title: '实验层',
        roles: ['admin', 'editor']
      }
    },
    {
      path: '/company/reflux',
      component: () => import('@/views/abtest/reflux'),
      name: 'Reflux',
      meta: {
        title: '回流',
        roles: ['admin', 'editor']
      }
    },
    {
      path: '/company/flow',
      component: () => import('@/views/abtest/flow'),
      name: 'Flow',
      meta: {
        title: '分流',
        roles: ['admin', 'editor']
      }
    }
  ]
}
export default companyRouter
