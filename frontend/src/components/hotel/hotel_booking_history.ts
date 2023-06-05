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

export let orders=reactive(order);
export const hotel_order_Init=(data:any)=>{
    for(let i:number=0;i<data.length;i++){
        
    }
}