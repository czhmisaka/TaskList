<!--
 * @Author: czh
 * @Date: 2021-05-18 11:48:42
-->
<template>
    <div>
        <el-dialog title="分析" :visible.sync="isOpen" :fullscreen="true">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm" label-position="top">
                <el-form-item>
                    <taskCalendar :taskList="taskList" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="confirm" type="primary">
                        确认
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import taskCalendar from '@/components/task/taskCalendar.vue'
    export default {
        name: 'Analysis',
        components: {
            taskCalendar
        },
        data() {
            return {
                isOpen: false,
                taskLists: []
            }
        },
        props: {
            taskList: {
                type: Array,
                default: []
            },
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
                if (this.taskList) {

                }
                this.isOpen = true
                await this.$nextTick()
            },

            // 关闭弹窗
            close() {
                this.isOpen = false
            },

            // 行为确认
            confirm() {
                if (this.taskLists.length < 1) return this.$msg('当前选择的任务列表为空', 'info');
                this.close()
            },


            // 获取上一周的工作时常
            // workIn 状态保持的时间
            getWorkInTime() {}
        },
    }
</script>