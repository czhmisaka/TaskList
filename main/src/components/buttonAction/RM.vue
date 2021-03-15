<template>
    <div>
        <el-dialog title="删除" :visible.sync="isOpen">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm">
                <el-form-item :label="`相关任务${taskList.length}`">
                    <div v-for="(item,index) in taskList" v-bind:key="index">
                        {{item.index+' - '+item.context}}
                    </div>
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
                type: Object,
                default: []
            }
        },
        mounted() {

        },
        methods: {
            // 快捷调用 
            quick(list) {
                this.confirm()
            },

            // 打开弹窗
            async open() {
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
                if (!this.taskList.length) this.$msg('为选择任务', 'info')
                this.$emit('delTaskList', this.taskList)
                if (this.isOpen) this.close()
            },
        },
    }
</script>