<!--
 * @Author: czh
 * @Date: 2021-04-22 19:20:11
-->
<template>
  <div id="app">
    <el-container class="wholeScreen">
      <el-aside style="height:100vh;" v-if="!$isMobile()">
        <Menu type='left' style="height:100vh;" />
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import menu from '@/components/menu/menu.vue'
  export default {
    components: {
      Menu: menu
    },
    data() {
      return {
        leftMenu_isOpen: false,
      }
    },
    mounted() {},
  }
</script>

<style>
  * {
    margin: 0px;
    padding: 0px;
  }
</style>
<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0px;
    padding: 0px;
  }


  .wholeScreen {
    width: 100%;
    overflow-y: auto;
    height: 100vh;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }


  *::-webkit-scrollbar {

    width: 5px;
    height: 1px;
    background-color: #F5F5F5;
  }

  *::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: #dbeaff;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #0F4999;
    box-shadow: 0px 0px 10px #0F4999;
  }
</style>