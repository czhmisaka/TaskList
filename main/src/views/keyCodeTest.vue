<template>
    <div class="mainBox">
    {{code}}
    </div>
</template>
<script>
    export default {
        name: 'taskList',
        components: {},
        data() {
            return {
                code: ''
            }
        },
        created() {
            // 绑定初始界面操作事件
            // 目前操作简介： 空格键进入/打开，esc键退出当前操作
            let that = this
            document.onkeydown = function (e) {
                that.code = e.code
                console.log(e)
            }
        },
        async mounted() {
        },
        methods: {},
    }
</script>
<style scoped>
    .demo {
        display: flex;
        justify-content: space-around;
    }

    .mainBox {
        max-width: 1080px;
        margin: 0px auto;
    }
</style>