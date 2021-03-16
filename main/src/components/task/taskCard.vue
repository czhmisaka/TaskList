<template>
    <div class="wordStyle">
        <el-tag>
            {{detail.index}}
        </el-tag>
        {{detail.context}}
        <span v-for="(item) in detail.history" :key="item.time">
            {{" -"+item.name}}
        </span>
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