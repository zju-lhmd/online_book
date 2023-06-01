<template>
<el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/admin_search_plane' }">航班查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/admin_list_plane' }">航班列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/admin_modify_plane' }">信息修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 200px 100px 200px;caret-color: transparent;">
        <el-row class="Title" justify="center">
            航班发布
        </el-row>
        <el-row class="card-item-wrap">
            <el-col :span="16" :offset="4">
                <el-form :model="plane_data" style="text-align: center;margin: 10px 50px 10px 50px;">

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 25px;font-size: 15px;">出发地</span>
                            <el-input v-model="plane_data.start_location"
                                style="width: calc(100% - 70px);caret-color: auto;" />
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 25px;font-size: 15px;">目的地</span>
                            <el-input v-model="plane_data.end_location"
                                style="width: calc(100% - 70px);caret-color: auto;" />
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">航班公司</span>
                            <el-input v-model="plane_data.company" style="width: calc(100% - 70px);caret-color: auto;" />
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">起飞时间</span>
                            <el-date-picker v-model="plane_data.start_time" type="datetime"
                                placeholder="Select date and time" style="width: calc(100% - 70px);" />
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">到达时间</span>
                            <el-date-picker v-model="plane_data.end_time" type="datetime" placeholder="Select date and time"
                                style="width: calc(100% - 70px);" />
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 40px;font-size: 15px;">价格</span>
                            <el-input v-model="plane_data.price" style="width: calc(100% - 70px);caret-color: auto;" />
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 40px;font-size: 15px;">折扣</span>
                            <el-input v-model="plane_data.discount" style="width: calc(100% - 70px);caret-color: auto;" />
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 40px;font-size: 15px;">余量</span>
                            <el-input v-model="plane_data.stock" style="width: calc(100% - 70px);" />
                        </el-col>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
        <el-row class="button" justify="center">
            <el-button type="primary" style="width: 20%;font-size: large;height: 100%;"
                @click="on_add_plane_Submit">提交</el-button>
        </el-row>
    </el-col>
</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { plane_data } from "@/components/booking_admin/plane_info"
import axios from 'axios';

const on_add_plane_Submit=()=>{
    axios.post('http://localhost:3400/add_plane',plane_data).then(function(response){
        
    })
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
    background: #f5f7fa;
    display: flex;
    box-sizing: border-box;
    min-height: 300px;
}

.button {
    border: 2px solid #dadfe6;
    padding: 10px 50px 10px 50px;
    background: #f5f7fa;
    display: flex;
    width: 100%;
    font-size: 30px;
}

</style>