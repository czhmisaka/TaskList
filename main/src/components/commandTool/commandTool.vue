<template>
  <div
    :style="isOpen ? '' : 'transform:translateX(410px);opactiy:0'"
    class="commandTool"
    ref="prevent"
  >
    <div class="codeHistoryBox">
      <div
        class="codeHistory"
        :style="history.length ? 'border: 4px rgba(0, 0, 0, 0.05) solid;' : ''"
      >
        <div
          v-for="(item, index) in history"
          v-bind:key="index + ':' + item"
          @dblclick="setCode(item)"
          :class="index == key ? '' : ''"
        >
          {{ `$: ${item}` }}
        </div>
      </div>
    </div>
    <el-input
      ref="code"
      v-model="code"
      @change="sureSelect"
      @keyup.native.stop="check"
      placeholder="请输入指令"
      class="codeInput"
      :style="isOpen ? '' : 'margin-left:-50px'"
    >
      <template slot="prepend" v-if="!isOpen">
        <i class="el-icon-caret-left"></i>
      </template>
    </el-input>
  </div>
</template>
<script>
import { buttonActionlist, commandList } from "@/config/taskAction.js";
let EnterNum = 0;
export default {
  name: "commandTool.vue",
  components: {},
  data() {
    return {
      isLoading: false,
      isOpen: false,
      history: [],
      code: "",
      key: -1,
    };
  },
  mounted() {},
  methods: {
    // 打开
    async change(e) {
      if (e) {
        this.isOpen = e;
        await this.$nextTick();
        this.$refs.code.focus();
        this.code = "";
      } else {
        this.$refs.code.blur();
        this.isOpen = e;
      }
    },

    // 确认选择
    sureSelect(e) {},

    // 设置指令输入
    setCode(code) {
      code = code.replace(/-- .*? --/g, "");
      this.code = code;
    },

    // 阻止冒泡
    preventEvent(e) {},

    // 搜索指令补全(还没做) or 其他处理
    check(e) {
      switch (e.code) {
        case "Backquote":
          this.setCode("talk ");
          break;
        case "ArrowUp":
          if (this.history.length != 0) {
            this.key = this.history.length > this.key + 1 ? this.key + 1 : this.key;
            this.setCode(this.history[this.key]);
          }
          break;
        case "ArrowDown":
          if (this.history.length != 0) {
            this.key = this.key >= 0 ? this.key - 1 : this.key;
            this.setCode(this.key === -1 ? "" : this.history[this.key]);
          }
          break;
        case "Space":
          break;
        case "Escape":
          this.change(false);
          break;
        case "Enter":
          EnterNum++;
          if (EnterNum >= 1 && this.code) this.applyTheCode();
          break;
      }
      if (e.code != "Enter") {
        EnterNum = 0;
      }
    },

    // 应用指令
    async applyTheCode() {
      EnterNum = 0;
      let code = this.code.replace(/(^\s*)|(\s*$)/g, "").toUpperCase();
      let codeL = code.split(" ");
      switch (codeL[0]) {
        case "CLS":
        case "CLEAR":
          this.history = [];
          this.code = "";
          break;
        case "TALK":
          let res = await this.$get("/api/bot/" + codeL[1]);
          this.$msg(res.data, "info");
          this.history.unshift(this.code + " -- Tutu: " + res.data);
          break;
        case "HELP":
          let list = commandList;
          if (commandList[codeL[1]] || codeL[1]) {
            let upCode1 = codeL[1];
            if (commandList[upCode1]) {
              list[upCode1] = commandList[upCode1];
            } else {
              this.code = "";
              return this.$msg("没找到【" + upCode1 + "】组件", "info");
            }
          }
          for (let x in list) {
            list[x].value.forEach((item) => {
              this.history.unshift(x + item);
            });
          }
          break;
        default:
          this.history.unshift(this.code);
          this.$emit("dealCode", this.code);
      }
      this.code = "";
    },
  },
};
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

.codeHistory > div {
  padding-left: 0.6em;
  text-align: left;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  font-size: 0.6em;
  margin: 2px 5px;
  cursor: pointer;
  user-select: none;
}

.codeInput >>> .el-input__inner {
  text-indent: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
}
</style>
