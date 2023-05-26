<template>
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/hotel_booking_history' }">酒店历史查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 100px 100px 100px;border-right: 1px solid #dadfe6;">
        <li v-for="(order, key) in orders.slice((page - 1) * pageSize, page * pageSize)" :key="order.order_no"
            class="list-item-target">
            <el-row class="card-item-wrap">
                <el-col class="left" :span="20">
                    <el-row style="height: 35%;">
                        <el-col :span="8" style="border:2px solid #dadfe6;font-size: 20px;">
                            <div style="text-align: center;">订单号</div>
                        </el-col>
                        <el-col :span="16" style="border:2px solid #dadfe6;font-size: 20px;">
                            <div style="text-align: center;">{{ order.name }}</div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 65%;">
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
                </el-col>

                <!-- 评分评价按钮 -->
                <el-col class="right" :span="4" style="display: flex;justify-content: center;align-items: center;">
                    <div v-if=order.has_score>
                        <el-button text @click="submit_score" disabled>评分</el-button>
                    </div>
                    <div v-else="">
                        <el-button text @click="submit_score">评分</el-button>
                    </div>
                    <el-button text @click="submit_comment">评价</el-button>
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
import { orders } from "@/components/hotel/hotel_booking_history"
import { ElMessage, ElMessageBox } from 'element-plus'
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

//评分 value为评价值
const submit_score = () => {
    ElMessageBox.prompt('0-5分打分','评分', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
    })
        .then(({ value }) => {
            ElMessage({
                type: 'success',
                message: `提交成功`,
            })
            // console.log(value)
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '评价失败',
            })
        })
}

//评价 value为评价值
const submit_comment = () => {
    ElMessageBox.prompt('评价', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
    })
        .then(({ value }) => {
            ElMessage({
                type: 'success',
                message: `提交成功`,
            })
            // console.log(value)
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '评价失败',
            })
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
    padding: 10px 300px 10px 100px;
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
  