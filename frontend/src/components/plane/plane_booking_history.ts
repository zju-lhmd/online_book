import { reactive } from 'vue'

//state 订单状态 0已预订 1已入住 2已退单 has_score是否已经评分
export interface Plane_booking_data{
    order_id:string,
    plane_id:number,
    start_location:string,
    end_location:string,
    company:string,
    start_time:Date,
    end_time:Date,
    price:number,
    state:number,
}
export let order:Plane_booking_data[]=[];
export const plane_order_Init=(data:any)=>{
    console.log(data)
    for(let i:number=0;i<data.length;i++){
        order.push({
            order_id:data[i].order_id,
            plane_id:data[i].plane_id,
            start_location:data[i].plane.start,
            end_location:data[i].plane.end,
            company:data[i].plane.company,
            start_time:new Date(data[i].start_time),
            end_time:new Date(data[i].end_time),
            price:data[i].price,
            state:data[i].state,
        })
    }
}