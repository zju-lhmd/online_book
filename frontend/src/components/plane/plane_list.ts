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

//数据处理部分  plane_search_data为后端收集到的数据所有航班数据
//start为只满足出发地航班 destination为只满足目的地航班 
//direct为直飞航班 transfer为转机航班组，转机限制转机一次 
//plane存储返回显示在界面上的航班数据 special_data存储返回显示在界面上的特价航班
let plane_search_data_:plane_data[]=[]
let start:plane_data[]=[]
let destination:plane_data[]=[]
export let direct:plane_data[][]=[]
export let transfer:plane_data[][]=[]
export let plane_:plane_data[][]=[]
export let special_plane_:plane_data[][]=[]

//处理函数
export const plane_init=(data:any)=>{
    plane_search_data_=[]
    console.log(data)
    for(let i:number=0;i<data.length;i++)
        plane_search_data_.push({
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
        
    console.log(plane_search_data_)
    //将航班分类 直达放入direct 出发地相同放入start 目的地相同放入destination
    direct=[]
    start=[]
    destination=[]
    transfer=[]
    plane_=[]
    special_plane_=[]
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
        plane_search_data_[i].price=plane_search_data_[i].price/plane_search_data_[i].discount;
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
    plane_=direct.concat(transfer)
    plane_.sort((n1,n2)=>{//排序 按照价格排序
        return n1[0].price-n2[0].price;
    })
    console.log(plane_)
    //special_plane 最便宜的四个
    special_plane_=plane_.slice(0,Math.min(plane_.length,4));
}