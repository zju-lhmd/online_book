import { reactive , ref } from 'vue'

export interface Good_search{
    name:string,
    category:string
}
let search:Good_search={
    name:"",
    category:""
}
export const good_search=reactive(search)

export interface Good_info{
    good_id:number,
    name:string,
    category:string,
    location:string,
    sales:number, 
    price:number,
    discount:number,
    stock:number,
    description:string
}
let goods:Good_info[]=[]
let good:Good_info={
    good_id:-1,
    name:"asda",
    category:"123",
    location:"asdas",
    sales:0,
    price:0,
    discount:1,
    stock:0,
    description:"asdasdas"
}
export const goods_info=reactive(goods)
export const good_detail=reactive(good)
export const Get_data=(data:Good_info[])=>{
    goods=data
}
export const Get_detail=(data:Good_info)=>{
    good=data
}

//测试
goods.push({
    good_id:1,
    name:"asdas",
    category:"123",
    location:"asda",
    sales:0,
    price:0,
    discount:1,
    stock:0,
    description:""
})
goods.push({
    good_id:2,
    name:"asdas",
    category:"123",
    location:"asda",
    sales:0,
    price:0,
    discount:1,
    stock:0,
    description:""
})
goods.push({
    good_id:3,
    name:"asdas",
    category:"123",
    location:"asda",
    sales:0,
    price:0,
    discount:1,
    stock:0,
    description:""
})