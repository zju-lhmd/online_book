<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/seller_list_good' }">商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 150px 100px 150px;caret-color: transparent;">
        <el-row class="Title" justify="center">
            已发布商品信息
        </el-row>
        <el-row class="Rooms" justify="center">
            <el-col v-for="(good,index,key) in goods_info.slice((page - 1) * pageSize, page * pageSize)" :key="good.good_id" :span="12" style="border: 2px solid #dadfe6;">
                <el-row>
                    <el-col :span="18" style="margin: 10px;border-right: 2px solid #dadfe6;">
                        <span slot="label" style="margin:10px 10px 10px 0px;font-size: 20px;">商品名称:</span>
                        <el-text style="font-size: 20px;color: black;">{{ good.name }}</el-text>
                        <br/>
                        
                        <span slot="label" style="margin:10px 10px 10px 0px;font-size: 20px;">商品类别:</span>
                        <el-text style="font-size: 20px;color: black;">{{ good.category }}</el-text>
                        <br/>

                        <span slot="label" style="margin:10px 10px 10px 0px;font-size: 20px;">商品产地:</span>
                        <el-text style="font-size: 20px;color: black;">{{ good.location }}</el-text>
                        <br/>
                    </el-col>
                    <el-col :span="4"  style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                        <RouterLink to="/component/seller_modify_good">
                            <el-button type="primary"  @click="Get_detail(good)" style="margin-bottom: 20px;">修改</el-button>
                        </RouterLink>
                        <el-button type="primary"  @click="on_delete_hotel_good(index)">删除</el-button>
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
import { goods , Get_detail } from '@/components/seller/seller'
import axios from 'axios';

let goods_info=ref(goods)
const on_delete_hotel_good=(index:number)=>{
    var good=goods_info.value[index]//传回后端删除
    var data={
        user_id:1,
        good_id:good.good_id
    }
    axios.post('/delete_good',data).then(function(response){
        
    })
    goods_info.value.splice(index,1)
    total.value=goods_info.value.length
}

const page = ref(1)
const total = ref(goods_info.value.length)
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

.Rooms{
    border: 2px solid #dadfe6;
    background: #f5f7fa;
    display: flex;
}

</style>
      