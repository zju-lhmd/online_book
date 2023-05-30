<template>
  <!-- app.vue作为根路由出口，宽高为整个屏幕 -->
  <div id="app">
    <el-affix :offset="0">
      <el-menu :default-active="activeIndex" class="el-menu-demo upper-menu" mode="horizontal" @select="handleSelect"
        :router=true>
        <el-menu-item>
          <div class="title-icon">
            <el-image style="width: 65px; height: 65px" :src="paymentIcon" />
            <span class="title-text">在线支付系统</span>
          </div>
        </el-menu-item>
        <el-menu-item index="/Market">Marketing Center</el-menu-item>
        <el-menu-item index="/Orders">Order Management</el-menu-item>
        <el-menu-item index="4">More</el-menu-item>
        <div class="user-info">
          <el-menu-item index="5">
            <el-icon style="width: 20px;">
              <Bell />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="6" v-if="ifLogin">
            <div class="user-info-bar">
              <div>{{ "您好，" + userName }}</div>
              <el-avatar style="margin-left: 20px;"> user </el-avatar>
            </div>
          </el-menu-item>
          <el-menu-item v-else index="7">
            <el-button type="primary" plain>Log in</el-button>
          </el-menu-item>
        </div>
      </el-menu>
    </el-affix>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import paymentIcon from './assets/payment-icon.svg'
import {
  Bell
} from '@element-plus/icons-vue'
const activeIndex: Ref<string> = ref('/Market');
const userName: Ref<string> = ref('test');
const ifLogin: Ref<boolean> = ref(true);
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(keyPath);
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.upper-menu {
  height: 90px;
}

.title-icon {
  margin-left: 10px;
  margin-right: 55px;
  display: flex;
}

.title-text {
  line-height: 65px;
  margin-left: 13px;
  font-size: 17px;
  font-weight: 600;
}

.user-info {
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.user-info-bar {
  display: flex;
  align-items: center;
}
</style>
