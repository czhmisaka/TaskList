<template>
    <div style="overflow:hidden">
        <el-card style="height:70vh;overflow-y:auto;">
            <span v-for="(item,index) in talkList" :key="index">
                <div style="width:100%;display:inline-block;height:auto;padding:10px;">
                    <span v-if="item.type=='tutu'" style="float:left;margin-left:-20px;">
                        <el-tag :v-loading="item.isLoading" type="info"> TuTu:</el-tag>
                        <el-tag :v-loading="item.isLoading">
                            {{item.word}}
                        </el-tag>
                    </span>
                    <el-tag v-else style="float:right">
                        {{item.word}}
                    </el-tag>
                </div>
            </span>
        </el-card>
        <el-card style="height:20vh">
            <el-input v-model="word" @keydown.enter.native="talk(word)"></el-input>
            <el-button @click="talk(word)">发送</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'TalkBox',
        data() {
            return {
                talkList: [],
                word: '',
            }
        },
        created() {

        },
        mounted() {
            this.getTalkList()
        },
        methods: {
            // 保存对话列表
            setTalkList() {
                localStorage.setItem('talkList', JSON.stringify(this.talkList))
            },

            // 获得对话列表
            getTalkList() {
                this.talkList = JSON.parse(localStorage.getItem('talkList'))||[]
            },

            // 获取tutu回复
            async talk() {
                if (!this.word) return;
                let cell_user = {
                    index: this.talkList.length,
                    word: this.word
                }
                this.talkList.push(cell_user)
                let cell = {
                    index: this.talkList.length,
                    type: 'tutu',
                    isLoading: true,
                    word: ''
                }
                this.talkList.push(cell)
                let res = await this.$get('/api/bot/' + this.word);
                this.word = ''
                this.talkList.forEach(x => {
                    if (cell.index == x.index) {
                        x.word = res.data,
                            x.isLoading = false
                    }
                })
                this.setTalkList()
            }
        },
    }
</script>

<style scoped>

</style>