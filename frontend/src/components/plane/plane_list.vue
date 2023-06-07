<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/plane_search' }">航班查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/plane_list' }">查询结果</el-breadcrumb-item>
    </el-breadcrumb>

    <div id="Page">
        <el-col>
            <el-row>
                <el-col :span="17" style="border-right: 1px solid #dadfe6">

                    <!-- 查询信息 -->
                    <el-row style="margin: 20px 20px 0px 20px;" :gutter="10">
                        <el-col :span="10">
                            <el-text style="font-size: 15px;margin-right: 10px;">始</el-text>
                            <el-input v-model="plane_search.start_location" style="width: calc(50% - 25px - 28px);caret-color: auto;" />
                            <el-button type="primary" circle style="size=15px;margin: 0px 5px 0px 5px;" @click="swap_location">
                                <el-icon size="15px"><Switch /></el-icon>
                            </el-button>
                            <el-text style="font-size: 15px;margin: 0px 5px 0px 5px;">终</el-text>
                            <el-input v-model="plane_search.end_location" style="width: calc(50% - 25px - 28px);caret-color: auto;" />
                        </el-col>
                        <el-col :span="7">
                            <el-text style="font-size: 15px;margin: 0px 10px 0px 0px;">航班公司</el-text>
                            <el-input v-model="plane_search.company" style="width:calc(100% - 70px);caret-color: auto;" />
                        </el-col>
                        <el-col :span="7">
                            <el-text style="font-size: 15px;margin: 0px 10px 0px 0px;">日期</el-text>
                            <el-date-picker v-model="plane_search.date" type="date" :disabled-date="disabledDate"
                                placeholder="Pick a date" style="width:calc(100% - 40px);" />
                        </el-col>
                    </el-row>

                    <!-- 航班排序按钮 -->
                    <el-row type="flex" justify="center" style="margin: 20px 0px 20px 0px;" :gutter="10">
                        
                        <el-button type="primary" style="margin-left: 20px;width: 60px;"  @click="on_plane_Submit" :span="6">查询</el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_price_change" :span="6">
                            <div v-if="plane_sort.price_sort">价格(由高到低)</div>
                            <div v-else="">价格(由低到高)</div>
                        </el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_time_change" :span="6">
                            <div v-if="plane_sort.time_sort">时间(由晚到早)</div>
                            <div v-else="">时间(由早到晚)</div>
                        </el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_direct_change" :span="6">
                            <div v-if="plane_sort.direct_only">仅直飞</div>
                            <div v-else="">直飞与转机</div>
                        </el-button>
                    </el-row>

                    <li v-for="plane_data in plane.slice((page - 1) * pageSize, page * pageSize)" :key="plane_data[0].price"
                        class="list-item-target">
                        <el-row class="card-item-wrap">
                            <el-col class="left" :span="4">
                                <div v-for="plane_company in plane_data" style="height: 50%;">
                                    <!-- 插入图标 -->
                                    <el-text style="font-size: large;color: black;">{{ plane_company.company }}</el-text>
                                </div>
                            </el-col>

                            <el-col class="middle" :span="16">
                                <div v-for="plane_ in plane_data" style="height: 40%;">

                                    <!-- 插入图标 -->
                                    <el-text style="font-size: large;color: black;">{{ plane_.start_location }}</el-text>
                                    <el-icon style="font-size: large;color: black;margin: 0px 10px 0px 0px;">
                                        <Right />
                                    </el-icon>
                                    <el-text style="font-size: large;color: black;">{{ plane_.end_location }}</el-text>
                                    <el-text
                                        style="font-size: large;color: black;margin: 0px 5px 0px 0px;">{{ plane_.start_time.toLocaleDateString() }}
                                        {{ plane_.start_time.toLocaleTimeString() }}</el-text>
                                    <el-icon style="font-size: large;color: black;margin: 0px 5px 0px 0px;">
                                        <Right />
                                    </el-icon>
                                    <el-text
                                        style="font-size: large;color: black;margin: 0px 5px 0px 0px;">{{ plane_.end_time.toLocaleDateString() }}
                                        {{ plane_.end_time.toLocaleTimeString() }}</el-text>
                                </div>
                                <el-text style="font-size: large;color: black;">机票剩余量</el-text>
                                <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{
                                    plane_data[0].stock }}</el-text>
                            </el-col>

                            <el-col class="right" :span="4">
                                <el-space direction="vertical">
                                    <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">总价</el-text>
                                    <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{
                                        plane_data[0].price }}</el-text>
                                    <el-button type="primary" @click="booking_plane(plane_data)">订购</el-button>
                                </el-space>
                            </el-col>
                        </el-row>
                    </li>
                    <el-pagination layout=" prev, pager, next,jumper" :current-page="page" :page-size="pageSize"
                        :total="total" :style="{ 'justify-content': 'center' }" @current-change="handleCurrentChange"
                        @size-change="handleSizeChange" />
                </el-col>

                <el-col :span="7" style="padding-top: 20px;">
                    <el-test style="font-size: large;">
                        特价航班
                    </el-test>
                    <li v-for="plane_data in special_plane" class="list-item-target">
                        <el-row class="card-item-wrap">
                            <el-col class="middle" :span="18">
                                <div v-for="plane_ in plane_data" style="height: 40%;">
                                    <!-- 插入图标 -->
                                    <el-text style="font-size: large;color: black;">{{ plane_.company }}</el-text>
                                    <el-text style="font-size: large;color: black;margin: 0px 5px 0px 5px;">{{
                                        plane_.start_location }}</el-text>
                                    <el-icon style="font-size: large;color: black;margin: 0px 5px 0px 5px;">
                                        <Right />
                                    </el-icon>
                                    <el-text style="font-size: large;color: black;">{{ plane_.end_location }}</el-text>
                                    <br />
                                    <el-text
                                        style="font-size: large;color: black;">{{ plane_.start_time.toLocaleTimeString() }}</el-text>
                                    <el-icon style="font-size: large;color: black;margin: 0px 5px 0px 0px;">
                                        <Right />
                                    </el-icon>
                                    <el-text
                                        style="font-size: large;color: black;margin: 0px 5px 0px 0px;">{{ plane_.end_time.toLocaleTimeString() }}</el-text>
                                    <br />
                                </div>
                                <br />
                                <div style="height: 20%;">
                                    <el-text style="font-size: large;color: black;">机票剩余量</el-text>
                                    <el-text style="font-size: large;color: black;margin: 0px 0px 0px 10px;">{{
                                        plane_data[0].stock }}</el-text>
                                </div>
                            </el-col>

                            <el-col class="right" :span="6">
                                <el-space direction="vertical">
                                    <el-text style="font-size: large;color: black;">总价</el-text>
                                    <el-text style="font-size: large;color: black;">{{ plane_data[0].price }}</el-text>
                                    <el-button type="primary" @click="booking_plane(plane_data)">订购</el-button>
                                </el-space>
                            </el-col>
                        </el-row>
                    </li>
                </el-col>

            </el-row>
        </el-col>
    </div>
