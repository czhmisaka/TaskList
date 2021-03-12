const actionToIcon = {
    ADD: 'el-icon-plus',
    RM: 'el-icon-delete',
    DOWN: 'el-icon-download',
    UP: 'el-icon-upload2',
    AS: 'el-icon-paperclip',
    FUCK: 'el-icon-finished'
}

function buttonActionMaker(name, nameEn, needDoubleCheck = false, type = 'primary') {
    return {
        name,
        action: nameEn,
        icon: actionToIcon[nameEn],
        isDisable: false,
        type,
        needDoubleCheck
    }
}


const buttonActionlist = [
    buttonActionMaker('添加', 'ADD'),
    buttonActionMaker('删除', 'RM', true, 'danger'),
    buttonActionMaker('向下移动', 'DOWN'),
    buttonActionMaker('向上移动', 'UP'),
    buttonActionMaker('添加状态', 'AS'),
    buttonActionMaker('完成', 'FUCK', true, 'success')
]





export {
    buttonActionlist
}