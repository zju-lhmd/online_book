<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/admin_search_plane' }">航班查询</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/admin_list_plane' }">航班列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 150px 100px 150px;caret-color: transparent;">
        <el-row class="Title" justify="center">
            航班信息
        </el-row>
        <el-row class="Rooms" justify="center">
            <el-col v-for="(plane, index,key) in plane_datas.slice((page - 1) * pageSize, page * pageSize)" :key="plane.plane_id" :span="12" style="border: 2px solid #dadfe6;">
                <el-row>
                    <el-col :span="18" style="margin: 10px;border-right: 2px solid #dadfe6;">
                        <span slot="label" style="margin:10px 5px 10px 0px;font-size: 20px;">航空公司</span>
                        <el-text style="font-size: 20px;color: black;">{{ plane.company }}</el-text>
                        <br/>
                        
                        <span slot="label" style="margin:10px 25px 10px 0px;font-size: 20px;">出发地</span>
                        <el-text style="font-size: 20px;color: black;">{{ plane.start_location }}</el-text>
                        <br/>

                        <span slot="label" style="margin:10px 25px 10px 0px;font-size: 20px;">目的地</span>
                        <el-text style="font-size: 20px;color: black;">{{ plane.end_location }}</el-text>
                        <br/>

                        <span slot="label" style="margin:10px 5px 10px 0px;font-size: 20px;">起飞时间</span>
                        <br/>
                        <el-text style="font-size: 20px;color: black;">{{ plane.start_time.toLocaleDateString() }} {{ plane.start_time.toLocaleTimeString() }}</el-text>
                        <br/>

                        <span slot="label" style="margin:10px 5px 10px 0px;font-size: 20px;">到达时间</span>
                        <br/>
                        <el-text style="font-size: 20px;color: black;">{{ plane.end_time.toLocaleDateString() }} {{ plane.end_time.toLocaleTimeString() }}</el-text>
                        <br/>

                    </el-col>
                    <el-col :span="4"  style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                        <RouterLink to="/component/admin_modify_plane">
                            <el-button type="primary"  @click="on_modify_plane(index)" style="margin-bottom: 20px;">修改</el-button>
                        </RouterLink>
                        <el-button type="primary"  @click="on_delete_plane_Submit(index)">删除</el-button>
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
import { planes , modify_plane } from "@/components/booking_admin/plane_info"
import axios from 'axios';
let plane_datas=ref(planes)
const on_modify_plane=(index:number)=>{
    modify_plane(index)
}

const on_delete_plane_Submit=(index:number)=>{
    var plane=plane_datas.value[index]//传回后端删除
    var plane_id={
        plane_id:plane.plane_id
    }
    axios.post('/delete_plane',plane_id).then(function(response){
        
    })
    plane_datas.value.splice(index,1)
    total.value=plane_datas.value.length
}
const page = ref(1)
const total = ref(plane_datas.value.length)
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
  