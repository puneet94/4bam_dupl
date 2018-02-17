import moment from "moment";
export function getNearestDay(day,date){
    let currentDate = date || moment();//.add(1,'days');
    let currentDay = currentDate.format("dddd").toUpperCase();
    if(currentDay === day){
        return currentDate;
    }else{
        return getNearestDay(day,currentDate.add(1,'days'));
    }
}