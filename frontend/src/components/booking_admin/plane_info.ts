import {ref , reactive } from 'vue'

//航班信息
interface Plane_data{
    plane_id:number,
    start_location:string,
    end_location:string,
    company:string,
    start_time:Date,
    end_time:Date,
    price:number,
    discount:number,
    stock:number,
}

let today:Date=new Date
let plane:Plane_data={
    plane_id:-1,
    start_location:"",
    end_location:"",
    company:"",
    start_time:today,
    end_time:today,
    price:0,
    discount:1,
    stock:0,
}
let planes:Plane_data[]=[]
//hotel_data为修改或增加的酒店信息 hotel_datas为查询返回的酒店信息
//酒店发布 -> hotel_data 为空 修改后发布
//酒店修改 -> hotel_datas -> 选中后显示hotel_data 在基础上修改
export let plane_data=reactive(plane)
export let hotel_datas=reactive(plane)

export const plane_init=()=>{
    plane_data={
        plane_id:-1,
        start_location:"",
        end_location:"",
        company:"",
        start_time:today,
        end_time:today,
        price:0,
        discount:1,
        stock:0,
    }
}