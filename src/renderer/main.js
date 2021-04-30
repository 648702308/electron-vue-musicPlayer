import Vue from 'vue'
import axios from 'axios'

import App from './App'
import store from './store'
import router from './router'
import 'normalize.css/normalize.css' // css  重置样式
import '@/assets/iconfont/iconfont.css' // 字体图标

import './styles/index.scss' // 自定义css
import './styles/style.scss' // 自定义css

import './icons' // icon
import './permission' // permission control


import Element from 'element-ui'
import './styles/element-variables.scss'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
// 全局修改默认配置，
// 点击空白处不能关闭弹窗
Element.Dialog.props.closeOnClickModal.default = false
// 关闭时销毁 Dialog 中的元素
Element.Dialog.props.destroyOnClose.default = true
Element.Dialog.props.appendToBody.default = true
Vue.use(Element, {})

import {title} from './settings'

Vue.prototype.TITLE = title

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios

Vue.prototype.$bus = new Vue()


import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.config.productionTip = false
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
/* eslint-disable no-new */
new Vue({
  components: {App},
  store,
  router,
  template: '<App/>'
}).$mount('#app')
