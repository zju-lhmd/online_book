<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/hotel_search' }">酒店查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/hotel_list' }">查询结果</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/hotel_detail' }">酒店详情</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-col style="padding-top: 20px;padding-left: 20px;background-color: #f5f7fa;caret-color: transparent;">
        <el-row>

            <el-col :span="8" style="border-right: 1px solid #dadfe6;">
                <el-text style="font-size: large;">
                    {{ hotel_detail_data.description }}
                </el-text>
            </el-col>

            <el-col :span="16" align-items="left" style="padding-left: 10px;">

                <el-text style="font-size: 30px;color: black;">
                    {{ hotel_detail_data.name }}
                </el-text>
                <br /><br />

                <el-text style="font-size: 20px;color: black;">
                    {{ hotel_detail_data.location }}
                </el-text>
                <br /><br />

                <el-text style="font-size: 20px;color: black;">
                    联系电话{{ hotel_detail_data.phone }}
                </el-text>
                <br /><br />


                <el-text style="font-size: 20px; color: black;">星级 </el-text>
                <el-rate v-model=hotel_detail_data.star disabled text-color="#ff9900" />
                <br /><br />

                <el-text style="font-size: 20px; color: black;">评分 </el-text>
                <el-rate v-model=hotel_detail_data.score disabled text-color="#ff9900" />
                <br /><br />

                <el-text style="font-size: 20px; color: black;padding-right: 10px;">房型</el-text>
                <el-select v-model="value" value-key="type" placeholder="Select" size="large">
                    <el-option v-for="item in rooms" :key="item.type" :label="item.type" :value="item" />
                </el-select>
                <el-text style="padding-left: 20px;font-size: 20px; color: black;">余量 {{ value.stock }}</el-text>
                <br /><br />


                <el-text style="font-size: 15px; color: black;padding-right: 10px;">入住日期</el-text>
                <el-date-picker v-model="hotel_search.date1" type="date" :disabled-date="disabledDate" style="width: 25%" />
                <el-text style="font-size: 15px; color: black;padding-left: 10px;padding-right: 10px;">退房日期</el-text>
                <el-date-picker v-model="hotel_search.date2" type="date" :disabled-date="disabledDate" style="width: 25%" />
                <br /><br />

                <el-text style="font-size: 20px; color: black;">总价 {{ Math.floor(hotel_detail_data.discount * value.price *
                    hotel_search.time) }}</el-text>
                <!-- 订购按钮 跳转到模块二 -->
                <el-button type="primary" style="width: 200px;margin-left: 130px;" @click="booking_hotel">订购</el-button>

            </el-col>

        </el-row>
    </el-col>
    
    <el-col style="padding-top: 20px;padding-left: 20px;background-color: #f5f7fa;caret-color: transparent;">
        <el-text style="font-size: 20px;color: black;">顾客评论</el-text>
        <!-- 评论显示 -->
        <li v-for="(comment, key) in comments.slice((page - 1) * pageSize, page * pageSize)" :key="comment"
            class="list-item-target" :offset="2">
            <el-text style="font-size: medium;color: black;">{{ comment }}</el-text>
        </li>
        <el-pagination layout=" prev, pager, next,jumper" :current-page="page" :page-size="pageSize" :total="total"
            :style="{ 'justify-content': 'center' }" @current-change="handleCurrentChange" @size-change="handleSizeChange" style="caret-color: auto;" />
    </el-col>

</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { hotel_detail_data, rooms , comments , type Room } from "@/components/hotel/hotel_detail"
import { hotel_search } from "@/components/hotel/hotel_search"
import axios from 'axios'

const value = ref<Room>(rooms[0])
const disabledDate = (time: Date) => {
    return true
}

const page = ref(1)
const total = ref(comments.length)
const pageSize = ref(8)
//分页函数
const handleSizeChange = (val:number) => {
  pageSize.value = val;

}
const handleCurrentChange = (val:number) => {
  page.value = val;
}

const booking_hotel=()=>{
    let order_id="";
    axios.post('/get_order_id').then(function(response){
        order_id=response.data
        var data={
            user_id:1,
            order_id:order_id,
            hotel_id:hotel_detail_data.hotel_id,
            start_time:hotel_search.date1,
            end_time:hotel_search.date2,
            price:Math.floor(hotel_detail_data.discount * value.value.price *hotel_search.time)
        }
        axios.post('/add_booking_hotel_history',data).then(function(response){
            let order={
                order_id:order_id
            }
            axios.post('/add_order_id',order).then(function(response){

            })
        })
    })
}

</script>

<style scoped>
.list-item-target {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
  