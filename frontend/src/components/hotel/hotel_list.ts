import { reactive } from 'vue'

interface hotel_sort{
    price_sort:boolean,
    start_sort:boolean,
    score_sort:boolean
}

export const hotel_sort = reactive({
    //升序为false 降序为true
    price_sort:false,
    star_sort:true,
    score_sort:true
})

export interface Hotel_data{
    hotel_id:number,
    name:string,
    location:string,
    phone:string,
    star:number,
    discount:number,
    rator_number:number,
    overall_ratings:number,
    price_min:number,
    score:number,
}

// 后端获得数据存储 data为搜索结果 special为选出的特价酒店 规则为折扣最大的四个
let data:Hotel_data[] =[];
let special_datas:Hotel_data[]=[];

export let datas=reactive(data);
export let special_data=reactive(special_datas);

export const data_init=(hotel:any)=>{
    datas=[]
    for(let i:number=0;i<hotel.data.hotel.length;i++){
        datas.push({
            hotel_id:hotel.data.hotel[i].hotel_id,
            name:hotel.data.hotel[i].name,
            location:hotel.data.hotel[i].location,
            phone:hotel.data.hotel[i].phone,
            star:hotel.data.hotel[i].star_rating,
            discount:parseFloat(hotel.data.hotel[i].discount)/100,
            rator_number:hotel.data.hotel[i].score_count,
            overall_ratings:hotel.data.hotel[i].score_total,
            price_min:hotel.data.room_min_price[i],
            score:0,
        })
        if(hotel.data.hotel[i].score_count!=0)
            datas[i].score=hotel.data.hotel[i].score_total/hotel.data.hotel[i].score_count;
    }
    
    datas.sort((n1,n2)=>{
        if(n1.discount===n2.discount)
            return n1.price_min-n2.price_min;
        else return n1.discount-n2.discount;
    })
    special_data=[]
    for(var i:number=0;i<Math.min(4,datas.length);i++)
        special_data.push(datas[i]);
    datas.sort((n1,n2)=>{
        if(n1.price_min!=n2.price_min)
            return n1.price_min-n2.price_min;
        else if(n1.star!=n2.star)
            return n2.star-n1.star;
        else return n2.score-n1.score;
    })
}