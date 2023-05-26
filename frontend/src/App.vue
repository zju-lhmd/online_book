<template >
  <header id="Header">
    <el-row type="flex" justify="center">
			<el-col :xl="21" :lg="23" :md="25" :sm="27" :xs="27">
				
        <div style="padding-top: 15px">
          <el-row style="margin-right:10px">
						
            <el-col :span="6">
							<!-- <img :src=" " style="height: 55px" /> 插入图标-->
						</el-col>
						
            <el-col id="Title" :span="18" style="padding-top: 20px; text-align: left">
              在线支付系统
            </el-col>

						<el-col :span="18" style="padding-top: 20px; text-align: right;">

              <!-- 商品返回界面，点击进入模块三 商品购买搜索界面，酒店、航班订购需先点击这个 -->
              <RouterLink to="/market_view">
                <el-icon :size="30">
                  <ShoppingCart style="width: 1em; height: 1em; margin-right: 8px"/>
                </el-icon>
              </RouterLink>

              <!-- 用户登录界面进入按钮，点击进入模块一个人用户界面 -->
              <RouterLink to="/user_index">
                <el-icon :size="30">
                  <User style="width: 1em; height: 1em; margin-right: 8px"/>
                </el-icon>
              </RouterLink>
						</el-col>

					</el-row>
        </div>

        <el-divider id="header_divider"></el-divider>

      </el-col>
    </el-row>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>

#Header {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 10px;
	margin-bottom: 50px;
}

#Title{
  position: absolute;
  font-size: 18px;
}

#header_divider{
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  background-color: #dcdfe6;
  position: relative;
}
</style>
