//functions to get the date and time for the check-ins and check-outs
const getYear=()=>{
    const date=new Date(Date.now());
    return date.getFullYear();
}
const getMonth=()=>{
    const date=new Date();
    return date.getMonth()+1;
}
const getDate=()=>{
    const date=new Date();
    return date.getDate();
}
const getHour=()=>{
    const date=new Date();
    return date.getHours();
}
const getMinute=()=>{
    const date=new Date();
    return date.getMinutes();
}
const getSecond=()=>{
    const date=new Date();
    return date.getSeconds();
}
const getDateObject={
    getYear,
    getMonth,
    getDate,
    getHour,
    getMinute,
    getSecond
};
module.exports=getDateObject;