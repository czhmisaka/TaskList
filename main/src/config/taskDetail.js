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
        temeplate: [{
            status: 'String',
            gmtModified: 'Number'
        }]
    },
}

// 保存所有任务列表
let taskStatusTemplateMap = {
    'init': {
        name: '初始化',
        status: 'init',
        gmtModified: 0,
        code: -1,
        type: 'info'
    },
    'workIn': {
        name: '进行中',
        status: 'workIn',
        gmtModified: 0,
        code: 10,
        type: 'primary'
    },
    'suspend': {
        name: '挂起',
        status: 'suspend',
        gmtModified: 0,
        code: 20,
        type: 'info'
    },
    'wa': {
        name: '等待接口',
        status: 'wait Api',
        gmtModified: 0,
        code: 30,
        type: 'warning'
    },
    'wA': {
        name: '等待后端开发',
        status: 'wait Api',
        gmtModified: 0,
        code: 30,
        type: 'warning'
    },
    'wt': {
        name: '等待测试',
        status: 'wait test',
        gmtModified: 0,
        code: 31,
        type: 'warning'
    },
    'finish': {
        name: '完成',
        status: 'finish',
        gmtModified: 0,
        code: 100,
        type: 'success'
    },
    'fail':{
        name: '开发失败',
        status: 'error',
        gmtModified: 0,
        code: 41,
        type: 'danger'
    },
    'error': {
        name: '遇到困难',
        status: 'error',
        gmtModified: 0,
        code: 40,
        type: 'danger'
    },
}

for (let x in taskStatusTemplateMap) {
    taskStatusTemplateMap[x]['backup'] = ''
    taskStatusTemplateMap[x]['other'] = {}
}

export {
    taskStatusTemplateMap,
    taskDetailKeyMapTemplate,
}