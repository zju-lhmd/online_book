import {ref , reactive } from 'vue'

//酒店信息
interface Hotel_data{
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

//房型信息
export interface Room{
    type:string,
    price:number,
    stock:number,
}


export let hotel:Hotel_data={
    hotel_id:-1,
    name:"",
    location:"",
    phone:"",
    star:0,
    discount:1,
    description:"",
    score:1,
    rator_number:1,
    overall_ratings:1,
}
const hotels:Hotel_data[]=[]
//hotel_data为修改或增加的酒店信息 hotel_datas为查询返回的酒店信息
//酒店发布 -> hotel_data 为空 修改后发布
//酒店修改 -> hotel_datas -> 选中后显示hotel_data 在基础上修改
export let hotel_datas=reactive(hotels)

//房型信息
//酒店发布 增加房型往里添加
//酒店修改 选中后显示所有房型 进行修改
export let Rooms:Room[]=[]

export const hotel_list_init=(hotel:any)=>{
    hotel_datas=[]
    console.log(hotel)
    for(let i:number=0;i<hotel.data.hotel.length;i++){
        hotel_datas.push({
            hotel_id:hotel.data.hotel[i].hotel_id,
            name:hotel.data.hotel[i].name,
            location:hotel.data.hotel[i].location,
            phone:hotel.data.hotel[i].phone,
            star:hotel.data.hotel[i].star_rating,
            discount:hotel.data.hotel[i].discount,
            rator_number:hotel.data.hotel[i].score_count,
            overall_ratings:hotel.data.hotel[i].score_total,
            score:0,
            description:"",
        })
        if(hotel.data.hotel[i].score_count!=0)
            hotel_datas[i].score=hotel.data.hotel[i].score_total/hotel.data.hotel[i].score_count;
    }
}
export const hotel_init=()=>{
    hotel={
        hotel_id:-1,
        name:"",
        location:"",
        phone:"",
        star:0,
        discount:1,
        description:"",
        score:1,
        rator_number:1,
        overall_ratings:1,
    }
    Rooms=[]
}
export const hotel_detail=(hotel_datas:any)=>{
    console.log(hotel_datas)
    hotel={
        hotel_id:hotel_datas.hotel.hotel_id,
        name:hotel_datas.hotel.name,
        location:hotel_datas.hotel.location,
        phone:hotel_datas.hotel.phone,
        star:hotel_datas.hotel.star_rating,
        discount:hotel_datas.hotel.discount,
        rator_number:hotel_datas.hotel.score_count,
        overall_ratings:hotel_datas.hotel.score_total,
        score:hotel_datas.score,
        description:hotel_datas.hotel.description,
    }
    Rooms=[]
    for(let i:number=0;i<hotel_datas.room.length;i++)
        Rooms.push({
            type:hotel_datas.room[i].type,
            price:hotel_datas.room[i].price,
            stock:hotel_datas.room[i].stock,
        })
}