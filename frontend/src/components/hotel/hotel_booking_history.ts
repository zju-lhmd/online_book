import { reactive } from 'vue'
import { comments } from './hotel_detail';

//state 订单状态 0已预订 1已入住 2已退单 has_score是否已经评分
export interface Hotel_booking_history{
    user:number,
    order_id:string,
    name:string,
    location:string,
    date1:Date,
    date2:Date,
    price:number,
    state:number,
    score:number,
    has_score:number,
    comment:string,
    hotel_id:number
}

export let hotel_booking_history:Hotel_booking_history[]=[];
export const hotel_order_Init=(data:any)=>{
    console.log(data)
    hotel_booking_history=[]
    for(let i:number=0;i<data.history.length;i++){
        let comment=""
        for(let j:number=0;j<data.comment.length;j++){
            if(data.history[i].hotel.hotel_id===data.comment[j].hotel_id){
                comment=data.comment[j].content;
                break;
            }
        }
        let score=data.history[i].hotel.score_count==0?0:data.history[i].hotel.score_total/data.history[i].hotel.score_count
        hotel_booking_history.push({
            user:data.history[i].user_id,
            order_id:data.history[i].order_id,
            name:data.history[i].hotel.name,
            location:data.history[i].hotel.location,
            date1:new Date(data.history[i].start_time),
            date2:new Date(data.history[i].end_time),
            price:data.history[i].price,
            state:data.history[i].state,
            score:score,
            has_score:data.history[i].has_score,
            comment:comment,
            hotel_id:data.history[i].hotel_id
        })
    }
    console.log(hotel_booking_history)
}