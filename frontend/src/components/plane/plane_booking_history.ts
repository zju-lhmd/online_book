import { reactive } from 'vue'

//state 订单状态 0已预订 1已入住 2已退单 has_score是否已经评分
export interface Plane_booking_data{
    order_no:string,
    start_location1:string,
    start_location2:string,
    end_location1:string,
    end_location2:string,
    company1:string,
    company2:string,
    start_time1:Date,
    start_time2:Date,
    end_time1:Date,
    end_time2:Date,
    price:number,
    state:number,
}
let order:Plane_booking_data[]=[];
//测试用
let date1=new Date()
let date2=new Date()
date1.setTime(date1.getTime() - 3600 * 1000 * 24*3)
date2.setTime(date2.getTime() - 3600 * 1000 * 24*1)
order.push({
    order_no:"order1",
    start_location1:"上海",
    start_location2:"",
    end_location1:"温州",
    end_location2:"",
    company1:"东方航空",
    company2:"",
    start_time1:date1,
    start_time2:date1,
    end_time1:date2,
    end_time2:date2,
    price:123,
    state:0,
});
order.push({
    order_no:"order1",
    start_location1:"上海",
    start_location2:"aa",
    end_location1:"温州",
    end_location2:"aa",
    company1:"东方航空",
    company2:"aa",
    start_time1:date1,
    start_time2:date1,
    end_time1:date2,
    end_time2:date2,
    price:123,
    state:0,
});

export let orders=reactive(order);
export const plane_order_Init=(data:Plane_booking_data[])=>{
    order=data
}