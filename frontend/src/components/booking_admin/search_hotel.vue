<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/admin_search_hotel' }">酒店查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="center" id="Title">
        酒店查询
    </el-row>
    
    <div id="hotel_search">
        <el-form :model="hotel_search" label-width="80px" style="text-align: center;">
            <el-form-item label="地点">
                <el-input v-model="hotel_search.location" style="caret-color: auto;"/>
            </el-form-item>

            <el-form-item label="酒店名称">
                <el-input v-model="hotel_search.hotel_name" style="caret-color: auto;"/>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" style="width: 120px;" @click="on_search_hotel_Submit">查询</el-button>
            </el-form-item>

        </el-form>
    </div>

</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { hotel_list_init } from "@/components/booking_admin/hotel_info"
import router from '@/router'
import axios from 'axios'

let hotel_search=ref({
    location:"",
    hotel_name:"",
    date1:new Date,
    date2:new Date
})

//与后端交互接收搜索结果
const on_search_hotel_Submit = () => {
    console.log(hotel_search.value)
    axios.post('/hotel_search',hotel_search.value).then(function(response){
        console.log(response)
        hotel_list_init(response)
        router.push({path:'/component/admin_list_hotel'})
    })
}

</script>

<style scoped>
#hotel_search {
    width: 300px;
    margin:auto;
    margin-top: 20px;
    caret-color: transparent;
}
#Title{
    width: 300px;
    font-size: 30px;
    margin:auto;
    margin-top: 50px;
    caret-color: transparent;
}
</style>
