import taskList from '@/views/taskList.vue'

// 组件单元库
const cellStorage = {
    taskList: {
        component: taskList,
        name: '任务列表'
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
]


console.log(routes)




export default routes