import {csvJSON} from './readLogManager.js'

function getDate(date) {
    if(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return {day,month,year,hours,minutes,seconds};
    }
}

const downlink = await csvJSON('../log/downlink.csv');
const wind = downlink[downlink.length-1].wind;
const devices=await csvJSON('../log/devices.csv');
var a= devices.length;
var s=0;

const ville="Pornic"
document.getElementById("deviceDisconnected").innerHTML= "Appareils non connectés:\n\n";
for(let i=0;i<a;i++){
    s+=await isConnected('../log/'+devices[i].EUI+'.csv');
}
document.getElementById("position").innerHTML = "Position:\t"+ ville ;
document.getElementById("wind").innerHTML = "Vitesse du vent:\t"+ wind*3.6 + "km/h" ;
document.getElementById("deviceConnected").innerHTML= "Appareils connectés:"+ s+"/"+a;
document.getElementById("score").innerHTML= "Score:";



function convertDate(dateString) {
    var parts = dateString.split('/');
    var newDateString = parts[1] + '/' + parts[0] + '/' + parts[2];
    return newDateString;
}
async function isConnected(fileEUI){
    const EUI= await csvJSON(fileEUI);
    const lastDate= getDate (new Date (convertDate((EUI[EUI.length-1].date))));
    const currentDate= getDate(new Date());
    if(currentDate.day-lastDate.day>3){
        document.getElementById("deviceDisconnected").innerHTML += fileEUI.slice(7,fileEUI.length-4)+'\n';
        return 0;
    }
    else{
    return 1;
    }


}



