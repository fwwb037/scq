import App from './App'
import fui from 'common/fui-app'
import uView from '@/uni_modules/uview-ui'
// #ifndef VUE3
import Vue from 'vue'
import tmVuetify from "./tm-vuetify";
import Request from '@/utils/luch-request/index.js' // 下载的插件
// import Request from 'luch-request' // 使用npm
import store from'./store'

Vue.use(tmVuetify)
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store=store
Vue.prototype.fui=fui
const app = new Vue({
  ...App,
  
  beforeCreate(){
  		Vue.prototype.$bus = this	//安装全局事件总线
  	}
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.fui = fui;
  return {
    app
	
  }
 
}
// #endif