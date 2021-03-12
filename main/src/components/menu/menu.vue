<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse">
        <el-menu-item v-for="(item) in menuTemplate" v-bind:key="item.key" :index="item.key">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import {
        menuTemplate
    } from '@/config/menu.js'
    export default {
        name: 'Menu',
        data() {
            return {
                isCollapse: false,
                 menuTemplate
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>