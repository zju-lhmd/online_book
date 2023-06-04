import { reactive } from 'vue'

//state 订单状态 0已预订 1已入住 2已退单 has_score是否已经评分
export interface Hotel_booking_history{
    user:number,
    order_no:string,
    name:string,
    location:string,
    type:string,
    date1:Date,
    date2:Date,
    price:number,
    state:number,
    score:number,
    has_score:boolean,
    comment:string
}

let order:Hotel_booking_history[]=[];
//测试用
// let date1=new Date()
// let date2=new Date()
// date1.setTime(date1.getTime() - 3600 * 1000 * 24*3)
// date2.setTime(date2.getTime() - 3600 * 1000 * 24*1)
// order.push({
//     user:1,
//     order_no:"order1",
//     name:"order1asdasdasd",
//     location:"sdgfsdfsdf",
//     type:"大床房",
//     date1:date1,
//     date2:date2,
//     price:Math.random()*100+100,
//     state:0,
//     score:0,
//     has_score:false,
//     comment:""
// });
// date1.setTime(date1.getTime())
// date2.setTime(date2.getTime()+ 3600 * 1000 * 24*4)
// order.push({
//     user:1,
//     order_no:"order2",
//     name:"order2asdasdasds",
//     location:"sdgfsdfsdf",
//     type:"大床房",
//     date1:date1,
//     date2:date2,
//     price:Math.random()*100+100,
//     state:1,
//     score:0,
//     has_score:false,
//     comment:""
// });
// order.push({
//     user:1,
//     order_no:"order3",
//     name:"order3asdasdasds",
//     location:"sdgfsdfsdf",
//     type:"大床房",
//     date1:date1,
//     date2:date2,
//     price:Math.random()*100+100,
//     state:2,
//     score:4.3,
//     has_score:true,
//     comment:"1231"
// });

export let orders=reactive(order);
export const hotel_order_Init=(data:Hotel_booking_history[])=>{
    order=data
}