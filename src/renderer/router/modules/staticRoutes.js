/**
 * 静态路由
 * @type {*[]}
 */
/* Layout */
import Layout from '@/layout'

export const staticRoutes = [
  {
    path: '/online',
    component: Layout,
    redirect: '/online/home',
    meta: {title: '在线音乐', requireAuth: false, icon: 'icon-yinle'},
    children: [
      {
        path: 'home',
        component: () => import('@/views/music/index'),
        name: 'Home',
        meta: {title: '音乐馆', requireAuth: false, icon: 'icon-yinle'}
      },
      {
        path: 'mv',
        component: () => import('@/views/mv/index'),
        name: 'MV',
        meta: {title: 'MV', requireAuth: false, icon: 'icon-mv'}
      },
      {
        path: 'radio',
        component: () => import('@/views/radioStation/index'),
        name: 'RadioStation',
        meta: {title: '个性电台', requireAuth: false, icon: 'icon-mv'}
      },
      {
        path: 'friends',
        component: () => import('@/views/friends/index'),
        name: 'Friends',
        meta: {title: '朋友', requireAuth: false, icon: 'icon-mv'}
      }
    ]
  },
  {
    path: '/music',
    component: Layout,
    redirect: '/music/live',
    meta: {title: '我的音乐', requireAuth: false, icon: 'icon-yinle'},
    children: [
      {
        path: 'local',
        component: () => import('@/views/mv/index'),
        name: 'Local',
        meta: {title: '本地和下载', requireAuth: false, icon: 'icon-mv'},
      },
      {
        path: 'history',
        component: () => import('@/views/mv/index'),
        name: 'History',
        meta: {title: '播放历史', requireAuth: false, icon: 'icon-mv'},
      },
      {
        path: 'audition',
        component: () => import('@/views/mv/index'),
        name: 'Audition',
        meta: {title: '试听列表', requireAuth: false, icon: 'icon-mv'}
      }
    ]
  },
  {
    path: '/common',
    component: Layout,
    meta: {title: '我的音乐', requireAuth: false, icon: 'icon-yinle'},
    hidden: true,
    children: [
      {
        path: 'playList/:id(\\d+)',
        component: () => import('@/views/playList/index'),
        name: 'PlayList',
        meta: {title: '歌单详情', requireAuth: false, icon: 'icon-yinle'},
      }
    ]
  },
  {
    path: '/sheet',
    component: Layout,
    redirect: '/sheet/d/:id(\\d+)',
    meta: {title: '我创建的歌单', requireAuth: false, icon: 'icon-yinle'},
    hidden: true,
    children: [
      {
        path: 'd/:id(\\d+)',
        component: () => import('@/views/playList/index'),
        name: 'SongSheet',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      }
    ]
  },
  {
    path: '/collect',
    component: Layout,
    redirect: '/collect/d/:id(\\d+)',
    meta: {title: '我收藏的歌单', requireAuth: false, icon: 'icon-yinle'},
    hidden: true,
    children: [
      {
        path: 'd/:id(\\d+)',
        component: () => import('@/views/playList/index'),
        name: 'SongCollect',
        meta: {title: 'wake me up', requireAuth: false, icon: 'icon-yinle'},
      }
    ]
  },
]
