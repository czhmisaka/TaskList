<template>
    <div>
        <el-card>
            <el-button v-for="(item) in buttonActionlist" v-bind:key="item.action" :type="item.type"
                @click="buttonAction(item)">
                {{item.name}}
            </el-button>
        </el-card>
        <el-card v-for="(item,index) in taskList" v-bind:key="item.id">
            <taskCard :detail='item' />
            {{item}}{{index}}
        </el-card>
        <commandTool ref='commandTool' @dealCode="dealCode" />
        <ADD ref="ADD" @addList="pushDataToTaskList" />
    </div>
</template>
<script>
    import taskCard from '@/components/task/taskCard.vue'
    import commandTool from '@/components/commandTool/commandTool.vue'
    import ADD from '@/components/buttonAction/ADD.vue'
    import {
        buttonActionlist,
    } from '@/config/taskAction.js'
    export default {
        name: 'taskList',
        components: {
            taskCard,
            commandTool,
            ADD,
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
                console.log(e.code)
                switch (e.code) {
                    case 'Escape':
                        that.$refs['commandTool'].change(false)
                        break;
                    case 'Enter':
                        that.$refs['commandTool'].change(true)
                        break;
                }
            }
        },
        mounted() {},
        methods: {
            // 处理指令
            dealCode(code) {
                console.log(code)
                let codeL = code.split(' ')
                try {
                    let codeL0 = codeL[0].toUpperCase()
                    switch (codeL0) {
                        case 'OPEN':
                            if (codeL[1]) this.buttonAction({
                                action: codeL[1]
                            })
                            break;
                        default:
                            if(!codeL[1]) throw new Error('唔。。。（摸不着头脑）')
                            if (!this.$refs[codeL[1].toUpperCase()]) throw new Error('没找到【' + codeL[1] + '】这条指令呢~');
                            this.$refs[codeL0].quick(codeL)
                            break;
                    }
                } catch (e) {
                    return this.$msg('TuTu：' + e.message)
                }
            },


            // 添加任务 -- ADD 组件触发
            pushDataToTaskList(data) {
                console.log(1)
                this.taskList.push(JSON.parse(JSON.stringify(data)))
            },

            // 按钮行为合集
            buttonAction(action) {
                this.$refs['commandTool'].change(false)
                if (action.needDoubleCheck) this.$confirm(`将执行${action.name}`, {
                    type: 'warning'
                }).then(function () {})
                else {
                    switch (action.action) {
                        case 'ADD':
                            this.$refs[action.action].open()
                            break;
                    }
                }
            }
        },
    }
</script>