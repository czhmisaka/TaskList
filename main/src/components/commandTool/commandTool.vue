<template>
    <div :style="isOpen?'':'transform:translateX(410px);opactiy:0'" class="commandTool" @click="change(true)">
        <div class="codeHistoryBox">
            <div class="codeHistory" :style="history.length?'border: 4px rgba(0, 0, 0, 0.05) solid;':''">
                <div v-for="(item,index) in history" v-bind:key="index+':'+item" @dblclick="code=item">
                    {{`${index} $: ${item}`}}
                </div>
            </div>
        </div>
        <el-input ref='code' v-model="code" @change="sureSelect" @keyup.native.stop="check" placeholder="请输入指令"
            class="codeInput" :style="isOpen?'':'margin-left:-50px'">
            <template slot="prepend" v-if="!isOpen">
                <i class="el-icon-caret-left"></i>
            </template>
        </el-input>
    </div>
</template>
<script>
    import {
        buttonActionlist,
        commandList
    } from '@/config/taskAction.js'
    let EnterNum = 0
    export default {
        name: 'commandTool.vue',
        components: {

        },
        data() {
            return {
                isLoading: false,
                isOpen: false,
                history: [],
                code: '',
            }
        },
        mounted() {

        },
        methods: {
            // 打开
            async change(e) {
                if (e) {
                    this.isOpen = e
                    await this.$nextTick()
                    this.$refs.code.focus()
                    this.code = '';
                } else {
                    this.$refs.code.blur()
                    this.isOpen = e
                }
            },

            // 确认选择 
            sureSelect(e) {

            },

            // 搜索指令补全(还没做) or 其他处理 
            check(e) {
                switch (e.code) {
                    case 'Escape':
                        this.change(false)
                        break;
                    case 'Enter':
                        EnterNum++
                        if (EnterNum >= 1 && this.code) this.applyTheCode()
                        break;
                }
                if (e.code != 'Enter')
                    EnterNum = 0
            },

            // 应用指令
            applyTheCode() {
                EnterNum = 0
                let code = this.code.toUpperCase()
                switch (code) {
                    case 'CLS':
                    case 'CLEAR':
                        this.history = []
                        this.code = ''
                        break;
                    case 'HELP':
                        for (let x in commandList) {
                            commandList[x].value.forEach(item => {
                                this.history.push(x + item)
                            })
                        }
                        break;
                    default:
                        this.history.push(this.code)
                        this.$emit('dealCode', this.code)
                }
                this.code = ''
            },
        },
    }
</script>
<style scoped>
    .commandTool {
        width: 400px;
        position: fixed;
        bottom: 0px;
        right: 0px;
        margin: 30px;
        opacity: 1;
        transition: all 0.4s;
    }

    .codeHistoryBox {
        padding-bottom: 50px;
    }

    .codeHistory {
        max-height: 30vh;
        width: calc(100% - 40px);
        margin: 0px 10px;
        height: auto;
        display: inline-block;
        overflow-y: auto;
        overflow-x: hidden;
        background: rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        transform: translateY(50px);
    }

    .codeHistory::-webkit-scrollbar {
        width: 4px;
        height: 1px;
    }

    .codeHistory::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        width: 1px;
        border-radius: 2px;
        background: #535353;
    }

    .codeHistory::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
    }

    .codeHistory>div {
        padding-left: 0.6em;
        text-align: left;
        /* white-space: nowrap; */
        text-overflow: ellipsis;
        font-size: 0.6em;
        margin: 2px 5px;
        cursor: pointer;
        user-select: none;
    }

    .codeInput>>>.el-input__inner {
        text-indent: 10px;
        color: white;
        background: rgba(0, 0, 0, 0.5);
    }
</style>