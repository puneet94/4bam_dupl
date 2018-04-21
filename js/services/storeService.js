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

export function getExercises(){
    return [{
        text: "Exercise1",
        containsImage: true,
        images: ["https://files.mopo-server.de/files/em/epaper/demofiles/dummy01.jpg","https://files.mopo-server.de/files/em/epaper/demofiles/dummy02.jpg","https://files.mopo-server.de/files/em/epaper/demofiles/dummy03.jpg"]
    },{
        text: "Exercise2",
        containsImage: true,
        images: ["https://files.mopo-server.de/files/em/epaper/demofiles/dummy01.jpg","https://files.mopo-server.de/files/em/epaper/demofiles/dummy02.jpg","https://files.mopo-server.de/files/em/epaper/demofiles/dummy03.jpg"]
    },{
        text: "Exercise3",
        containsImage: false,
        video: "https://files.mopo-server.de/files/em/epaper/demofiles/murph.mp4"
    }]
}