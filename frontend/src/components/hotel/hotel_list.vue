<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/hotel_search' }">酒店查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/hotel_list' }">查询结果</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="Page">
        <el-col >
            <el-row >

                <el-col :span="17" style="border-right: 1px solid #dadfe6">

                    <!-- 再次显示酒店查询信息，修改后点击查询可重新获得酒店信息 -->
                    <el-form>
                        <el-row style="margin: 20px 20px 0px 20px;" :gutter="10">
                            <el-col :span="12">
                                <el-form-item label="目的地：">
                                    <el-input v-model="hotel_search.location" style="caret-color: auto;"/>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="酒店名称：">
                                    <el-input v-model="hotel_search.hotel_name" style="caret-color: auto;"/>
                                </el-form-item>
                            </el-col>

                        </el-row>

                        <el-row style="margin: 0px 20px 0px 20px;">
                            <el-col :span="12" style="padding-right: 10px;">
                                <el-form-item label="入住日期：">
                                    <el-col>
                                        <el-date-picker v-model="hotel_search.date1" type="date"
                                            :disabled-date="disabledDate1" placeholder="Pick a date" style="width: 100%;" />
                                    </el-col>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12" style="padding-right: 10px;">
                                <el-form-item label="退房日期：">
                                    <el-col>
                                        <el-date-picker v-model="hotel_search.date2" type="date"
                                            :disabled-date="disabledDate2" placeholder="Pick a date" style="width: 100%" />
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                    <!-- 四个按钮 查询为重新获得信息 后三个为对酒店信息的排序 -->
                    <el-row type="flex" justify="center" :gutter="10">

                        <el-button type="primary" plain class="sort_button" @click="on_hotel_Submit" :span="6">查询</el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_price_change" :span="6">
                            <div v-if="hotel_sort.price_sort">价格(由高到低)</div>
                            <div v-else="">价格(由低到高)</div>
                        </el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_star_change" :span="6">
                            <div v-if="hotel_sort.star_sort">星级(由高到低)</div>
                            <div v-else="">星级(由低到高)</div>
                        </el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_score_change" :span="6">
                            <div v-if="hotel_sort.score_sort">评分(由高到低)</div>
                            <div v-else="">评分(由低到高)</div>
                        </el-button>

                    </el-row>

                    <!-- 酒店查询结果 -->
                    <li v-for="(hotel_data,key) in datas.slice((page - 1) * pageSize, page * pageSize)" :key="hotel_data.name" class="list-item-target" :offset="2">
                        <el-row class="card-item-wrap">
                            
                            <el-col class="middle" :span="14" align-items="left" :offset="2">
                                <el-text class="hotel_name">{{ hotel_data.name }}</el-text>
                                <br/><br/>
                                <el-text class="hotel_location">{{ hotel_data.location }}</el-text>
                                <br/><br/>
                                <el-text class="hotel_phone">联系电话{{ hotel_data.phone }}</el-text>
                            </el-col>

                            <el-col class="right" :span="8">
                                <el-space direction="vertical">
                                    <div>
                                        <el-text>星级</el-text>
                                        <el-rate v-model=hotel_data.star disabled text-color="#ff9900"/>
                                    </div>
                                    <div>
                                        <el-text>评分</el-text>
                                        <el-rate v-model=hotel_data.score disabled text-color="#ff9900"/>
                                    </div>
                                    <el-text>预估价格：{{ Math.floor(hotel_data.price_min * hotel_search.time * hotel_data.discount) }}元</el-text>
                                    <el-button type="primary" style="width: 120px;" @click="on_hotel_detail(hotel_data)">查看详情</el-button>
                                </el-space>
                            </el-col>

                        </el-row>
                    </li>
                    <el-pagination
                    layout=" prev, pager, next,jumper"
                    :current-page="page"
                    :page-size="pageSize"
                    :total="total"
                    :style="{'justify-content':'center'}"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    style="caret-color: auto;" />
                </el-col>


                <el-col :span="7" style="padding-top: 20px;">
                    <el-test style="font-size: large;">
                        特价酒店信息
                    </el-test>
                    
                    <!-- 特价酒店，根据搜索情况显示 -->
                    <li  v-for="hotel_data in special_data" class="list-item-target">
                        <el-row class="card-item-wrap">                            
                            <el-col class="middle" :span="20" align-items="left" :offset="4">
                                <el-text style="font-size: large;">{{ hotel_data.name }}</el-text>
                                <br/><br/>
                                <el-text>{{ hotel_data.location }}</el-text>
                                <br/><br/>
                                <el-text>联系电话{{ hotel_data.phone }}</el-text>
                                <br/><br/>
                                <el-text>特价：{{ Math.floor(hotel_data.price_min * hotel_search.time * hotel_data.discount) }}元</el-text>
                                <br/>
                                <el-button type="primary" style="width: 80px;" @click="on_hotel_detail(hotel_data)">查看详情</el-button>
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
import { hotel_search } from "@/components/hotel/hotel_search"
import { hotel_sort, datas , special_data , data_init , type Hotel_data} from "@/components/hotel/hotel_list"
import { hotel_detail_init , type Hotel_detail_data} from "@/components/hotel/hotel_detail"
import router from '@/router'
import axios from 'axios'

