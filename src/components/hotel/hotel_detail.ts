import { reactive } from 'vue'


interface Hotel_detail_data{
    name:string,
    location:string,
    phone:string,
    star:number,
    discount:number,
    rator_number:number,
    overall_ratings:number,
    score:number,
    description:string,
    comment:string,
}
//查看详情获得当前酒店的所有信息
//测试用
export const hotel_detail_data = reactive<Hotel_detail_data>({
    name:"asdasda",
    location:"asdads",
    phone:"asdsad",
    star:4,
    discount:0.7,
    rator_number:0,
    overall_ratings:0,
    score:4.5,
    description:"dagadfgafga",
    comment:"adfgafgadfga|||asfe|||asfsdf|||wefwef3w|||qwoejqwopwrjq|||zxkmckzlxmxc|||asdojaspo",
})

interface Room{
    type:string,
    price:number,
    stock:number,
}
let room:Room[]=[];

//测试用
let room1:Room=({
    type:"大床房",
    price:100,
    stock:30,
})
let room2:Room=({
    type:"标准房",
    price:120,
    stock:3021,
})
let room3:Room=({
    type:"套房",
    price:200,
    stock:0,
})
room.push(room1);
room.push(room2);
room.push(room3);

//房型
export const rooms=reactive(room);

let comment:string[]=[];
comment=hotel_detail_data.comment.split("|||");
export const comments=reactive(comment);