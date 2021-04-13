<template>
    <div>
        <el-dialog title="导入任务列表" :visible.sync="isOpen">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm">
                <el-form-item label="任务内容">
                    <el-input v-model="detail.context" type="textarea" placeholder="请输入任务内容" ref='code'>
                    </el-input>
                </el-form-item>
                <el-form-item label="任务列表">
                    <p v-for="item in detail.taskList" :key="item">
                        {{item}} </p>
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
        name: 'IMPORT',
        components: {},
        data() {
            return {
                isOpen: false,
                detail: {
                    context: '',
                    taskList: []
                }
            }
        },
        mounted() {},
        methods: {
            // 快捷调用 
            quick(list) {
                this.$msg('导出功能目前还不支持快捷调用');
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
                if (!this.detail.context) return this.$msg('请输入任务内容')
                this.detail.taskList = this.detail.context.split('\n').filter(Boolean);
                console.log(this.detail.context.split('\n'))
                // if (this.isOpen) this.close()
            },
        },
    }
</script>