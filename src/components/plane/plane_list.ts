import { reactive } from 'vue'
import { plane_search } from "@/components/plane/plane_search"
//排序
export const plane_sort = reactive({
    //升序为false 降序为true
    price_sort:false,
    time_sort:false,
    company_only:false,
    direct_only:false
})

interface plane_data{
    start_location:string,
    end_location:string,
    company:string,
    start_time:Date,
    end_time:Date,
    price:number,
    discount:number,
}
