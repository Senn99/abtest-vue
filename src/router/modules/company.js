/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const companyRouter = {
  path: '/company',
  component: Layout,
  redirect: '/abtest/company',
  name: '企业',
  meta: {
    title: '企业',
    icon: 'table'
  },
  children: [
    {
      path: '/company/user',
      component: () => import('@/views/abtest/user'),
      name: 'User',
      meta: { title: '用户' }
    },
    {
      path: '/company/flight',
      component: () => import('@/views/abtest/flight'),
      name: 'Flight',
      meta: { title: '实验' }
    },
    {
      path: '/company/layer',
      component: () => import('@/views/abtest/layer'),
      name: 'Layer',
      meta: { title: '实验层' }
    },
    {
      path: '/company/reflux',
      component: () => import('@/views/abtest/reflux'),
      name: 'Reflux',
      meta: { title: '回流' }
    }
  ]
}
export default companyRouter
