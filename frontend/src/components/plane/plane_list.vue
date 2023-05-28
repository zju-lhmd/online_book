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
                        <el-text style="font-size: large;margin-right: 10px;">始</el-text>
                        <el-input v-model="plane_search.start_location" style="width: 15%;caret-color: auto;" />
                        <el-button type="primary" circle style="margin: 0px 10px 0px 10px;" @click="swap_location">
                            <el-icon><Switch /></el-icon>
                        </el-button>
                        <el-text style="font-size: large;margin: 0px 10px 0px 10px;">终</el-text>
                        <el-input v-model="plane_search.end_location" style="width: 15%;caret-color: auto;" />
                        <el-text style="font-size: large;margin: 0px 10px 0px 10px;">航班公司</el-text>
                        <el-input v-model="plane_search.company" style="width: 15%;caret-color: auto;" />
                        <el-text style="font-size: large;margin: 0px 10px 0px 10px;">航班日期</el-text>
                        <el-date-picker v-model="plane_search.date" type="date" :disabled-date="disabledDate"
                            placeholder="Pick a date" style="width: 15%" />
                        <RouterLink to=/component/plane_list>
                            <el-button type="primary" style="margin-left: 20px;width: 60px;"
                                @click="on_plane_Submit">查询</el-button>
                        </RouterLink>
                    </el-row>

                    <!-- 航班排序按钮 -->
                    <el-row type="flex" justify="center" style="margin: 20px 0px 20px 0px;">
                        <el-button type="primary" plain class="sort_button" @click="on_price_change" >
                            <div v-if="plane_sort.price_sort">价格(由高到低)</div>
                            <div v-else="">价格(由低到高)</div>
                        </el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_time_change" >
                            <div v-if="plane_sort.time_sort">时间(由晚到早)</div>
                            <div v-else="">时间(由早到晚)</div>
                        </el-button>

                        <el-button type="primary" plain class="sort_button" @click="on_direct_change">
                            <div v-if="plane_sort.direct_only">仅直飞</div>
                            <div v-else="">直飞与转机</div>
                        </el-button>
                    </el-row>

                    <li v-for="plane_data in plane.slice((page - 1) * pageSize, page * pageSize)" :key="plane_data[0].price" class="list-item-target" >
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
                                    <el-icon style="font-size: large;color: black;margin: 0px 10px 0px 10px;"><Right /></el-icon>
                                    <el-text style="font-size: large;color: black;">{{ plane_.end_location }}</el-text>
                                    <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{plane_.start_time.toLocaleDateString()}}  {{plane_.start_time.toLocaleTimeString()}}</el-text>
                                    <el-icon style="font-size: large;color: black;margin: 0px 10px 0px 10px;"><Right /></el-icon>
                                    <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{plane_.end_time.toLocaleDateString()}}  {{plane_.end_time.toLocaleTimeString()}}</el-text>
                                </div>
                                <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">机票剩余量</el-text>
                                <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{ plane_data[0].stock }}</el-text>
                            </el-col>

                            <el-col class="right" :span="4">
                                <el-space direction="vertical">
                                    <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">总价</el-text>
                                    <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{ plane_data[0].price }}</el-text>
                                    <el-button type="primary">订购</el-button>
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
                    @size-change="handleSizeChange"/>
                </el-col>

                <el-col :span="7" style="padding-top: 20px;">
                    <el-test style="font-size: large;">
                        特价航班
                    </el-test>
                    <li v-for="plane_data in special_plane" class="list-item-target">
                        <el-row class="card-item-wrap">
                            <el-col class="left" :span="3">
                                <div v-for="plane_company in plane_data" style="height: 50%;">
                                    <!-- 插入图标 -->
                                    <el-text style="color: black;">{{ plane_company.company }}</el-text>
                                </div>
                            </el-col>

                            <el-col class="middle" :span="16">
                                <div v-for="plane_ in plane_data" style="height: 40%;">
                                    <!-- 插入图标 -->
                                    <el-text style="font-size: large;color: black;">{{ plane_.start_location }}</el-text>
                                    <el-icon style="font-size: large;color: black;margin: 0px 5px 0px 5px;"><Right /></el-icon>
                                    <el-text style="font-size: large;color: black;">{{ plane_.end_location }}</el-text>
                                    <br/>
                                    <el-text style="font-size: large;color: black;margin: 0px 5px 0px 5px;">{{plane_.start_time.toLocaleTimeString()}}</el-text>
                                    <el-icon style="font-size: large;color: black;margin: 0px 10px 0px 10px;"><Right /></el-icon>
                                    <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{plane_.end_time.toLocaleTimeString()}}</el-text>
                                </div>
                                <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">机票剩余量</el-text>
                                <el-text style="font-size: large;color: black;margin: 0px 10px 0px 10px;">{{ plane_data[0].stock }}</el-text>
                            </el-col>

                            <el-col class="right" :span="5">
                                <el-space direction="vertical">
                                    <el-text style="font-size: large;color: black;">总价</el-text>
                                    <el-text style="font-size: large;color: black;">{{ plane_data[0].price }}</el-text>
                                    <el-button type="primary">订购</el-button>
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
import { plane, plane_sort , special_plane, plane_init , direct_change } from "@/components/plane/plane_list"

const page = ref(1)
const total = ref(plane.length)
const pageSize = ref(4)

//分页函数
const handleSizeChange = (val:number) => {
  pageSize.value = val;

}
const handleCurrentChange = (val:number) => {
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

    plane_init();//调用处理处理数据
    page.value=1
    total.value=plane.length

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
    direct_change();
    sort(1)
}

const sort=(type:number)=>{
    console.log(plane[0][0].price)
    plane.sort((n1,n2)=>{
        if(type===1){
            if(n1[0].price!=n2[0].price){
                if(plane_sort.price_sort)
                    return n2[0].price-n1[0].price;
                else return n1[0].price-n2[0].price;
            }else{
                if(plane_sort.time_sort)
                    return n2[0].start_time.getTime()-n1[0].start_time.getTime();
                else return n1[0].start_time.getTime()-n2[0].start_time.getTime();
            }
        }else{
            if(n1[0].start_time!=n2[0].start_time){
                if(plane_sort.time_sort)
                    return n2[0].start_time.getTime()-n1[0].start_time.getTime();
                else return n1[0].start_time.getTime()-n2[0].start_time.getTime();
            }else{
                if(plane_sort.price_sort)
                    return n2[0].price-n1[0].price;
                else return n1[0].price-n2[0].price;
            }
        }
    })
    console.log(plane[0][0].price)
    page.value=0;
    page.value=1;
    total.value=plane.length;
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
    width: 180px;
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
}

</style>
  