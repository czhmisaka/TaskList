<template>
    <div>
        <el-dialog title="新增任务" :visible.sync="isOpen">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm">
                <el-form-item label="任务内容">
                    <el-input v-model="detail.context" placeholder="请输入任务内容" ref='code'>
                    </el-input>
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
        name: 'ADD',
        components: {},
        data() {
            return {
                isOpen: false,
                detail: {}
            }
        },
        mounted() {

        },
        methods: {
            // 快捷调用 
            quick(list) {
                this.detail.context = list[1]
                this.confirm()
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
                this.detail['gmtCreate'] = new Date().getTime()
                this.detail['history'] = [{
                    ...taskStatusTemplateMap['init'],
                    gmtModified: new Date().getTime()
                }]
                this.$emit('addList', this.detail)
                if (this.isOpen) this.close()
            },
        },
    }
</script>