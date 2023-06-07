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
export let plane:Plane_data={
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
export let planes:Plane_data[]=[]
//plane_data为修改或增加的酒店信息 plane_datas为查询返回的酒店信息
//航班发布 -> plane_data 为空 修改后发布
//航班修改 -> plane_datas -> 选中后显示plane_data 在基础上修改
export const plane_list_init=(data:any)=>{
    planes=[]
    for(let i:number=0;i<data.length;i++)
    planes.push({
        plane_id:data[i].plane_id,
        start_location:data[i].start,
        end_location:data[i].end,
        company:data[i].company,
        start_time:new Date(data[i].start_time),
        end_time:new Date(data[i].end_time),
        price:data[i].price,
        discount:parseFloat(data[i].discount)/100,
        stock:data[i].stock,
    })
    console.log(planes)
}
export const plane_init=()=>{

}

export const modify_plane=(index:number)=>{
    plane=planes[index]
}