<template>
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/plane_search' }">航班查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="center" id="Title">
        航班查询
    </el-row>
    
    <div id="hotel_search">
        <el-form :model="hotel_search" label-width="80px" style="text-align: center;">
            <el-form-item label="目的地">
                <el-input v-model="hotel_search.location" />
            </el-form-item>

            <el-form-item label="酒店名称">
                <el-input v-model="hotel_search.hotel_name" />
            </el-form-item>
            
            <el-form-item label="入住日期">
                <el-col>
                    <el-date-picker v-model="hotel_search.date1" type="date" :disabled-date="disabledDate1" placeholder="Pick a date" style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="退房日期">
                <el-col>
                    <el-date-picker v-model="hotel_search.date2" type="date" :disabled-date="disabledDate2" placeholder="Pick a date" style="width: 100%" />
                </el-col>
            </el-form-item>
            
            <el-form-item>
                <RouterLink to=/component/hotel_list>
                    <el-button type="primary" style="width: 120px;" @click="on_hotel_Submit">查询</el-button>
                </RouterLink>
            </el-form-item>

        </el-form>
    </div>

</template>
  

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { hotel_search } from "@/components/hotel/hotel_search"
import router from '@/router'
//与后端交互接收搜索结果
const on_hotel_Submit = () => {
    let nd:number =86400000;// 1000*24*60*60一天的毫秒数
    let time:number =(hotel_search.date2.getTime()-hotel_search.date1.getTime())/1000/24/60/60;
    hotel_search.time=Math.ceil(time);//计算入住天数
    console.log(hotel_search.time)
}

//入住日期必选 默认为今天 设置无法选中过去日期
const disabledDate1 = (time: Date) => {
  return time.getTime()+ 3600 * 1000 * 24 <= Date.now()
}

//退房日期必选 默认为明天 设置无法选中小于入住日期的时间
const disabledDate2 = (time: Date) => {
  return time.getTime() <= hotel_search.date1.getTime()
}

</script>

<style scoped>
#hotel_search {
    width: 300px;
    margin:auto;
    margin-top: 20px;
    
}
#Title{
    width: 300px;
    font-size: 30px;
    margin:auto;
    margin-top: 50px;

}
</style>
