<template>
    <div class="wordStyle" @mouseleave="changePopover(false)" @keydown="changePopover">
        <el-tag size="mini" style="margin-right:10px">
            {{detail.index}}
        </el-tag>
        <span v-if="status">
            <el-popover placement="top" trigger="manual" v-model="visible" popper-class="blackBg">
                <el-tag :type="status.type?status.type:'primary'" slot="reference" @click="changePopover(true)"
                    class="pointerMouse">
                    {{status.name}}
                </el-tag>
                <span :key="item.name+index+detail.index" v-for="(item,index) in detail.history">
                    <el-tag :type="item.type" style="margin:5px 10px">
                        {{item.name}}
                    </el-tag>
                    <span v-if="index!=detail.history.length-1">
                        >
                    </span>
                </span>
            </el-popover>
        </span>
        {{detail.context}}
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
                default: {},
            }
        },
        data() {
            return {
                visible: false,
                status: this.detail.history ? this.detail.history[this.detail.history.length - 1] : null
            }
        },
        watch: {},
        mounted() {},
        methods: {
            // 更新当前页面数据
            refresh() {
                console.log(JSON.parse(JSON.stringify(this.detail)))    
                if (this.detail.history) {
                    this.status = this.detail.history[this.detail.history.length - 1]
                }
            },

            // 显示/关闭气泡
            changePopover(e) {
                if (typeof e === 'object') {
                    switch (e.key) {
                        case 'Enter':
                            this.visible = true;
                            break;
                        default:
                            this.visible = false;
                            break;
                    }
                } else {
                    this.visible = e
                }
            }
        },
    }
</script>

<style scoped>
    .wordStyle {
        text-align: left;
    }

    .pointerMouse {
        cursor: pointer;
    }
</style>
<style>
    .blackBg {
        color: white;
        background: rgba(0, 0, 0, 0.6);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.9);
    }
</style>