import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '@/App.vue'
import user_indexVue from '@/components/user_index/user_index.vue'
import market_viewVue from '@/views/market_view.vue'
import marketVue from '@/components/market/market.vue'
import market_detailVue from '@/components/market/market_detail.vue'
import hotel_searchVue from '@/components/hotel/hotel_search.vue'
import hotel_listVue from '@/components/hotel/hotel_list.vue'
import hotel_detailVue from '@/components/hotel/hotel_detail.vue'
import hotel_booking_historyVue from '@/components/hotel/hotel_booking_history.vue'
import plane_searchVue from '@/components/plane/plane_search.vue'
import plane_listVue from '@/components/plane/plane_list.vue'
import plane_booking_historyVue from '@/components/plane/plane_booking_history.vue'
import booking_admin_search_hotelVue from '@/components/booking_admin/search_hotel.vue'
import booking_admin_list_hotelVue from '@/components/booking_admin/list_hotel.vue'
import booking_admin_modify_hotelVue from '@/components/booking_admin/modify_hotel.vue'
import booking_admin_search_planeVue from '@/components/booking_admin/search_plane.vue'
import booking_admin_list_planeVue from '@/components/booking_admin/list_plane.vue'
import booking_admin_modify_planeVue from '@/components/booking_admin/modify_plane.vue'
import seller_add_goodVue from '@/components/seller/add_good.vue'
import seller_modify_goodVue from '@/components/seller/modify_good.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [//在这里配置路由
  {
    path:'/user_index',
    name:'user_index',
    component:user_indexVue
  },
  
  {// 模块三商品、酒店、航班界面
    path: '/market_view',
    name: 'market_view',
    component: market_viewVue,
    children:[
      {//商品搜索显示界面
      path:'/component/market',name:'component_market',component:marketVue},
      {//商品详情界面
        path:'/component/market_detail',name:'component_market_detail',component:market_detailVue},
      {//酒店搜索界面
        path:'/component/hotel_search',name:'component_hotel_search',component:hotel_searchVue},
      {//酒店搜索显示界面
        path:'/component/hotel_list',name:'component_hotel_list',component:hotel_listVue},
      {//酒店详情显示界面
        path:'/component/hotel_detail',name:'component_hotel_detail',component:hotel_detailVue},
      {//酒店预订历史界面
        path:'/component/hotel_booking_history',name:'component_hotel_booking_history',component:hotel_booking_historyVue},
      {//航班搜索界面
        path:'/component/plane_search',name:'component_plane_search',component:plane_searchVue},
      {//航班搜索显示界面
        path:'/component/plane_list',name:'component_plane_list',component:plane_listVue},
      {//航班预订历史界面
        path:'/component/plane_booking_history',name:'component_plane_booking_history',component:plane_booking_historyVue},
      {//卖家发布商品界面
        path:'/component/seller_add_good',name:'component_seller_add_good',component:seller_add_goodVue},
      {//卖家修改商品界面
        path:'/component/seller_modify_good',name:'component_seller_modify_good',component:seller_modify_goodVue},
      {//管理员搜索酒店界面
        path:'/component/admin_search_hotel',name:'component_admin_search_hotel',component:booking_admin_search_hotelVue},
      {//管理员搜索酒店结果界面
        path:'/component/admin_list_hotel',name:'component_admin_list_hotel',component:booking_admin_list_hotelVue},
      {//管理员修改酒店界面
        path:'/component/admin_modify_hotel',name:'component_admin_modify_hotel',component:booking_admin_modify_hotelVue},
      {//管理员搜索航班界面
        path:'/component/admin_search_plane',name:'component_admin_search_plane',component:booking_admin_search_planeVue},
      {//管理员搜索航班结果界面
        path:'/component/admin_list_plane',name:'component_admin_list_plane',component:booking_admin_list_planeVue},
      {//管理员修改航班界面
        path:'/component/admin_modify_plane',name:'component_admin_modify_plane',component:booking_admin_modify_planeVue}
    ]
  },
  ]
})

export default router