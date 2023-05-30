import { reactive } from 'vue'

interface Plane_search{
    start_location:string,
    end_location: string,
    company:string,
    date: Date,
}
let today=new Date()
let plane_search_:Plane_search={
    start_location:"",
    end_location:"",
    company:"",
    date: today
}
export let plane_search = reactive(plane_search_)