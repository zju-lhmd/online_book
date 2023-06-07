<template>

    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/market' }">商品查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/market_detail' }">详细信息</el-breadcrumb-item>
    </el-breadcrumb>

    
    <el-col style="padding-top: 20px;padding-left: 20px;background-color: #f5f7fa;caret-color: transparent;">
        <el-row>

            <el-col :span="8" style="border-right: 1px solid #dadfe6;">
                <el-text style="font-size: large;">
                    {{ good_detail.description }}
                </el-text>
            </el-col>

            <el-col :span="16" align-items="left" style="padding-left: 10px;">

                <el-text style="font-size: 25px;color: black;margin-right: 20px;">名称</el-text>
                <el-text style="font-size: 25px;color: black;">{{ good_detail.name }}</el-text>
                <br /><br />

                <el-text style="font-size: 25px;color: black;margin-right: 20px;">类别</el-text>
                <el-text style="font-size: 25px;color: black;">{{ good_detail.category }}</el-text>
                <br /><br />

                <el-text style="font-size: 25px;color: black;margin-right: 20px;">产地</el-text>
                <el-text style="font-size: 25px;color: black;">{{ good_detail.location }}</el-text>
                <br /><br />

                <el-text style="font-size: 25px;color: black;margin-right: 20px;">销量</el-text>
                <el-text style="font-size: 25px;color: black;margin-right: 100px;">{{ good_detail.sale }}</el-text>
                <el-text style="font-size: 25px;color: black;margin-right: 20px;">余量</el-text>
                <el-text style="font-size: 25px;color: black;">{{ good_detail.stock }}</el-text>
                <br /><br />

                <el-text style="font-size: 25px;color: black;margin-right: 20px;">数量</el-text>
                <el-input-number v-model="num" :min="1" :max=good_detail.stock @change="handleChange" size="large"/>
                <br/>

                <el-text style="font-size: 25px;color: black;margin-right: 20px;">价格</el-text>
                <el-text style="font-size: 25px;color: black;">{{ good_detail.price *good_detail.discount * num }}</el-text>
                <br /><br />

                <!-- 订购按钮 跳转到模块二 -->
                <el-button type="primary" style="width: 200px;">订购</el-button>

            </el-col>

        </el-row>
    </el-col>

</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { good } from '@/components/market/market'
import axios from 'axios';


let good_detail=ref(good)
const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}

</script>

<style scoped></style>
  