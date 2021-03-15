import taskList from '@/views/taskList.vue'

const cellStorage = {
    taskList
}

function cellMaker(name, meta = {}, path = "/", component = "") {
    return {
        path: path + name,
        name: name,
        component: cellStorage[component||name],
        meta
    }
}



let routes = [
    cellMaker('',{},'/','taskList'),
    cellMaker('taskList'),
]






export default routes