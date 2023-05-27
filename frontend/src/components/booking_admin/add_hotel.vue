<template>
    
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/hotel_search' }">酒店修改</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/hotel_list' }">查询结果</el-breadcrumb-item>
    </el-breadcrumb>

</template>
  

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
