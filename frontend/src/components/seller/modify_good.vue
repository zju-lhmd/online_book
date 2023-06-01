<template>

<el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/seller_list_good' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/component/seller_modify_good' }">信息修改</el-breadcrumb-item>
    </el-breadcrumb>

    <el-col style="margin: 50px 200px 100px 200px;caret-color: transparent;">
        <el-row class="Title" justify="center">
            商品发布
        </el-row>
        <el-row class="card-item-wrap">
            <el-col :span="12">
                <el-form :model="good_detail" label-width="15%" style="text-align: center;">
                    
                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">商品名称</span>
                            <el-input v-model="good_detail.name"  style="width: calc(100% - 70px);caret-color: auto;"/>
                        </el-col>
                    </el-form-item>

                    <el-form-item >
                        <span slot="label" style="margin-right: 10px;font-size: 15px;">商品类别</span>
                        <el-input v-model="good_detail.location"  style="width: calc(100% - 70px);caret-color: auto;"/>
                    </el-form-item>

                    <el-form-item>
                        <el-col>
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">商品产地</span>
                            <el-select v-model="category_value" placeholder="Select" clearable style="width: calc(100% - 70px)">
                                <el-option v-for="item in category" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </el-col>
                    </el-form-item>

                    <el-form-item >
                        <el-col style="text-align: left;">
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">商品价格</span>
                            <el-input v-model="good_detail.price" style="width: calc(100% - 70px);caret-color: auto;"/>
                        </el-col>
                    </el-form-item>

                    <el-form-item >
                        <el-col>
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">商品折扣</span>
                            <el-input v-model="good_detail.discount" style="width: calc(100% - 70px);caret-color: auto;"/>
                        </el-col>
                    </el-form-item>

                    <el-form-item >
                        <el-col>
                            <span slot="label" style="margin-right: 10px;font-size: 15px;">商品数量</span>
                            <el-input v-model="good_detail.stock" style="width: calc(100% - 70px);caret-color: auto;"/>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col :span="10">
                <el-form :model="good_detail" label-width="20%" style="text-align: center;">
                    <el-form-item >
                        <span slot="label" style="margin-right: 20px;font-size: 15px;">商品描述</span>
                        <el-input v-model="good_detail.description" :rows="8" type="textarea" placeholder="输入酒店简述" style="caret-color: auto;" />
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="button" justify="center">
            <el-button type="primary" style="width: 20%;font-size: large;height: 100%;" @click="on_add_good_Submit">提交</el-button>
        </el-row>
    </el-col>

</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { good_detail , Good_Init } from '@/components/seller/seller';
import axios from 'axios';

const category_value = ref('')
const category=[
    {
        value: '日常用品',
        label: '日常用品',
    },
    {
        value: '食品生鲜',
        label: '食品生鲜',
    },
    {
        value: '服装时尚',
        label: '服装时尚',
    },
    {
        value: '电子产品',
        label: '电子产品',
    },
    {
        value: '医药健康',
        label: '医药健康',
    },
    {
        value: '家具家电',
        label: '家具家电',
    },
    {
        value: '运动户外',
        label: '运动户外',
    },
    {
        value: '萌宠潮玩',
        label: '萌宠潮玩',
    },
    {
        value: '其他',
        label: '其他',
    },
]

const on_add_good_Submit=()=>{
    good_detail.category=category_value.value
    var data={
        user_id:1,
        data:good_detail
    }
    axios.post('http://localhost:3400/add_good',data).then(function(response){
        
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
    padding: 30px 0px 20px 0px;
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
  