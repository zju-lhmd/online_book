<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/market' }">商品查询</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="Page">
        <el-col>
            <el-row style="margin-top: 20px;">
                <el-col :span="8" :offset="4">
                    <el-text style="font-size: 20px;margin-right: 20px;color: black;">商品名称</el-text>
                    <el-input v-model="good_search.name" style="width: calc(100% - 120px );caret-color: auto;" />
                </el-col>

                <el-col :span="8">
                    <el-text style="font-size: 20px;margin-right: 20px;color: black;">商品类别</el-text>
                    <el-select v-model="category_value" placeholder="Select" clearable>
                        <el-option v-for="item in category" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-col>

                <el-button type="primary" style="margin-left: 20px;width: 100px;" @click="on_good_Submit"
                    :span="4">查询</el-button>
            </el-row>

            <el-row :gutter="10" class="Good">

                <el-col v-for="(good,key) in goods_info.slice((page - 1) * pageSize, page * pageSize)" :key="good.good_id" :span="12" style="border: 2px solid #dadfe6;">
                    <el-row style="margin: 10px;">
                        <el-col :span="8" style="border-right: 2px solid #dadfe6;">
                            插入图片
                        </el-col>
                        <el-col :span="10">
                            <el-text style="font-size: 20px;color: black;margin-right: 20px;">名称</el-text>
                            <el-text style="font-size: 20px;color: black;">{{ good.name }}</el-text>
                            <br />
                            <el-text style="font-size: 20px;color: black;margin-right: 20px;">产地</el-text>
                            <el-text style="font-size: 20px;color: black;">{{ good.location }}</el-text>
                            <br />
                            <el-text style="font-size: 20px;color: black;margin-right: 20px;">销量</el-text>
                            <el-text style="font-size: 20px;color: black;">{{ good.sales }}</el-text>
                            <br />

                        </el-col>
                        <el-col :span="6"
                            style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                            <el-text style="font-size: 20px;color: black;">价格</el-text>
                            <br />
                            <el-text style="font-size: 20px;color: black;">{{ good.price * good.discount }}元</el-text>
                            <br />
                            <RouterLink to="/component/market_detail" style="margin-bottom: 10px;">
                                <el-button type="primary" @click="Get_detail(good)">查看详情</el-button>
                            </RouterLink>
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
    </div>
</template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { good_search, goods_info, Get_data, Get_detail } from '@/components/market/market'
import axios from 'axios';

const category_value = ref('')
const category = [
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

const on_good_Submit = () => {
    good_search.category = category_value.value
    axios.post('http://localhost:3400/search_good', good_search).then(function (response) {
        Get_data(response.data)
    })
}

const page = ref(1)
const total = ref(goods_info.length)
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
#Page {
    background-color: #f5f7fa;
    caret-color: transparent;
}

.Good {
    border: 2px solid #dadfe6;
    background: #f5f7fa;
    display: flex;
    margin-top: 20px;
}
</style>
  