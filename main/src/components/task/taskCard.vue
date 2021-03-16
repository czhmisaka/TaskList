<template>
    <div class="wordStyle">
        <el-tag>
            {{detail.index}}
        </el-tag>
        {{detail.context}}
        <span :key="item" v-for="(item) in detail.history">
            {{' - '+item.name}}
        </span>
        <!-- <el-tag size="mini" :type="detail.status.type||'primary'">{{detail.status.name}}</el-tag> -->
    </div>
</template>
<script>
    import {
        taskStatusTemplateMap
    } from '@/config/taskDetail.js'
    console.log(taskStatusTemplateMap)
    export default {
        name: 'taskCard',
        components: {

        },
        props: {
            detail: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                taskList: []
            }
        },
        mounted() {
            // if (!this.detail.status) {
            //     this.detail.status = {}
            // }
            // this.detail.status = taskStatusTemplateMap[this.detail.history[this.detail.history.length - 1].name] || {}
        },
        methods: {

        },
    }
</script>

<style scoped>
    .wordStyle {
        text-align: left;
    }
</style>