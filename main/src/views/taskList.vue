<template>
  <div class="mainBox">
    <el-card style="margin-bottom: 10px">
      <el-button
        :style="'margin:5px;' + ($isMobile() ? 'float:left' : '')"
        v-for="item in buttonActionlist"
        v-bind:key="item.action"
        :type="item.type"
        @click="buttonAction(item)"
        :icon="item.icon"
      >
        {{ item.name }}
      </el-button>
    </el-card>
    <el-card v-for="(item, index) in taskList" v-bind:key="item.id">
      <taskCard
        :href="'task-' + index"
        :ref="'task' + index"
        :detail="{ ...item, index }"
      />
    </el-card>
    <commandTool ref="commandTool" @dealCode="dealCode" v-show="!$isMobile()" />
    <ADD ref="ADD" @addList="pushDataToTaskList" />
    <RM ref="RM" :taskList="taskList" @setTaskList="setTaskList" />
    <AS
      ref="AS"
      :taskList="taskList"
      @setTaskList="setTaskList"
      @reFreshTaskByIds="reFreshTaskByIds"
    />
    <EXPORT ref="EXPORT" :taskList="taskList" />
    <IMPORT
      ref="IMPORT"
      :taskList="taskList"
      @setTaskList="setTaskList"
      @addList="pushDataToTaskList"
    />
    <ANALYSIS ref="ANALYSIS" :taskList="taskList" @setTaskList="setTaskList" />
  </div>
</template>
<script>
import taskCard from "@/components/task/taskCard.vue";
import commandTool from "@/components/commandTool/commandTool.vue";
import ADD from "@/components/buttonAction/ADD.vue";
import RM from "@/components/buttonAction/RM.vue";
import AS from "@/components/buttonAction/AS.vue";
import EXPORT from "@/components/buttonAction/EXPORT.vue";
import IMPORT from "@/components/buttonAction/IMPORT.vue";
import ANALYSIS from "@/components/buttonAction/ANALYSIS.vue";
import { buttonActionlist } from "@/config/taskAction.js";
export default {
  name: "taskList",
  components: {
    taskCard,
    commandTool,
    ADD,
    RM,
    AS,
    EXPORT,
    IMPORT,
    ANALYSIS,
  },
  data() {
    return {
      taskList: [],
      buttonActionlist,
    };
  },
  created() {
    // 绑定初始界面操作事件
    // 目前操作简介： 空格键进入/打开，esc键退出当前操作
    let that = this;
    document.onkeydown = function (e) {
      console.log(e);
      if (e.target.localName != "body") return;
      switch (e.code) {
        case "Escape":
          that.$refs["commandTool"].change(false);
          break;
        case "Space":
          that.$refs["commandTool"].change(true);
          break;
      }
    };
    if (this.$isMobile()) {
      // 触控开始
      document.ontouchstart = function (e) {};
      // 移动
      document.ontouchmove = function (e) {};
      // 结束
      document.ontouchend = function (e) {};
    }
  },
  async mounted() {
    await this.getTaskListFromLocalStorage();
  },
  methods: {
    // 处理指令
    dealCode(code) {
      let codeL = code.replace(/(^\s*)|(\s*$)/g, "").split(" ");
      try {
        let codeL0 = codeL[0].toUpperCase();
        switch (codeL0) {
          case "TO":
            let toId = this.taskList.length - 1;
            if (codeL[1]) {
              toId = codeL[1];
            }
            let targetTask = this.$refs["task" + toId];
            break;
          case "OPEN":
            if (codeL[1])
              this.buttonAction({
                action: codeL[1].toUpperCase(),
              });
            break;
          default:
            if (!codeL[1]) throw new Error("唔。。。（摸不着头脑）");
            if (!this.$refs[codeL0])
              throw new Error("没找到【" + codeL[0] + "】这条指令呢~");
            this.$refs[codeL0].quick(codeL);
            break;
        }
      } catch (e) {
        return this.$msg(e.message);
      }
    },

    // 设置任务列表 -- 通用化tasklist操作
    setTaskList(taskList) {
      this.taskList = JSON.parse(JSON.stringify(taskList));
      this.saveTaskListToLocalStorage();
    },

    // 添加任务 -- ADD 组件触发
    async pushDataToTaskList(data) {
      this.$msg("任务" + this.taskList.length + "已创建", "success");
      this.taskList.push(JSON.parse(JSON.stringify(data)));
      this.saveTaskListToLocalStorage();
    },

    // 刷新组件
    reFreshTaskByIds(ids) {
      ids.forEach((x) => {
        this.$refs["task" + x][0].refresh();
      });
    },

    // 按钮行为合集
    buttonAction(action) {
      this.$refs["commandTool"].change(false);
      if (action.needDoubleCheck)
        this.$confirm(`将执行${action.name}`, {
          type: "warning",
        }).then(function () {});
      else {
        switch (action.action) {
          default:
            if (this.$refs[action.action]) {
              this.$refs[action.action].open();
            } else {
              this.$msg(`还没开发这个功能【${action.action}】`, "info");
            }
            break;
        }
      }
    },

    // 从本地存储获取任务列表
    async getTaskListFromLocalStorage() {
      this.taskList = JSON.parse(await localStorage.getItem("taskList")) || [];
    },

    // 保存任务列表到本地存储JSON.parse()
    async saveTaskListToLocalStorage() {
      await localStorage.setItem("taskList", JSON.stringify(this.taskList));
    },
  },
};
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
