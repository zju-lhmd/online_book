<template>
    <div class="main-content">
      <el-menu class="el-menu-vertical-demo navi" text-color="#d0d0d0" background-color="#444c54"
        active-text-color="rgb(130, 194, 247)" :router=true @open="handleOpen" @close="handleClose">
        <el-affix :offset="100">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator 1</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="Orders/page1">
                item one
              </el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <document />
            </el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-affix>
      </el-menu>
      <div class="content-window">
        <div class="content-window-card">
          <RouterView />
        </div>
        <div class="footer">
          页脚：在线支付系统
        </div>
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
  import { RouterView } from 'vue-router';
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
    
  <style scoped>
  .main-content {
    display: flex;
    /* 相对自己的main-content-box进行分配 */
    height: 100%;
    min-height: calc(100vh - 90px);
  }
  
  .navi {
    bottom: 0;
    top: 0;
    width: 300px;
    padding-left: 20px;
    /* height: calc(100% - ); */
  
  }
  
  .content-window {
    width: calc(100% - 80px);
    background-color: #f7f7f7;
    padding: 20px 40px;
  }
  
  .content-window-card {
    background-color: #fff;
    padding: 40px 80px;
    border-radius: 5px;
    margin-right: 200px;
    box-shadow: 1px 1px 5px 5px rgba(100, 100, 100, 0.1);
  }
  
  .footer {
    margin-top: 20px;
    display: flex;
    margin-left: auto;
    font-size: 12px;
    color: #aaaaaa;
  }
  </style>