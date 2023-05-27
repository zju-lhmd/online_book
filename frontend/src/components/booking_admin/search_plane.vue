<template>
    <el-breadcrumb separator=">" style="font-size: large;">
        <el-breadcrumb-item :to="{ path: '/component/admin_search_plane' }">航班查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="center" id="Title">
        航班查询查询
    </el-row>
    
    <div id="plane_search">
        <el-form :model="plane_search" label-width="100px" style="text-align: center;">
            <el-form-item label="出发地">
                <el-input v-model="plane_search.start_location" />
            </el-form-item>

            <el-form-item label="目的地">
                <el-input v-model="plane_search.end_location" />
            </el-form-item>

            <el-form-item label="航班公司">
                <el-input v-model="plane_search.company" />
            </el-form-item>

            <el-form-item label="小于时间点">
                <el-date-picker v-model="plane_search.time" type="datetime" placeholder="Select date and time" />
            </el-form-item>
            
            <el-form-item>
                <RouterLink to=/component/admin_list_plane>
                    <el-button type="primary" style="width: 120px;" @click="on_search_plane_Submit">查询</el-button>
                </RouterLink>
            </el-form-item>

        </el-form>
    </div>

</template>
    

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
let plane_search=ref({
    start_location:"",
    end_location:"",
    company:"",
    time:Date(),
})

const on_search_plane_Submit=()=>{

}

</script>

<style scoped>

#plane_search {
    width: 300px;
    margin:auto;
    margin-top: 20px;
    
}
#Title{
    width: 300px;
    font-size: 30px;
    margin:auto;
    margin-top: 50px;

}
</style>
      