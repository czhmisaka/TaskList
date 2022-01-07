/*
 * @Author: czh
 * @Date: 2021-06-10 10:07:04
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import util from '@/utils/util.js'
import axios from 'axios'
const G2 = require('@antv/g2')

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$get = axios.get

Vue.prototype.$msg = function (message, type = 'error') {
    Vue.prototype.$message({
        message: 'TuTu: ' + message,
        type
    })
}


// 挂载G2
Vue.prototype.$G2 = G2

// 全量引入util,避免prototye原有改写
for (let x in util) {
    Vue.prototype['$' + x] = util[x]
}

Vue.use(ElementUI)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')