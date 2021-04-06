import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import util from '@/utils/util.js'
console.log({
    ...util
})

Vue.config.productionTip = false

Vue.prototype.$msg = function (message, type = 'error') {
    Vue.prototype.$message({
        message: 'TuTu: ' + message,
        type
    })
}

// 全量引入util,避免prototye原有改写
for (let x in util) {
    Vue.prototype[x] = util[x]
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')