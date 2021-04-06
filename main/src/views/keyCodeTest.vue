<template>
    <div class="mainBox">
        <p v-for="(item, index) in codeList" :key="item.code+index">
            {{item.code}}
        </p>
    </div>
</template>
<script>
    export default {
        name: 'taskList',
        components: {},
        data() {
            return {
                codeList: []
            }
        },
        created() {
            // 绑定初始界面操作事件
            // 目前操作简介： 空格键进入/打开，esc键退出当前操作
            let that = this
            document.onkeydown = function (e) {
                that.codeList.push(e)
                console.log(e)
            }
        },
        async mounted() {},
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