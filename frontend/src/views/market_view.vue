R<template>

    <el-col >
        <el-row type="flex" justify="center">
            <!-- 左侧栏
                |-商品
                |-酒店
                    |--酒店预订
                    |--历史查询
                |-航班
                    |--航班预订
                    |--历史查询
                |-卖家管理（当登录用户为卖家）
                    |--商品发布
                    |--商品修改
                |-管理员（当登录用户为管理员）
                    |--酒店
                    |--酒店发布
                    |--酒店修改
                    |--航班
                    |--航班发布
                    |--航班修改
            -->
            <el-col :span="3" class="hidden-sm-and-down">
                <el-menu style="text-align: left;" default-active="this.$routher.path" router="true">
                    
                    <el-menu-item class="left_item" index="/component/market">
                        商品
                    </el-menu-item>
                    
                    <el-sub-menu index="2">
                        <template #title>
                            <span class="left_item">酒店</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item class="left_item" index="/component/hotel_search">酒店预订</el-menu-item>
                            <el-menu-item class="left_item" index="/component/hotel_booking_history">历史查询</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>

                    <el-sub-menu index="3">
                        <template #title>
                            <span class="left_item">航班</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item class="left_item" index="/component/plane_search">航班预订</el-menu-item>
                            <el-menu-item class="left_item" index="/component/plane_booking_history">历史查询</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>

                    <el-sub-menu index="4">
                        <template #title>
                            <span class="left_item">卖家管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item class="left_item" index="/component/seller_add_good">商品发布</el-menu-item>
                            <el-menu-item class="left_item" index="/component/seller_modify_good">商品修改</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    
                    <el-sub-menu index="5">
                        <template #title>
                            <span class="left_item">预订服务管理员</span>
                        </template>

                        <el-sub-menu index="5.1">
                            <template #title>
                                <span class="left_item">酒店</span>
                            </template>
                            <el-menu-item-group index="5.1.1">
                                <el-menu-item class="left_item" index="/component/admin_add_hotel">酒店发布</el-menu-item>
                                <el-menu-item class="left_item" index="/component/admin_modify_hotel">酒店修改</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>

                        <el-sub-menu index="5.2">
                            <template #title>
                                <span class="left_item">航班</span>
                            </template>
                            <el-menu-item-group index="5.2.1">
                                <el-menu-item class="left_item" index="/component/admin_add_plane">航班发布</el-menu-item>
                                <el-menu-item class="left_item" index="/component/admin_modify_plane">航班修改</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>

                    </el-sub-menu>

                </el-menu>

            </el-col>

            <!-- right-navbar -->
            <el-col style="padding-left: 10px;" :span="21">
                
                <RouterView></RouterView>
            </el-col>

        </el-row>
    </el-col>
    
</template>
  

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.left_item{
    font-size: large;
    padding-right : 0px;
}


</style>
  