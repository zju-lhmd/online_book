<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/admin_search_hotel' }">酒店查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/admin_list_hotel' }">酒店列表</el-breadcrumb-item>
    </el-breadcrumb>


    <el-col style="margin: 50px 150px 100px 150px;caret-color: transparent;">
        <el-row class="Title" justify="center">
            酒店信息查询
        </el-row>
        <el-row class="Rooms" justify="center">
            <el-col v-for="(hotel, index,key) in hotel_datas.slice((page - 1) * pageSize, page * pageSize)" :key="hotel.hotel_id" :span="12" style="border: 2px solid #dadfe6;">
                <el-row>
                    <el-col :span="18" style="margin: 10px;border-right: 2px solid #dadfe6;">
                        <span slot="label" style="margin:10px 20px 10px 0px;font-size: 20px;">酒店名称</span>
                        <el-text style="font-size: 20px;color: black;">{{ hotel.name }}</el-text>
                        <br/>
                        
                        <span slot="label" style="margin:10px 20px 10px 0px;font-size: 20px;">酒店地址</span>
                        <el-text style="font-size: 20px;color: black;">{{ hotel.location }}</el-text>
                        <br/>

                        <span slot="label" style="margin:10px 20px 10px 0px;font-size: 20px;">联系电话</span>
                        <el-text style="font-size: 20px;color: black;">{{ hotel.phone }}</el-text>
                        <br/>

                        <span slot="label" style="margin:10px 20px 10px 0px;font-size: 20px;">酒店星级</span>
                        <el-rate v-model="hotel.star" disabled/>
                        <br/>
                    </el-col>
                    <el-col :span="4"  style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                        <el-button type="primary"  @click="on_modify_hotel(index)" style="margin-bottom: 20px;">修改</el-button>
                        <el-button type="primary"  @click="on_delete_hotel_Submit(index)">删除</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
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
</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { hotel_datas , hotel_detail } from "@/components/booking_admin/hotel_info"
import router from '@/router';
import axios from 'axios';

const on_modify_hotel=(index:number)=>{
    var hotel_id={
        hotel_id:hotel_datas[index].hotel_id
    }
    axios.post('/get_hotel_detail',hotel_id).then(function(response){
        hotel_detail(response.data)
        router.push({path:'/component/admin_modify_hotel'})
    })
    //从后端获取改酒店信息和房型 放入rooms
}

const on_delete_hotel_Submit=(index:number)=>{
    var hotel=hotel_datas[index]//传回后端删除
    var hotel_id={
        hotel_id:hotel.hotel_id
    }
    axios.post('/delete_hotel',hotel_id).then(function(response){
        
    })
    hotel_datas.splice(index,1)
    page.value=2;
    page.value=1;
    total.value=hotel_datas.length
}

const page = ref(1)
const total = ref(hotel_datas.length)
const pageSize = ref(8)
//分页函数
const handleSizeChange = (val:number) => {
  pageSize.value = val;

}
const handleCurrentChange = (val:number) => {
  page.value = val;
}

</script>

<style scoped>
.Title {
    border: 2px solid #dadfe6;
    padding: 10px 50px 10px 50px;
    background: #f5f7fa;
    display: flex;
    width: 100%;
    min-height: 30px;
    font-size: 20px;
}
</style>
  