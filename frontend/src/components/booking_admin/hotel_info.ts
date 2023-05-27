import {ref , reactive } from 'vue'

//酒店信息
interface Hotel_data{
    hotel_id:number,
    name:string,
    location:string,
    phone:string,
    star:number,
    discount:number,
    description:string
}

//房型信息
interface Room{
    type:string,
    price:number,
    stock:number,
}


let hotel:Hotel_data={
    hotel_id:-1,
    name:"",
    location:"",
    phone:"",
    star:0,
    discount:1,
    description:""
}
let hotels:Hotel_data[]=[]
//hotel_data为修改或增加的酒店信息 hotel_datas为查询返回的酒店信息
//酒店发布 -> hotel_data 为空 修改后发布
//酒店修改 -> hotel_datas -> 选中后显示hotel_data 在基础上修改
export let hotel_data=reactive(hotel)
export let hotel_datas=reactive(hotels)

let room:Room={
    type:"",
    price:0,
    stock:0,
}
//房型信息
//酒店发布 增加房型往里添加
//酒店修改 选中后显示所有房型 进行修改
let rooms:Room[]=[]

export const hotel_init=()=>{
    hotel_data={
        hotel_id:-1,
        name:"",
        location:"",
        phone:"",
        star:0,
        discount:1,
        description:""
    }
    rooms=[]
}