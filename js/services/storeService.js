import store from "react-native-simple-store";
const ALARM_DAYS = "ALARM_DAYS";
const ALARM_TIMES = "ALARM_TIMES";

export function getAlarmDays(){
    return store.get(ALARM_DAYS);
}


export function getAlarmTimes(){
    return store.get(ALARM_TIMES);
}


export function setAlarmDays(alarmDays){
    store.delete(ALARM_DAYS);
    return store.save(ALARM_DAYS,alarmDays);
}
export function setAlarmTimes(alarmTimes){
    store.delete(ALARM_TIMES);
    return store.save(ALARM_TIMES,alarmTimes);
}