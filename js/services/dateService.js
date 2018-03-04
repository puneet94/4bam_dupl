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

function getTimeDiff(date1,date2){
    return moment(date1).diff(moment(date2),"seconds");
}

export function getNextAlarm(currentId,timeTables){
    let timeTableIndex = timeTables.findIndex(timeTable => timeTable.dayID === currentId);
    let timeTable;
    if(timeTableIndex> -1){
        
        timeTable = timeTables[timeTableIndex];
        if(getTimeDiff(timeTable.alarmDate2,timeTable.alarmDate1)>0){
            return {date:timeTables[timeTableIndex].alarmDate2,day: timeTables[timeTableIndex].dayName}
        }
    }
    else{
        

        timeTableIndex = timeTables.findIndex(timeTable => timeTable.dayID2 === currentId);
        if(timeTableIndex> -1){
            timeTable = timeTables[timeTableIndex];
            if(getTimeDiff (timeTable.alarmDate1, timeTable.alarmDate2)>0){
                return {date:timeTable.alarmDate1, day: timeTable.dayName};
            }
        }
    }
    let nextIndex = timeTableIndex+1;
    nextIndex = nextIndex==timeTables.length?0:nextIndex;
    const secondTimeTable = timeTables[nextIndex];
    const secondDate = moment(secondTimeTable.alarmDate2);
    const firstDate = moment(secondTimeTable.alarmDate1);
    if(secondDate.diff(firstDate, 'seconds')>0){
        return {date:secondTimeTable.alarmDate1,day:secondTimeTable.dayName};
    }
    return {date:secondTimeTable.alarmDate2,day:secondTimeTable.dayName}    
}
