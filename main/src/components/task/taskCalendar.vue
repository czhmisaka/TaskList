<!--
 * @Author: czh
 * @Date: 2021-11-08 15:11:18
-->
<template>
    <span>
        <el-card>
            <el-calendar v-model="currentDate">
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template :slot="dateCell" slot-scope="{date, data}">
                    <p :class="data.isSelected ? 'is-selected' : ''">
                        {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                    </p>
                    <p>
                        {{ date }}
                    </p>
                </template>
            </el-calendar>
        </el-card>
    </span>
</template>
<script>
    export default {
        data: () => {
            return {
                currentDate:[]
            }
        }
    }
</script>
<style scoped>
</style>