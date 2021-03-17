<template>
    <div>
        <el-dialog title="删除任务" :visible.sync="isOpen">
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
    export default {
        name: 'RM',
        components: {},
        data() {
            return {
                isOpen: false,
            }
        },
        props: {
            taskList: {
                type: Array,
                default: []
            }
        },
        mounted() {
        },
        methods: {
            // 快捷调用 
            quick(list) {
                try {
                    if (this.taskList[list[1]]) {
                        this.taskList.splice(list[1], 1)
                        this.confirm()
                    }
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
            confirm() {
                this.$emit('setTaskList', this.taskList)
                if (this.isOpen) this.close()
            },
        },
    }
</script>