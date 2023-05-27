import { reactive , ref } from 'vue'
import { plane_search } from "@/components/plane/plane_search"
//排序
export const plane_sort = reactive({
    //升序为false 降序为true
    price_sort:false,
    time_sort:false,
    direct_only:false
})

// 从后端获取数据 
// 需要根据出发地获取一次航班 从目的地获取一次航班
interface plane_data{
    start_location:string,
    end_location:string,
    company:string,
    start_time:Date,
    end_time:Date,
    price:number,
    discount:number,
    stock:number,
}

//数据处理部分  plane_search_data为后端收集到的数据所有航班数据
//start为只满足出发地航班 destination为只满足目的地航班 
//direct为直飞航班 transfer为转机航班组，转机限制转机一次 
//plane存储返回显示在界面上的航班数据 special_data存储返回显示在界面上的特价航班
let plane_search_data_:plane_data[]=[]
export let plane_search_data=reactive(plane_search_data_);
let start:plane_data[]=[]
let destination:plane_data[]=[]
let direct:plane_data[][]=[]
let transfer:plane_data[][]=[]
let plane_:plane_data[][]=[]
let special_plane_:plane_data[][]=[]
export let plane=reactive(plane_);
export let special_plane=reactive(special_plane_);

//测试
let today:Date=new Date;
let date1:Date=new Date;
date1.setTime(today.getTime()+1000*3600*1);
let date2:Date=new Date;
date2.setTime(today.getTime()+1000*3600*2);
let date3:Date=new Date;
date3.setTime(today.getTime()+1000*3600*3);
let date4:Date=new Date;
date4.setTime(today.getTime()+1000*3600*4);
plane_search_data.push({
    start_location:"上海",end_location:"杭州",company:"南方航空",
    start_time:today,end_time:date1,price:100,discount:1,stock:30,
})
plane_search_data.push({
    start_location:"上海",end_location:"温州",company:"南方航空",
    start_time:today,end_time:date4,price:400,discount:0.5,stock:10,
})
plane_search_data.push({
    start_location:"上海",end_location:"杭州",company:"东方航空",
    start_time:today,end_time:date2,price:150,discount:1,stock:50,
})
plane_search_data.push({
    start_location:"杭州",end_location:"温州",company:"东方航空",
    start_time:date3,end_time:date4,price:150,discount:1,stock:50,
})


//处理函数
export const plane_init=()=>{
    //将航班分类 直达放入direct 出发地相同放入start 目的地相同放入destination
    for(let i:number=0;i<plane_search_data_.length;i++){
        let p1:boolean=(plane_search_data_[i].start_location===plane_search.start_location);
        let p2:boolean=(plane_search_data_[i].end_location===plane_search.end_location);
        plane_search_data_[i].price=plane_search_data_[i].price*plane_search_data_[i].discount;
        if(p1&&p2){
            direct.push(plane_search_data_.slice(i,i+1));
        }else if(p1){
            start.push(plane_search_data_[i]);
        }else{
            destination.push(plane_search_data_[i]);
        }
    }
    //求转机
    start.sort((n1,n2)=>{
        if(n1.end_location<n2.end_location)return -1;
        return 1;
    })
    destination.sort((n1,n2)=>{
        if(n1.start_location<n2.start_location)return -1;
        return 1;
    })
    for(let l_s=0;l_s<start.length;){
        let r_s:number=l_s;
        while(r_s+1<start.length&&start[l_s].end_location===start[r_s+1].end_location)
            r_s++;
        let l_d:number=0;
        for(l_d=0;l_d<destination.length;l_d++)
            if(start[l_s].end_location===destination[l_d].start_location)break;
        let r_d:number=l_d;
        while(r_d+1<destination.length&&destination[l_d].start_location===destination[r_d+1].start_location)
            r_d++;
        for(let i:number=l_s;i<=r_s;i++)
            for(let j:number=l_d;j<=r_d&&j<destination.length;j++){
                if(start[i].end_time.getTime()>=destination[j].start_time.getTime())continue;
                let x:plane_data[]=[];
                x.push(start[i]);
                x.push(destination[j]);
                x[0].price=x[0].price+x[1].price;
                x[0].stock=Math.min(x[0].stock,x[1].stock)
                transfer.push(x);
            }
        l_s=r_s+1;
    }

    //初始化机场数据
    plane=direct.concat(transfer)
    plane.sort((n1,n2)=>{//排序 按照价格排序
        return n2[0].price-n1[0].price;
    })
    //special_plane 最便宜的四个
    special_plane=plane.slice(0,Math.min(plane.length,4));
}
export const direct_change=()=>{
    if(plane_sort.direct_only===true)plane=direct;
    else plane=direct.concat(transfer)
}