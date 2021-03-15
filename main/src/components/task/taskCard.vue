<template>
    <el-card>
        {{detail.index+detail.context}}
    </el-card>
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