const page = ref(1)
const total = ref(datas.length)
const pageSize = ref(4)


const on_hotel_Submit = () => {
    let nd:number =86400000;// 1000*24*60*60一天的毫秒数
    let time:number =(hotel_search.date2.getTime()-hotel_search.date1.getTime())/1000/24/60/60;
    hotel_search.time=Math.ceil(time);//计算入住天数
    axios.post('/hotel_search',hotel_search).then(function(response){
        data_init(response);
        page.value=2;
        page.value=1;
        total.value=datas.length
    })
}

const on_hotel_detail=(hotel_data:Hotel_data)=>{//hotel_data是点击查看详情时当前的酒店信息 类型为Hotel_data 定义在hotel_list里
    var hotel_id={
        hotel_id:hotel_data.hotel_id
    }
    axios.post('/get_hotel_detail',hotel_id).then(function(response){
        hotel_detail_init(response.data)
        router.push({path:'/component/hotel_detail'})
    })
}

//入住日期必选 默认为今天 设置无法选中过去日期
const disabledDate1 = (time: Date) => {
    return time.getTime() + 3600 * 1000 * 24 <= Date.now()
}

//退房日期必选 默认为明天 设置无法选中小于入住日期的时间
const disabledDate2 = (time: Date) => {
    return time.getTime() <= hotel_search.date1.getTime()
}

//价格排序按钮响应函数
const on_price_change = () => {
    if (hotel_sort.price_sort)
        hotel_sort.price_sort = false;
    else
        hotel_sort.price_sort = true;
    sort(1);
}

//星级排序按钮响应函数
const on_star_change = () => {
    if (hotel_sort.star_sort)
        hotel_sort.star_sort = false;
    else
        hotel_sort.star_sort = true;
    sort(2);
}

//评分排序按钮相应函数
const on_score_change = () => {
    if (hotel_sort.score_sort)
        hotel_sort.score_sort = false;
    else
        hotel_sort.score_sort = true;
    sort(3);
}

//sort函数 改变排序状态调用
const sort=(type:number)=>{
    if(type===1){//按照价格 星级 评分排序
        datas.sort((n1,n2)=>{
            if(n1.price_min!=n2.price_min){
                if(hotel_sort.price_sort)
                    return n2.price_min-n1.price_min;
                else return n1.price_min-n2.price_min;
            }
            else if(n1.star!=n2.star){
                if(hotel_sort.star_sort)
                    return n2.star-n1.star;
                else return n1.star-n2.star;
            }
            else{
                if(hotel_sort.score_sort)
                    return n2.score-n1.score;
                else return n1.score-n2.score;
            }
        })
    }
    else if(type===2){//按照星级 价格 评分排序
        datas.sort((n1,n2)=>{
            if(n1.star!=n2.star){
                if(hotel_sort.star_sort)
                    return n2.star-n1.star;
                else return n1.star-n2.star;
            }
            else if(n1.price_min!=n2.price_min){
                if(hotel_sort.price_sort)
                    return n2.price_min-n1.price_min;
                else return n1.price_min-n2.price_min;
            }
            else{
                if(hotel_sort.score_sort)
                    return n2.score-n1.score;
                else return n1.score-n2.score;
            }
        })
    }
    else{//按照评分 价格 星级排序
        datas.sort((n1,n2)=>{
            if(n1.score!=n2.score){
                if(hotel_sort.score_sort)
                    return n2.score-n1.score;
                else return n1.score-n2.score;
            }
            else if(n1.star!=n2.star){
                if(hotel_sort.star_sort)
                    return n2.star-n1.star;
                else return n1.star-n2.star;
            }
            else {
                if(hotel_sort.price_sort)
                    return n2.price_min-n1.price_min;
                else return n1.price_min-n2.price_min;
            }
        })
    }
    page.value=2;
    page.value=1;
    total.value=datas.length;
}

//分页函数
const handleSizeChange = (val:number) => {
  pageSize.value = val;

}
const handleCurrentChange = (val:number) => {
  page.value = val;
}

</script>

<style scoped>
#Page {
    background-color: #f5f7fa;
    caret-color: transparent;
}
.sort_button {
    font-size: large;
    height: 30px;
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
    min-height: 204px;
}

.card-item-wrap .left {
    border-right: 1px solid #dadfe6;
    padding-right: 16px;
    display: inline-flex;
}

.card-item-wrap .middle {
    padding-right: 16px;
}

.card-item-wrap .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.hotel_name{
    font-size: 25px;
    color: black;
}
.hotel_location{
    font-size: 20px;
    color: black;
}
.hotel_phone{
    font-size: 20px;
    color: black;
}
</style>
  