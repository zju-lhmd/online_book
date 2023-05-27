import { reactive , ref } from 'vue'
import { plane_search } from "@/components/plane/plane_search"
//排序
export const plane_sort = reactive({
    //升序为false 降序为true
    price_sort:false,
    time_sort:false,
    company_only:false,
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
export const plane_search_data=ref(plane_search_data_);
let start:plane_data[]=[]
let destination:plane_data[]=[]
let direct:Array<plane_data[]>=[]
let transfer:Array<plane_data[]>=[]
let plane:Array<plane_data[]>=[];
let special_plane:Array<plane_data[]>=[];

//处理函数
export const solve=()=>{
    for(let i:number=0;i<plane_search_data_.length;i++){//将航班分类 直达放入direct 出发地相同放入start 目的地相同放入destination
        let p1:boolean=(plane_search_data_[i].start_location===plane_search.start_location);
        let p2:boolean=(plane_search_data_[i].end_location===plane_search.end_location);
        if(p1&&p2){
            direct.push(plane_search_data_.slice(i,i));
        }else if(p1){
            start.push(plane_search_data_[i]);
        }else{
            destination.push(plane_search_data_[i]);
        }
    }

    start.sort((n1,n2)=>{
        if(n1.end_location<n2.end_location)return -1;
        return 1;
    })
    destination.sort((n1,n2)=>{
        if(n1.start_location<n2.start_location)return -1;
        return 1;
    })
    for(let l_s=0;l_s<start.length;l_s++){
        let r_s:number=l_s;
        while(r_s+1<start.length&&start[l_s].end_location===start[r_s+1].end_location)
            r_s++;
            
    }
}