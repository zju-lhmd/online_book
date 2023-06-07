import { reactive , ref } from 'vue'

export interface Good_search{
    seller_id:number,
    name:string,
    category:string
}

let search:Good_search={
    seller_id:-1,
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
export let goods:Good_info[]=[]
export let good:Good_info={
    good_id:-1,
    name:"",
    category:"",
    location:"",
    sales:0,
    price:0,
    discount:1,
    stock:0,
    description:""
}
export const Get_seller_good_data=(data:any)=>{
    goods=[]
    for(let i:number=0;i<data.length;i++)
        goods.push({
            good_id:data[i].good_id,
            name:data[i].name,
            category:data[i].category,
            location:data[i].location,
            sales:data[i].sales,
            price:data[i].price,
            discount:parseFloat(data[i].discount)/100,
            stock:data[i].stock,
            description:data[i].description
        })
}
export const Get_detail=(data:Good_info)=>{
    good=data
}
export const GoodInit=()=>{
    good={
        good_id:-1,
        name:"",
        category:"",
        location:"",
        sales:0,
        price:0,
        discount:1,
        stock:0,
        description:""
    }
}