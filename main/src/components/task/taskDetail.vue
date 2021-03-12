<template>
    <div>
        <el-card v-for="(item) in taskList" v-bind:key="item.id">
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'taskDetail',
        components: {

        },
        data() {
            return {
                taskList:[]
            }
        },
        mounted() {

        },
        methods: {

        },
    }
</script>