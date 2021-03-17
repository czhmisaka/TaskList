<template>
    <div class="wordStyle">
        <el-tag>
            {{detail.index}}
        </el-tag>
        {{detail.context}}
        <span :key="item.name+index+detail.index" v-for="(item,index) in detail.history">
            {{' - '+item.name}}
        </span>
        <!-- <el-tag size="mini" :type="detail.status.type||'primary'">{{detail.status.name}}</el-tag> -->
    </div>
</template>
<script>
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