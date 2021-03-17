<template>
    <div>
        <el-dialog title="导出列表" :visible.sync="isOpen">
            <el-form @submit.native.prevent @keyup.native.enter.stop="confirm">
                <el-form-item>
                    <el-button @click="confirm">

                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    function downloadTemplateExcel() {
        var link = document.createElement("a");
        link.href =
            'https://cngpp-oc.oss-cn-hangzhou.aliyuncs.com/ed65a0b6-a974-4527-a088-46beaf277c2d_%E7%82%B9%E4%BD%8D%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF-%E6%96%B0%E6%B5%81%E7%A8%8B.xlsx?Expires=4769484067&OSSAccessKeyId=LTAI4G3JdBaw7oCpBcd97cQt&Signature=4ealxu%2Bskmk2SVVUVJfE6szOwVo%3D';
        link.style = "visibility:hidden";
        // link.download = "importPositionTemplate.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    export default {
        name: 'EXPORT',
        components: {},
        data() {
            return {
                isOpen: false,
                detail: {}
            }
        },
        props: {
            taskList: {
                type: Object,
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
                if (this.taskList.length < 1) return this.$msg('当前选择的任务列表为空', 'info')
            },
        },
    }
</script>