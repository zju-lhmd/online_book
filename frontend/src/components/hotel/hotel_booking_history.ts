import { reactive } from 'vue'

//state 订单状态 0已预订 1已入住 2已退单 has_score是否已经评分
interface Hotel_booking_history{
    order_no:string,
    name:string,
    location:string,
    type:string,
    date1:Date,
    date2:Date,
    price:number,
    state:number,
    has_score:boolean
}

let order:Hotel_booking_history[]=[];
//测试用
let date1=new Date()
let date2=new Date()
date1.setTime(date1.getTime() - 3600 * 1000 * 24*3)
date2.setTime(date2.getTime() - 3600 * 1000 * 24*1)
order.push({
    order_no:"order1",
    name:"order1asdasdasd",
    location:"sdgfsdfsdf",
    type:"大床房",
    date1:date1,
    date2:date2,
    price:Math.random()*100+100,
    state:0,
    has_score:false
});
date1.setTime(date1.getTime())
date2.setTime(date2.getTime()+ 3600 * 1000 * 24*4)
order.push({
    order_no:"order2",
    name:"order2asdasdasds",
    location:"sdgfsdfsdf",
    type:"大床房",
    date1:date1,
    date2:date2,
    price:Math.random()*100+100,
    state:1,
    has_score:false
});
order.push({
    order_no:"order3",
    name:"order3asdasdasds",
    location:"sdgfsdfsdf",
    type:"大床房",
    date1:date1,
    date2:date2,
    price:Math.random()*100+100,
    state:2,
    has_score:true
});

export let orders=reactive(order);