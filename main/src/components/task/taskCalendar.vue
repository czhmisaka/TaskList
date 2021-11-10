<!--
 * @Author: czh
 * @Date: 2021-11-08 15:11:18
-->
<template>
    <span>
        <el-card>
            <el-calendar>
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template v-slot:dateCell>
                    <p :class="data.isSelected ? 'is-selected' : ''">
                        {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                    </p>
                </template>
            </el-calendar>
        </el-card>
    </span>
</template>

<script>

</script>

<style scoped>

</style>