</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { plane_search } from "@/components/plane/plane_search"
import { plane_, plane_sort, special_plane_, plane_init , direct , transfer } from "@/components/plane/plane_list"
import axios from 'axios'
import router from '@/router'

let plane=ref(plane_)
let special_plane=ref(special_plane_)

const page = ref(1)
const total = ref(plane.value.length)
const pageSize = ref(4)

//分页函数
const handleSizeChange = (val: number) => {
    pageSize.value = val;

}
const handleCurrentChange = (val: number) => {
    page.value = val;
}

//交换出发地与目的地
const swap_location = () => {
    let tmp: string = plane_search.start_location
    plane_search.start_location = plane_search.end_location
    plane_search.end_location = tmp
}

//与后端交互接收搜索结果 传输到plane_search_data中
const on_plane_Submit = () => {
    axios.post('/plane_search', plane_search).then(function (response) {
        plane_init(response.data);
        if(plane_sort.direct_only===true)plane.value=direct;
        else plane.value=direct.concat(transfer)
        special_plane.value=special_plane_;
        sort(1)
        page.value= 0
        page.value = 1
        total.value = plane.value.length
        router.push({path:'/component/plane_list'})
    })
}

const booking_plane=(plane_data:any)=>{
    let order_id="";
    axios.post('/get_order_id').then(function(response){
        order_id=response.data
        var data={
            user_id:1,
            order_id:order_id,
            plane_id:plane_data[0].plane_id,
            start_time:plane_data[0].start_time,
            end_time:plane_data[0].end_time,
            price:plane_data[0].price
        }
        if(plane_data.length==2){
            data.price-=plane_data[1].price
        }
        axios.post('/add_booking_plane_history',data).then(function(response){
            let order={
                order_id:order_id
            }
            axios.post('/add_order_id',order).then(function(response){

            })
        })
    })
    if(plane_data.length==2){
        let order_id1="";
        axios.post('/get_order_id').then(function(response){
            order_id1=response.data
            var data1={
                user_id:1,
                order_id:order_id1,
                plane_id:plane_data[1].plane_id,
                start_time:plane_data[1].start_time,
                end_time:plane_data[1].end_time,
                price:plane_data[1].price
            }
            axios.post('/add_booking_plane_history',data1).then(function(response){
                let order1={
                    order_id:order_id1
                }
                axios.post('/add_order_id',order1).then(function(response){

                })
            })
        })
    }
}

