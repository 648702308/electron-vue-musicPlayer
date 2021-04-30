import Layout from '@/layout'
/* Router Modules */
import {staticRoutes} from './modules/staticRoutes'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/viewc/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/online'
  },
  ...staticRoutes
]
