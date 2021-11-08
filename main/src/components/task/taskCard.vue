<template>
    <div class="wordStyle" @mouseleave="changePopover(false)" @keydown.prevent.space="changePopover(true)"
        @keydown.tab="changePopover(false)" @keyup="changePopover(false)">
        <el-tag size="mini" style="margin-right:10px">
            {{detail.index}}
        </el-tag>
        <span v-if="status">
            <el-popover placement="top" trigger="manual" v-model="visible" popper-class="blackBg">
                <el-tag ref="focusTag" :type="status.type?status.type:'primary'" slot="reference"
                    @keydown.native.esc.prevent="changeFocus(false)" @click="changePopover(true)" class="pointerMouse"
                    @focus="changePopover(true)" @blur="changePopover(false)">
                    {{status.name}}
                </el-tag>
                <span :key="(item!=null?item.name:'asd')+index+detail.index" v-for="(item,index) in detail.history">
                    <span v-if="item!=null">
                        <el-tag :type="item.type" style="margin:5px 10px">
                            {{item.name}}-{{timeFormat(item.gmtModified)}}
                        </el-tag>
                        <span v-if="index!=detail.history.length-1">
                            >
                        </span>
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
                default: () => {
                    return {}
                },
            }
        },
        data() {
            return {
                TRUE: true,
                visible: false,
                status: this.detail.history ? this.detail.history[this.detail.history.length - 1] : null
            }
        },
        watch: {},
        mounted() {
            this.detail.history.filter(Boolean)
        },
        methods: {
            // 返回时间
            timeFormat(e) {
                return new Date(e).toLocaleString()
            },
            // 控制元素焦点
            changeFocus(e) {
                if (e) {
                    if (this.$refs['focusTag'])
                        this.$refs['focusTag'].focus()
                } else {
                    if (this.$refs['focusTag'])
                        this.$refs['focusTag'].blur()
                }
            },

            // 更新当前页面数据
            refresh() {
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