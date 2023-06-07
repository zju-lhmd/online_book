<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/plane_booking_history' }">航班历史查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 0px 0px 0px;caret-color: transparent;">
        <li v-for="(order, key) in orders.slice((page - 1) * pageSize, page * pageSize)" :key="order.order_id"
            class="list-item-target">
            <el-row class="card-item-wrap">
                <el-col class="left" :span="24">
                    <el-row style="height: 35%;">
                        <el-col :span="8" style="border:2px solid #dadfe6;font-size: 20px;">
                            <div style="text-align: center;">订单号</div>
                        </el-col>
                        <el-col :span="16" style="border:2px solid #dadfe6;font-size: 20px;">
                            <div style="text-align: center;">{{ order.order_id }}</div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 65%;">
                        <el-col :span="16" style="border:2px solid #dadfe6;font-size: large;">
                            <el-text style="color: black;margin: 0px 5px 0px 5px;">{{ order.company }}</el-text>
                            <el-text style="color: black;margin: 0px 5px 0px 5px;">{{ order.start_location }}</el-text>
                            <el-icon style="color: black;margin: 0px 5px 0px 5px;"><Right /></el-icon>
                            <el-text style="color: black;">{{ order.end_location }}</el-text>
                            <el-text style="color: black;margin: 0px 5px 0px 5px;">{{order.start_time.toLocaleDateString()}}  {{order.start_time.toLocaleTimeString()}}</el-text>
                            <el-icon style="color: black;margin: 0px 5px 0px 5px;"><Right /></el-icon>
                            <el-text style="color: black;margin: 0px 5px 0px 5px;">{{order.end_time.toLocaleDateString()}}  {{order.end_time.toLocaleTimeString()}}</el-text>
                            <br />
                        </el-col>

                        <el-col :span="4"
                            style="border:2px solid #dadfe6;font-size: large;display: flex;justify-content: center;align-items: center;">
                            <div v-if="order.state === 0">已预订</div>
                            <el-test v-else-if="order.state === 1">已消费</el-test>
                            <el-test v-else>已退订</el-test>
                        </el-col>

                        <el-col :span="4"
                            style="border:2px solid #dadfe6;font-size: large;display: flex;justify-content: center;align-items: center;">
                            <div>支付{{ Math.floor(order.price) }}元</div>
                        </el-col>
                    </el-row>
                </el-col>

            </el-row>
        </li>
        <el-pagination
            style="padding: 10px 300px 10px 100px;caret-color: auto;"
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
import { order } from "@/components/plane/plane_booking_history"
const page = ref(1)
const total = ref(order.length)
const pageSize = ref(4)
let orders=ref(order)
//分页函数
const handleSizeChange = (val: number) => {
    pageSize.value = val;

}
const handleCurrentChange = (val: number) => {
    page.value = val;
}

</script>

<style scoped>
li {
    margin: 0;
    padding: 0;
    list-style: none;
}

.card-item-wrap {
    padding: 10px 100px 10px 100px;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    min-height: 120px;
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
  