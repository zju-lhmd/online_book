<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/hotel_booking_history' }">酒店历史查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 0px 100px 0px;caret-color: transparent;">
        <li v-for="(order, key) in orders.slice((page - 1) * pageSize, page * pageSize)" :key="order.order_no"
            class="list-item-target">
            <el-row class="card-item-wrap">
                <el-col class="left" :span="24">
                    <el-row style="height: 15%;">
                        <el-col :span="8" style="border:2px solid #dadfe6;font-size: 20px;">
                            <div style="text-align: center;">订单号</div>
                        </el-col>
                        <el-col :span="16" style="border:2px solid #dadfe6;font-size: 20px;">
                            <div style="text-align: center;">{{ order.order_no }}</div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 35%;">
                        <el-col :span="14" style="border:2px solid #dadfe6;font-size: large;">
                            <el-text>{{ order.name }}</el-text>
                            <el-text style="margin-left: 20px;">{{ order.type }}</el-text>
                            <br />
                            <el-text>{{ order.location }}</el-text>
                            <el-text style="margin-left: 20px;">{{ order.date1.toLocaleDateString() }}->{{
                                order.date2.toLocaleDateString() }}</el-text>
                        </el-col>

                        <el-col :span="5"
                            style="border:2px solid #dadfe6;font-size: large;display: flex;justify-content: center;align-items: center;">
                            <div v-if="order.state === 0">已预订</div>
                            <el-test v-else-if="order.state === 1">已入住</el-test>
                            <el-test v-else>已退订</el-test>
                        </el-col>
                        
                        <el-col :span="5"
                            style="border:2px solid #dadfe6;font-size: large;display: flex;justify-content: center;align-items: center;">
                            <div>支付{{ Math.floor(order.price) }}元</div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 50%;">
                        <el-col :span="19" style="border:2px solid #dadfe6;font-size: large;display: flex;flex-direction:column ;justify-content: center;align-items: center;">
                            <el-input v-model="order.comment" :rows="2" type="textarea" placeholder="请输入评价" style="width: 80%;"/>
                            <el-button type="primary" style="width: 30%;" @click="comment_submit(order)">评价</el-button>
                        </el-col>
                        
                        <el-col :span="5" style="border:2px solid #dadfe6;font-size: large;display: flex;flex-direction:column ;justify-content: center;align-items: center;">
                            <el-input v-model="order.score" style="width: 60%;margin-bottom: 10%;"></el-input>
                            <el-button v-if="order.has_score" type="primary" disabled style="width: 60%;" @click="score_submit">已评分</el-button>
                            <el-button v-else="" type="primary" style="width: 60%;" @click="score_submit(order)">评分</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </li>
        <el-pagination
            style="padding: 10px 300px 10px 100px;"
            layout=" prev, pager, next,jumper"
            :current-page="page"
            :page-size="pageSize"
            :total="total"
            :style="{'justify-content':'center'}"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"/>
    </el-col>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { orders , type Hotel_booking_history } from "@/components/hotel/hotel_booking_history"
import axios from "axios";
const page = ref(1)
const total = ref(orders.length)
const pageSize = ref(4)

//分页函数
const handleSizeChange = (val: number) => {
    pageSize.value = val;

}
const handleCurrentChange = (val: number) => {
    page.value = val;
}

const comment_submit=(order:Hotel_booking_history)=>{
    var data={
        user:order.user,
        comment:order.comment
    }
    axios.post('http://localhost:3400/comment_submit',data).then(function(response){
        
    })
}

const score_submit=(order:Hotel_booking_history)=>{
    var data={
        user:order.user,
        score:order.score
    }
    axios.post('http://localhost:3400/score_submit',data).then(function(response){
        order.has_score=true;
    })
}



</script>

<style scoped>
li {
    margin: 0;
    padding: 0;
    list-style: none;
}

.card-item-wrap {
    padding: 10px 150px 10px 150px;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    min-height: 240px;
}

.card-item-wrap .left {
    border: 2px solid #dadfe6;
}

.card-item-wrap .right {
    border: 2px solid #dadfe6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
  