//航班日期必选 默认为今天 设置无法选中过去日期
const disabledDate = (time: Date) => {
    return time.getTime() + 3600 * 1000 * 24 <= Date.now()
}

const on_price_change = () => {
    if (plane_sort.price_sort)
        plane_sort.price_sort = false;
    else
        plane_sort.price_sort = true;
    sort(1);
}

const on_time_change = () => {
    if (plane_sort.time_sort)
        plane_sort.time_sort = false;
    else
        plane_sort.time_sort = true;
    sort(2);
}

const on_direct_change = () => {
    if (plane_sort.direct_only)
        plane_sort.direct_only = false;
    else
        plane_sort.direct_only = true;
    // direct_change();
    if(plane_sort.direct_only===true)plane.value=direct;
    else plane.value=direct.concat(transfer)
    sort(1)
}

const sort = (type: number) => {
    plane.value.sort((n1, n2) => {
        if (type === 1) {
            if (n1[0].price != n2[0].price) {
                if (plane_sort.price_sort)
                    return n2[0].price - n1[0].price;
                else return n1[0].price - n2[0].price;
            } else {
                if (plane_sort.time_sort)
                    return n2[0].start_time.getTime() - n1[0].start_time.getTime();
                else return n1[0].start_time.getTime() - n2[0].start_time.getTime();
            }
        } else {
            if (n1[0].start_time != n2[0].start_time) {
                if (plane_sort.time_sort)
                    return n2[0].start_time.getTime() - n1[0].start_time.getTime();
                else return n1[0].start_time.getTime() - n2[0].start_time.getTime();
            } else {
                if (plane_sort.price_sort)
                    return n2[0].price - n1[0].price;
                else return n1[0].price - n2[0].price;
            }
        }
    })
    page.value = 0;
    page.value = 1;
    total.value = plane.value.length;
    console.log(plane.value.length)
}



</script>

<style scoped>
#Page {
    background-color: #f5f7fa;
    caret-color: transparent;
}

.sort_button {
    font-size: large;
    margin: 0px 20px 0px 20px;
    height: 30px;
    width: 20%;
}

li {
    margin: 0;
    padding: 0;
    list-style: none;
}

.list-item-target {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
}

.card-item-wrap {
    padding: 16px;
    background: #fff;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    min-height: 100px;
}

.card-item-wrap .left {
    padding-right: 16px;
}

.card-item-wrap .middle {
    border-right: 1px solid #dadfe6;
    padding-right: 16px;
}

.card-item-wrap .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}</style>
  