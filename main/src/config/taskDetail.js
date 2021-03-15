const taskDetailKeyMapTemplate = {
    context: {
        name: '任务内容',
        type: 'String'
    },
    gmtCreate: {
        name: '创建时间',
        type: 'Number'
    },
    status: {
        name: '当前状态',
        type: 'Number'
    },
    history: {
        name: '历史',
        type: 'Object', // 目前是打算用list，还没定
    }
}

const taskDetail = {}

export {
    taskDetail
}