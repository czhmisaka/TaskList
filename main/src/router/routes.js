import taskList from '@/views/taskList.vue'

const cellStorage = {
    taskList
}

function cellMaker(name, meta = {}, path = "/") {
    return {
        path: path + name,
        name: name,
        component: cellStorage[name],
        meta
    }
}



let routes = [
    cellMaker('taskList'),
]






export default routes