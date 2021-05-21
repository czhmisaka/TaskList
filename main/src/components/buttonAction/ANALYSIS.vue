<template>
    <div>
        <el-dialog title="导出点位" :visible.sync="isOpen" :fullscreen="true">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm" label-position="top">
                <el-form-item :label="`相关任务${taskLists.length}`" style="overflow-y:auto">
                    <div v-for="(item,index) in taskLists" :key="item.context+index" style="width:100%;text-align:left">
                        {{`${index}. ${item.context} `}}
                        {{"###"}}
                        <span v-for="(it,ind) in item.history" :key="it.name+ind">
                            {{` --${it.name}【${it.gmtModified_localTime}】`}}
                        </span>
                    </div>
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

    export default {
        name: 'Analysis',
        components: {},
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
                if (this.taskList) {
                    this.taskLists = this.taskList.map(x => {
                        x.history.forEach((it) => {
                            it['gmtModified_localTime'] = new Date(it.gmtModified).toLocaleString()
                        })
                        return x
                    })
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
                alert('1')
                this.close()
            },
        },
    }
</script>