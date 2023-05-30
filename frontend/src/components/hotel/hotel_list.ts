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

//测试用
for(var i:number=1;i<=100;i++){
    let da:Hotel_data={
        hotel_id:1,
        name:i.toString(),
        location:"杭州市三墩镇xxx路",
        phone:"12345678901",
        star:Math.random()*5,
        discount:0.7,
        rator_number:5,
        overall_ratings:23,
        price_min:Math.random()*200+100,
        score:Math.random()*5,
    }
    data.push(da);
}

export let datas=reactive(data);
export let special_data=reactive(special_datas);

export const data_init=(hotel:Hotel_data[])=>{
    data=hotel
    data.sort((n1,n2)=>{
        if(n1.price_min!=n2.price_min)
            return n1.price_min-n2.price_min;
        else if(n1.star!=n2.star)
            return n2.star-n1.star;
        else return n2.score-n1.score;
    })
    data.sort((n1,n2)=>{
        if(n1.discount===n2.discount)
            return n1.price_min-n2.price_min;
        else return n1.discount-n2.discount;
    })
    special_data=[]
    for(var i:number=0;i<4;i++)
        special_data.push(data[i]);
}