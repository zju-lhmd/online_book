<template>
    <el-breadcrumb separator=">" style="font-size: large;caret-color: transparent;">
        <el-breadcrumb-item :to="{ path: '/component/admin_search_plane' }">航班查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="center" id="Title">
        航班查询查询
    </el-row>
    
    <div id="plane_search">
        <el-form :model="plane_search" label-width="100px" style="text-align: center;">
            <el-form-item label="出发地">
                <el-input v-model="plane_search.start_location" style="caret-color: auto;"/>
            </el-form-item>

            <el-form-item label="目的地">
                <el-input v-model="plane_search.end_location" style="caret-color: auto;"/>
            </el-form-item>

            <el-form-item label="航班公司">
                <el-input v-model="plane_search.company" style="caret-color: auto;"/>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" style="width: 120px;" @click="on_search_plane_Submit">查询</el-button>
            </el-form-item>

        </el-form>
    </div>

</template>
    

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { plane_list_init } from '@/components/booking_admin/plane_info'
import router from '@/router';
import axios from 'axios';

let plane_search=ref({
    start_location:"",
    end_location:"",
    company:"",
})

const on_search_plane_Submit=()=>{
    axios.post('/plane_search',plane_search.value).then(function(response){
        plane_list_init(response.data);
        router.push({path:'/component/admin_list_plane'})
    })
}

</script>

<style scoped>

#plane_search {
    width: 300px;
    margin:auto;
    margin-top: 20px;
    caret-color: transparent;
}
#Title{
    width: 300px;
    font-size: 30px;
    margin:auto;
    margin-top: 50px;
    caret-color: transparent;
}
</style>
      