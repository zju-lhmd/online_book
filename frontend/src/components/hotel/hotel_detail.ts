import { reactive , ref } from 'vue'


export interface Hotel_detail_data{
    hotel_id:number,
    name:string,
    location:string,
    phone:string,
    star:number,
    discount:number,
    rator_number:number,
    overall_ratings:number,
    score:number,
    description:string,
}
//查看详情获得当前酒店的所有信息
//测试用
let hotel_detail:Hotel_detail_data={
    hotel_id:-1,
    name:"",
    location:"",
    phone:"",
    star:0,
    discount:1,
    rator_number:0,
    overall_ratings:0,
    score:0,
    description:"",
};
export let hotel_detail_data = reactive(hotel_detail)
export interface Room{
    type:string,
    price:number,
    stock:number,
}
let room:Room[]=[];
//房型
export let rooms=reactive(room);

let comment:string[]=[];
export let comments=reactive(comment);
export const hotel_detail_init=(hotel:any)=>{
    // console.log(hotel);
    hotel_detail_data={
        hotel_id:hotel.hotel.hotel_id,
        name:hotel.hotel.name,
        location:hotel.hotel.location,
        phone:hotel.hotel.phone,
        star:hotel.hotel.star_rating,
        discount:parseFloat(hotel.hotel.discount)/100,
        rator_number:hotel.hotel.score_count,
        overall_ratings:hotel.hotel.score_total,
        score:hotel.score,
        description:hotel.hotel.description,
    }
    rooms=[]
    for(let i:number=0;i<hotel.room.length;i++)
        rooms.push({
            type:hotel.room[i].type,
            price:hotel.room[i].price,
            stock:hotel.room[i].stock,
        })
    comments=[]
    for(let i:number=0;i<hotel.comments.length;i++)
        comments.push(hotel.comments[i])
}