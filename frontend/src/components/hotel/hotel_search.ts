import { reactive } from 'vue'

interface Hotel_search{
    location: string,
    hotel_name: string,
    date1: Date,
    date2: Date,
    time:number
}
let today=new Date()
let tomorrow=new Date()
tomorrow.setTime(tomorrow.getTime() + 3600 * 1000 * 24)
export const hotel_search = reactive<Hotel_search>({
    location: "",
    hotel_name: "",
    date1: today,
    date2: tomorrow,
    time:0
})