<template>
    <div>
        <el-dialog title="修改任务状态" :visible.sync="isOpen">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm" label-position="top">
                <el-form-item :label="`相关任务${taskList.length}个`">
                </el-form-item>
                <el-form-item>
                    <el-button @click="confirm">
                        确认
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {
        taskStatusTemplateMap
    } from '@/config/taskDetail.js'
    export default {
        name: 'AS',
        components: {},
        data() {
            return {
                isOpen: false,
                ids: []
            }
        },
        props: {
            taskList: {
                type: Array,
                default: []
            }
        },
        mounted() {
            // console.log(taskStatusTemplateMap)
        },
        methods: {
            // 快捷调用 
            quick(list) {
                try {
                    if (!this.taskList[list[1]].history)
                        this.taskList[list[1]]["history"] = []
                    let status = taskStatusTemplateMap[list[2]]
                    if (!status) throw new Error('没找到对应状态！【' + list[2] + '】')
                    status.gmtModified = new Date
                    this.ids = [list[1]]
                    this.taskList[list[1]].history.push(status)
                    this.$msg('任务' + list[1] + ' 已修改为' + status.name,status.type)
                    this.confirm()
                } catch (e) {
                    return this.$msg('TuTu：' + e.message)
                }
            },

            // 打开弹窗
            async open() {
                this.isOpen = true
                await this.$nextTick()
                this.$refs.code.focus()
            },

            // 关闭弹窗
            close() {
                this.$refs.code.blur()
                this.isOpen = false
            },

            // 行为确认
            async confirm() {
                if (!this.taskList.length) {
                    this.$msg('未选择任务', 'info')
                    return this.close()
                }
                this.$emit('setTaskList', this.taskList)
                await this.$nextTick()
                this.$emit('reFreshTaskByIds', this.ids)
                if (this.isOpen) this.close()
            },
        },
    }
</script>