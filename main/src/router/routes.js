import taskList from '@/views/taskList.vue'
import test from '@/views/keyCodeTest.vue'
import Cainiao from '@/components/animate/Cainiao'

// 组件单元库
const cellStorage = {
    taskList: {
        component: taskList,
        name: '任务列表'
    },
    Cainiao:{
        component:Cainiao,
        name:'菜鸟吉祥物动画'
    },
    test:{
        component:test,
        name:'测试页面'
    }
}

// routesCellMarker
function cellMaker(name, meta = {}, path = "/", component = "") {
    return {
        path: path + name,
        name: name || cellStorage[component || name].name,
        component: cellStorage[component || name].component,
        meta: {
            ...meta,
            __origin__: {
                name,
                path,
                component,
                meta
            }
        }
    }
}



let routes = [
    cellMaker('', {}, '/', 'taskList'),
    cellMaker('taskList'),
    cellMaker('test'),
    cellMaker('Cainiao')
]


console.log(routes)




export default routes