<template>
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/admin_add_hotel' }">酒店发布</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 300px 100px 200px;">
        <el-row class="Title" justify="center">
            酒店信息
        </el-row>
        <el-row class="card-item-wrap">
            <el-col :span="12">
                <el-form :model="hotel_data" label-width="80px" style="text-align: center;">
                    <el-form-item>
                        <span slot="label" style="margin-right: 20px;font-size: large;">酒店名称</span>
                        <el-input v-model="hotel_data.name" placeholder="请输入" style="width: 70%;"/>
                    </el-form-item>

                    <el-form-item >
                        <span slot="label" style="margin-right: 20px;font-size: large;">酒店地址</span>
                        <el-input v-model="hotel_data.location" placeholder="请输入" style="width: 70%;"/>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label" style="margin-right: 20px;font-size: large;">联系电话</span>
                        <el-input v-model="hotel_data.location" placeholder="请输入" style="width: 70%;"/>
                    </el-form-item>

                    <el-form-item label="酒店星级">
                        <el-rate v-model="hotel_data.star" />
                    </el-form-item>

                    <el-form-item label="总体折扣">
                        <el-input v-model="hotel_data.discount" />
                    </el-form-item>

                    <el-form-item>
                        
                    </el-form-item>

                </el-form>
            </el-col>

            <el-col :span="10">

            </el-col>
        </el-row>
    </el-col>
</template>
  

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { hotel_data, rooms } from "@/components/booking_admin/hotel_info"

interface Room {
    type: string,
    price: number,
    stock: number,
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

.card-item-wrap {
    padding: 10px 50px 20px 50px;
    background: #f5f7fa;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    min-height: 300px;
}

</style>