<template>
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/plane_search' }">航班查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="center" id="Title">
        航班查询
    </el-row>
    
    <div id="plane_search">
        <el-col :model="plane_search" label-width="80px" style="text-align: center;">
            
            <el-row>
                <el-text style="width:50%;font-size: large;">出发点</el-text>
                <el-text style="width:50%;font-size: large">目的地</el-text>
            </el-row>

            <el-row>
                <el-input v-model="plane_search.end_location" style="width: 40%;" />
                <el-text style="width:4%"></el-text>
                <el-button type="primary" circle style="width: 12%" @click="swap_location">
                    <el-icon><Switch /></el-icon>
                </el-button>
                <el-text style="width:4%"></el-text>
                <el-input v-model="plane_search.start_location" style="width: 40%" />
            </el-row>

            <el-row style="margin-top: 20px;margin-bottom: 20px;">
                <el-text style="font-size: large;margin-right: 20px;">航班公司</el-text>
                <el-input v-model="plane_search.company" style="width: 60%" />
            </el-row>
            
            <el-row style="margin-top: 20px;margin-bottom: 20px;">
                <el-text style="font-size: large;margin-right: 20px;">航班日期</el-text>
                <el-date-picker v-model="plane_search.date" type="date" :disabled-date="disabledDate" placeholder="Pick a date" style="width: 60%" />
            </el-row>
            
            <RouterLink to=/component/plane_list>
                <el-button type="primary" style="width: 120px;" @click="on_plane_Submit">查询</el-button>
            </RouterLink>

        </el-col>
    </div>

</template>
  

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { plane_search } from "@/components/plane/plane_search"
import { plane_search_data , solve} from "@/components/plane/plane_list"
import router from '@/router'

//交换出发地与目的地
const swap_location=()=>{
    let tmp:string=plane_search.start_location
    plane_search.start_location=plane_search.end_location
    plane_search.end_location=tmp
}

//与后端交互接收搜索结果 传输到plane_search_data中
const on_plane_Submit = () => {

    solve();//调用处理处理数据
}

//航班日期必选 默认为今天 设置无法选中过去日期
const disabledDate = (time: Date) => {
  return time.getTime()+ 3600 * 1000 * 24 <= Date.now()
}

</script>

<style scoped>
#plane_search {
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