import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$msg = function (message, type = 'error') {
    Vue.prototype.$message({
        message: 'TuTu: ' + message,
        type
    })
}
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')