<template>
    
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/plane_search' }">航班查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/plane_list' }">查询结果</el-breadcrumb-item>
    </el-breadcrumb>
    
</template>
  

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
  