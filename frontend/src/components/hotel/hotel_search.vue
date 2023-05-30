<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/hotel_search' }">酒店查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="center" id="Title">
        酒店查询
    </el-row>
    
    <div id="hotel_search">
        <el-form :model="hotel_search" label-width="80px" style="text-align: center;">
            <el-form-item label="目的地" style="caret-color:transparent;">
                <el-input v-model="hotel_search.location" style="caret-color: auto;"/>
            </el-form-item>

            <el-form-item label="酒店名称" style="caret-color:transparent;">
                <el-input v-model="hotel_search.hotel_name" style="caret-color: auto;"/>
            </el-form-item>
            
            <el-form-item label="入住日期" style="caret-color:transparent;">
                <el-col>
                    <el-date-picker v-model="hotel_search.date1" type="date" :disabled-date="disabledDate1" placeholder="Pick a date" style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="退房日期" style="caret-color:transparent;">
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
import { datas , data_init} from "@/components/hotel/hotel_list"
import router from '@/router'
import axios from 'axios'
//与后端交互接收搜索结果
const on_hotel_Submit = () => {
    let nd:number =86400000;// 1000*24*60*60一天的毫秒数
    let time:number =(hotel_search.date2.getTime()-hotel_search.date1.getTime())/1000/24/60/60;
    hotel_search.time=Math.ceil(time);//计算入住天数
    axios.post('http://localhost:3400/hotel_search',hotel_search).then(function(response){
        data_init(response.data);
    })
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
    caret-color: transparent;
}
</style>
