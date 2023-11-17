const logManager = require('./logManager');
const loriotWebsocket = require('./loriotWebsocket');
const weatherAPI = require('./weatherAPI');

const MIN_WIND_SPEED = 0;

init();
setInterval(mainLoop, 5*1000);

async function init() {
    loriotWebsocket.connectToWebsocket();
/*    const dataTest = {
        date:new Date().toUTCString(),
        Ne:128,
        fe:20,
        pX:1,
        pY:2,
        pZ:3,
        avgX:1.1,
        avgY:1.2,
        avgZ:1.3,
        magX:1.11,
        magY:1.12,
        magZ:1.13,
        freqX:1.111,
        freqY:1.112,
        freqZ:1.113
    }
    await logManager.saveData('0080E115000AC899', dataTest);
    console.log(await logManager.getData('0080E115000AC899'));*/
}

function mainLoop() {
    weatherAPI.weatherRequest()
    .then(windSpeed => {
        if(windSpeed > MIN_WIND_SPEED) {
            //loriotWebsocket.takeMeasure('0080E115000AC899', 20, 128);
        }
    });
}