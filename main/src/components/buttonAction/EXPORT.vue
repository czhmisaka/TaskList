<template>
    <div>
        <el-dialog title="导出列表" :visible.sync="isOpen">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm">
                <el-form-item>
                    <el-button @click="confirm">

                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'EXPORT',
        components: {},
        data() {
            return {
                isOpen: false,
                detail: {}
            }
        },
        props: {
            taskList: {
                type: Object,
                default: []
            }
        },
        mounted() {

        },
        methods: {
            // 快捷调用 
            quick(list) {
                console.log(list)
            },

            // 打开弹窗
            async open() {
                this.detail = {
                    context: ''
                }
                this.isOpen = true
                await this.$nextTick()
                this.$refs.code.focus()
            },

            // 关闭弹窗
            close() {
                this.isOpen = false
            },

            // 行为确认
            confirm() {
                if (this.taskList.length < 1) return this.$msg('当前选择的任务列表为空','info')
            },
        },
    }
</script>