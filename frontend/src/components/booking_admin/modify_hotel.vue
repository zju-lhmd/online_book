<template>
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/admin_search_hotel' }">酒店查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/admin_list_hotel' }">酒店列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/admin_modify_hotel' }">信息修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 300px 100px 200px;">
        <el-row class="Title" justify="center">
            酒店信息修改
        </el-row>
        <el-row class="card-item-wrap">
            <el-col :span="12">
                <el-form :model="hotel_data" label-width="80px" style="text-align: center;">
                    
                    <el-form-item>
                        <span slot="label" style="margin-right: 20px;font-size: large;">酒店名称</span>
                        <el-input v-model="hotel_data.name"  style="width: 70%;"/>
                    </el-form-item>

                    <el-form-item >
                        <span slot="label" style="margin-right: 20px;font-size: large;">酒店地址</span>
                        <el-input v-model="hotel_data.location"  style="width: 70%;"/>
                    </el-form-item>

                    <el-form-item>
                        <span slot="label" style="margin-right: 20px;font-size: large;">联系电话</span>
                        <el-input v-model="hotel_data.location"  style="width: 70%;"/>
                    </el-form-item>

                    <el-form-item >
                        <span slot="label" style="margin-right: 20px;font-size: large;">酒店星级</span>
                        <el-rate v-model="hotel_data.star" />
                    </el-form-item>

                    <el-form-item >
                        <span slot="label" style="margin-right: 20px;font-size: large;">总体折扣</span>
                        <el-input v-model="hotel_data.discount" style="width: 70%;"/>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col :span="10">
                <el-form :model="hotel_data" label-width="80px" style="text-align: center;">
                    <el-form-item >
                        <span slot="label" style="margin-right: 20px;font-size: large;">酒店描述</span>
                        <el-input v-model="hotel_data.description" :rows="8" type="textarea" placeholder="输入酒店简述" />
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="Title" justify="center">
            房间信息
            <el-button type="primary" circle style="margin-left: 20px;" @click="on_add_room">
                <el-icon><Plus /></el-icon>
            </el-button>
        </el-row>
        <el-row class="Rooms" justify="center">
            <el-col v-for="(room,index) in rooms" :span="12" style="border: 2px solid #dadfe6;" >
                <el-form :model="room" label-width="80px" style="text-align: center;">
                    <el-form-item>
                        <span slot="label" style="margin-right: 20px;font-size: large;">房型</span>
                        <el-input v-model="room.type"  style="width: 70%;"/>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" style="margin-right: 20px;font-size: large;">价格</span>
                        <el-input v-model="room.price"  style="width: 70%;"/>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label" style="margin-right: 20px;font-size: large;">余量</span>
                        <el-input v-model="room.stock"  style="width: 70%;"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 20%;font-size: large;height: 100%;" @click="on_delete_room(index)">删除</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="button" justify="center">
            <el-button type="primary" style="width: 20%;font-size: large;height: 100%;" @click="on_add_hotel_Submit">提交</el-button>
        </el-row>
    </el-col>
</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { hotel_data, rooms } from "@/components/booking_admin/hotel_info"

interface Room {
    type: string,
    price: number,
    stock: number,
}

const on_add_room=()=>{
    let room:Room={
        type: "",
        price: 0,
        stock: 0,
    }
    rooms.push(room)
}
let index=ref(0)
const on_delete_room=(index:number)=>{
    console.log(index)
    rooms.splice(index,1)
}

const on_add_hotel_Submit=()=>{

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
    border: 2px solid #dadfe6;
    padding: 30px 50px 20px 50px;
    background: #f5f7fa;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    min-height: 300px;
}
.Rooms{
    border: 2px solid #dadfe6;
    padding: 10px 50px 10px 50px;
    background: #f5f7fa;
    display: flex;
    width: 100%;
    font-size: 20px;
}

.button{
    border: 2px solid #dadfe6;
    padding: 10px 50px 10px 50px;
    background: #f5f7fa;
    display: flex;
    width: 100%;
    font-size: 30px;
}

</style>