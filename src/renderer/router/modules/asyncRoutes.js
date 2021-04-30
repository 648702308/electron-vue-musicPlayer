/**
 * 异步路由
 * @type {*[]}
 */
/* Layout */
import Layout from '@/layout'

export const asyncRoutes = [
  {
    path: '/sheet',
    component: Layout,
    redirect: '/sheet/1',
    meta: {title: '我创建的歌单', requireAuth: false, icon: 'icon-yinle'},
    children: [
      {
        path: '1',
        component: () => import('@/views/music/index'),
        name: 'Live',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      },
      {
        path: '2',
        component: () => import('@/views/mv/index'),
        name: 'Local',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      },
      {
        path: '3',
        component: () => import('@/views/mv/index'),
        name: 'History',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      },
      {
        path: '4',
        component: () => import('@/views/mv/index'),
        name: 'Audition',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'}
      }
    ]
  },
  {
    path: '/collect',
    component: Layout,
    redirect: '/collect/1',
    meta: {title: '我收藏的歌单', requireAuth: false, icon: 'icon-yinle'},
    children: [
      {
        path: '1',
        component: () => import('@/views/music/index'),
        name: 'Live',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      },
      {
        path: '2',
        component: () => import('@/views/mv/index'),
        name: 'Local',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      },
      {
        path: '3',
        component: () => import('@/views/mv/index'),
        name: 'History',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      },
      {
        path: '4',
        component: () => import('@/views/mv/index'),
        name: 'Audition',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'}
      }
    ]
  }
]
