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

//测试
hotels.push({
    hotel_id:-1,
    name:"1231",
    location:"123123",
    phone:"1231231",
    star:3,
    discount:1,
    description:"12412431"
})
hotels.push({
    hotel_id:-1,
    name:"1231123123",
    location:"123126343",
    phone:"123123134",
    star:5,
    discount:1,
    description:"1244141241412342342312431"
})
hotels.push({
    hotel_id:-1,
    name:"asdfas1",
    location:"12asdfa3123",
    phone:"1231231",
    star:4,
    discount:1,
    description:"1241243asdkdasfisdljf1"
})

//房型信息
//酒店发布 增加房型往里添加
//酒店修改 选中后显示所有房型 进行修改
let Rooms:Room[]=[]
export let rooms=reactive(Rooms)
rooms.push({
    type:"大床房",
    price:100,
    stock:20,
})

export const hotel_init=()=>{
    hotel={
        hotel_id:-1,
        name:"",
        location:"",
        phone:"",
        star:0,
        discount:1,
        description:""
    }
    Rooms=[]
}
export const modify_hotel=(index:number)=>{
    hotel=hotel_datas[index]
}