<template>
    <div class="main-content">
      <el-menu class="el-menu-vertical-demo navi" text-color="#d0d0d0" background-color="#444c54"
        active-text-color="rgb(130, 194, 247)" :router=true @open="handleOpen" @close="handleClose">
        <el-affix :offset="100">

          <el-menu-item index="/component/market">
            <el-icon><ShoppingTrolley /></el-icon>
            <span>商品</span>
          </el-menu-item>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><OfficeBuilding /></el-icon>
              <span>酒店</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/component/hotel_search">酒店预订</el-menu-item>
              <el-menu-item index="/component/hotel_booking_history" @click="hotel_booking_history">历史查询</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon><Promotion /></el-icon>
              <span>航班</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/component/plane_search">航班预订</el-menu-item>
              <el-menu-item index="/component/plane_booking_history" @click="plane_booking_history">历史查询</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><Promotion /></el-icon>
              <span>卖家管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/component/seller_add_good">商品发布</el-menu-item>
              <el-menu-item index="/component/seller_modify_good">商品修改</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <el-icon><Promotion /></el-icon>
              <span>预订服务管理员</span>
            </template>

            <el-sub-menu index="5.1">
              <template #title>
                <span>酒店</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/component/admin_add_hotel" @click="on_add_hotel">酒店发布</el-menu-item>
                <el-menu-item index="/component/admin_search_hotel">酒店修改</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="5.2">
              <template #title>
                <span>航班</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/component/admin_add_plane" @click="on_add_plane">航班发布</el-menu-item>
                <el-menu-item index="/component/admin_search_plane">航班修改</el-menu-item>
              </el-menu-item-group>
              
            </el-sub-menu>
          </el-sub-menu>
          
        </el-affix>
      </el-menu>
      <!-- </el-affix> -->
      <div class="content-window">
        <div class="content-window-card">
          <RouterView />
        </div>
        <div class="footer">
          页脚：在线支付系统
        </div>
      </div>
    </div>
  </template>
  

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { hotel_order_Init , type Hotel_booking_history} from "@/components/hotel/hotel_booking_history"
import { plane_order_Init , type Plane_booking_data} from "@/components/plane/plane_booking_history"
import { hotel_init } from "@/components/booking_admin/hotel_info"
import { plane_init } from '@/components/booking_admin/plane_info';
import axios from "axios";

const hotel_booking_history=()=>{//查询酒店预订历史信息
  var data={
    user:1
  }
  axios.post('http://localhost:3400/get_hotel_booking_history',data).then(function(response){
    hotel_order_Init(response.data);
  })
}

const plane_booking_history=()=>{//查询航班预订历史信息
  var data={
    user:1
  }
  axios.post('http://localhost:3400/get_plane_booking_history',data).then(function(response){
    plane_order_Init(response.data);
  })
}

const on_add_hotel=()=>{
    hotel_init();
}

const on_add_plane=()=>{
    plane_init();
}

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>

<style scoped>
  .main-content {
    display: flex;
    /* 相对自己的main-content-box进行分配 */
    min-height: calc(100vh - 90px);
    height: 100%;
  }
  
  .navi {
    bottom: 0;
    top: 0;
    width: 300px;
    padding-left: 20px;
    /* height: calc(100% - ); */
  }
  
  .content-window {
    width: calc(100% - 80px);
    background-color: #f7f7f7;
    padding: 20px 40px;
  }
  
  .content-window-card {
    background-color: #fff;
    padding: 40px 80px;
    border-radius: 5px;
    margin-right: 200px;
    /* box-shadow: 1px 1px 5px 5px rgba(100, 100, 100, 0.1); */
  }
  
  .footer {
    margin-top: 20px;
    display: flex;
    margin-left: auto;
    font-size: 12px;
    color: #aaaaaa;
  }

</style>
  