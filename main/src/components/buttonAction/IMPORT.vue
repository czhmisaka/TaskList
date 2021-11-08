<template>
    <div>
        <el-dialog title="导入任务列表" :visible.sync="isOpen" :fullscreen="true">
            <el-form @submit.native.prevent label-position="top">
                <el-form-item label="任务内容">
                    <el-input v-model="detail.context" @input="translate" @change="translate" type="textarea" autosize
                        autofocus placeholder="请输入任务内容" ref='code'>
                    </el-input>
                </el-form-item>
                <el-form-item label="任务列表">
                    <el-card v-for="(item,index) in detail.taskList" v-bind:key="item.id">
                        <taskCard :ref="'task'+index" :detail='{...item,index}' />
                    </el-card>
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

    // taskStatusTemplateMap 预处理
    for (let x in taskStatusTemplateMap) {
        taskStatusTemplateMap[taskStatusTemplateMap[x].name] = taskStatusTemplateMap[x]
    }

    import taskCard from '@/components/task/taskCard.vue'

    export default {
        name: 'IMPORT',
        components: {
            taskCard
        },
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
            confirm(e) {
                this.detail.taskList.forEach(x=>{
                    this.addList(x);
                })
                this.close()
            },

            addList(e){
                this.$emit('addList', e)
            },

            // 转换格式
            translate(e) {
                let list = this.detail.context.split('\n').filter(Boolean);
                let taskList = []
                list.forEach(x => {
                    let cell = {}
                    let conList = x.split("###");
                    let statusList = conList.length > 1 ? conList[1] : ''
                    cell['context'] = conList[0].split('.')[1];
                    cell['history'] = statusList.split('--').map(x => {
                        let name = x.split('【').length > 1 ? x.split('【')[0] : x;
                        if (!name) return null;
                        let time = x.split('【').length > 1 ? x.split('【')[1].split('】')[0] : new Date()
                            .getTime();
                        let back = {
                            name,
                            ...taskStatusTemplateMap[name],
                            gmtModified: new Date(time).getTime()
                        }
                        return back;
                    })
                    taskList.push(cell)
                })
                this.$set(this.detail, 'taskList', taskList)
            },
        },
    }
</script>