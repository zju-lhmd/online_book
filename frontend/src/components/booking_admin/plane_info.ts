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
//plane_data为修改或增加的酒店信息 plane_datas为查询返回的酒店信息
//航班发布 -> plane_data 为空 修改后发布
//航班修改 -> plane_datas -> 选中后显示plane_data 在基础上修改
export const plane_data=reactive(plane)
export let plane_datas=reactive(planes)

// 测试
plane_datas.push({
    plane_id:1,
    start_location:"asdasd",
    end_location:"gfdg",
    company:"adfgdsf",
    start_time:today,
    end_time:today,
    price:0,
    discount:1,
    stock:0,
})
plane_datas.push({
    plane_id:1,
    start_location:"asdasd",
    end_location:"gfdg",
    company:"adfgdsf",
    start_time:today,
    end_time:today,
    price:0,
    discount:1,
    stock:0,
})

export const plane_list_init=(data:Plane_data[])=>{
    planes=data
}
export const plane_init=()=>{
    plane={
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

export const modify_plane=(index:number)=>{
    plane=plane_datas[index]
}