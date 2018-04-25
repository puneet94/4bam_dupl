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
        text: "Übung 1",
        containsImage: true,
        images: ["https://files.mopo-server.de/files/em/epaper/demofiles/u1-1.png","https://files.mopo-server.de/files/em/epaper/demofiles/u1-2.png"]
    },{
        text: "Übung 2",
        containsImage: true,
        images: ["https://files.mopo-server.de/files/em/epaper/demofiles/u2-0.png","https://files.mopo-server.de/files/em/epaper/demofiles/u2-1.png","https://files.mopo-server.de/files/em/epaper/demofiles/u2-2.png","https://files.mopo-server.de/files/em/epaper/demofiles/u2-3.png"]
    },{
        text: "Übung 3",
        containsImage: false,
        video: "https://files.mopo-server.de/files/em/epaper/demofiles/murph.mp4"
    }];
}