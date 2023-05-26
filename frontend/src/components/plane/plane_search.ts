import { reactive } from 'vue'

interface Plane_search{
    start_location:string,
    end_location: string,
    company:string,
    date: Date,
    
}
let today=new Date()
export const plane_search = reactive<Plane_search>({
    start_location:"",
    end_location:"",
    company:"",
    date: today
})