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

function fetchNextTime(alarmID,alarmsIDs,alarmsHash){
    const mappedIDs =  alarmsIDs.map((alarmID)=>alarmsHash[alarmID]);
    if(!mappedIDs.length){
      return;
    }
     const alarmValue = alarmsHash[alarmID];
      mappedIDs.sort((a,b)=>{
              if(b.alarmTime>a.alarmTime){
                  return -1;
              }
              else if(b.alarmTime<a.alarmTime){
                  return 1;
              }
              return 0;
          });
    
    if(mappedIDs[0].dayName!=alarmValue.dayName){
      return mappedIDs[0];
    }
    return mappedIDs.find((element)=>element.alarmTime>alarmValue.alarmTime);
  }
  function fetchNextTime2(alarmTime,alarmDay,alarmsIDs,alarmsHash){
    const mappedIDs =  alarmsIDs.map((alarmID)=>alarmsHash[alarmID]);
    if(!mappedIDs.length){
      return;
    }
     
      mappedIDs.sort((a,b)=>{
              if(b.alarmTime>a.alarmTime){
                  return -1;
              }
              else if(b.alarmTime<a.alarmTime){
                  return 1;
              }
              return 0;
          });
    
    if(mappedIDs[0].dayName!=alarmDay){
      return mappedIDs[0];
    }
    return mappedIDs.find((element)=>element.alarmTime>alarmTime);
  }
export function getNextAlarm2(alarmID, alarmDays, alarmTimes){
    const daysArray = ["MONTAG","DIENSTAG","MITTWOCH","DONNERSTAG","FREITAG","SAMSTAG","SONNTAG"];
    const alarmValue = alarmTimes[alarmID];
    const alarmDay = alarmValue.dayName;
    const dayIndex = daysArray.indexOf(alarmDay);
    const daysArray2 = [...daysArray.slice(dayIndex),...daysArray.slice(0,dayIndex)];
    
    let count = 0;
    while(count<daysArray2.length){
        let currentDayName = daysArray2[count];
        
        const nextAlarm = fetchNextTime(alarmID,alarmDays[currentDayName],alarmTimes);
        
        if(nextAlarm){
            return nextAlarm;
        }
        count++;
    }
    return alarmValue;    
}
export function getNextAlarm(alarmDays, alarmTimes){
    const daysArray = ["MONTAG","DIENSTAG","MITTWOCH","DONNERSTAG","FREITAG","SAMSTAG","SONNTAG"];
    const alarmValue = moment();
    const alarmDay = alarmValue.format('dddd').toUpperCase();
    const alarmTime  = alarmValue.format('HH:mm');
    const dayIndex = daysArray.indexOf(alarmDay);
    const daysArray2 = [...daysArray.slice(dayIndex),...daysArray.slice(0,dayIndex)];
    console.log("chck alarms",alarmDay,alarmTime);
    let count = 0;
    while(count<daysArray2.length){
        let currentDayName = daysArray2[count];
        
        const nextAlarm = fetchNextTime2(alarmTime,alarmDay,alarmDays[currentDayName],alarmTimes);
        
        if(nextAlarm){
            return nextAlarm;
        }
        count++;
    }
    return alarmValue;       
}
