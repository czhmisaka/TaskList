<template>
    <div>
        <el-card style='margin-bottom:10px'>
            <el-button v-for="(item) in buttonActionlist" v-bind:key="item.action" :type="item.type"
                @click="buttonAction(item)">
                {{item.name}}
            </el-button>
        </el-card>
        <el-card v-for="(item,index) in taskList" v-bind:key="item.id">
            <taskCard :ref="'task'+index" :detail='{...item,index}' />
        </el-card>

        <commandTool ref='commandTool' @dealCode="dealCode" />
        <ADD ref="ADD" @addList="pushDataToTaskList" />
        <RM ref="RM" :taskList="taskList" @setTaskList='setTaskList' />
        <AS ref="AS" :taskList="taskList" @setTaskList='setTaskList' @reFreshTaskByIds="reFreshTaskByIds" />
        <EXPORT ref="as" :taskList="taskList" />
    </div>
</template>
<script>
    import taskCard from '@/components/task/taskCard.vue'
    import commandTool from '@/components/commandTool/commandTool.vue'
    import ADD from '@/components/buttonAction/ADD.vue'
    import RM from '@/components/buttonAction/RM.vue'
    import AS from '@/components/buttonAction/AS.vue'
    import EXPORT from '@/components/buttonAction/EXPORT.vue'
    import {
        buttonActionlist,
    } from '@/config/taskAction.js'
    export default {
        name: 'taskList',
        components: {
            taskCard,
            commandTool,
            ADD,
            RM,
            AS,
            EXPORT
        },
        data() {
            return {
                taskList: [],
                buttonActionlist
            }
        },
        created() {

            let that = this
            document.onkeydown = function (e) {
                if (e.path.length > 6) return;
                switch (e.code) {
                    case 'Escape':
                        that.$refs['commandTool'].change(false)
                        break;
                    case 'Space':
                        that.$refs['commandTool'].change(true)
                        break;
                }
            }
        },
        async mounted() {
            await this.getTaskListFromLocalStorage()
        },
        methods: {
            // 处理指令
            dealCode(code) {
                let codeL = code.replace(/(^\s*)|(\s*$)/g, "").split(' ')
                try {
                    let codeL0 = codeL[0].toUpperCase()
                    switch (codeL0) {
                        case 'OPEN':
                            if (codeL[1]) this.buttonAction({
                                action: codeL[1].toUpperCase()
                            })
                            break;
                        default:
                            if (!codeL[1]) throw new Error('唔。。。（摸不着头脑）')
                            if (!this.$refs[codeL0]) throw new Error('没找到【' + codeL[0] + '】这条指令呢~');
                            this.$refs[codeL0].quick(codeL)
                            break;
                    }
                } catch (e) {
                    return this.$msg('TuTu：' + e.message)
                }
            },
            // 设置任务列表 -- 通用化tasklist操作
            setTaskList(taskList) {
                this.taskList = JSON.parse(JSON.stringify(taskList))
                this.saveTaskListToLocalStorage()
            },

            // 添加任务 -- ADD 组件触发
            pushDataToTaskList(data) {
                this.taskList.push(JSON.parse(JSON.stringify(data)))
                this.saveTaskListToLocalStorage()
            },

            // 刷新组件
            reFreshTaskByIds(ids) {
                ids.forEach(x => {
                    this.$refs['task' + x][0].refresh()
                })
            },

            // 按钮行为合集
            buttonAction(action) {
                this.$refs['commandTool'].change(false)
                if (action.needDoubleCheck) this.$confirm(`将执行${action.name}`, {
                    type: 'warning'
                }).then(function () {})
                else {
                    switch (action.action) {
                        default:
                            if (this.$refs[action.action]) {
                                this.$refs[action.action].open()
                            } else {
                                this.$msg(`还没开发这个功能【${action.action}】`, 'info')
                            }
                            break;
                    }
                }
            },

            // 从本地存储获取任务列表
            async getTaskListFromLocalStorage() {
                this.taskList = JSON.parse(await localStorage.getItem('taskList')) || []
            },

            // 保存任务列表到本地存储JSON.parse()
            async saveTaskListToLocalStorage() {
                await localStorage.setItem('taskList', JSON.stringify(this.taskList))
            },
        },
    }
</script>
<style scoped>
    .demo {
        display: flex;
        justify-content: space-around;
    }
</style>