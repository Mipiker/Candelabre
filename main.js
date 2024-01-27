const logManager = require('./logManager');
const loriotWebsocket = require('./loriotWebsocket');
const weatherAPI = require('./weatherAPI');
const utils = require('./utils')

const MIN_WIND_SPEED = 0;

init();
setInterval(mainLoop, 2*60*1000);

async function init() {
    loriotWebsocket.connectToWebsocket();
    await utils.sleep(5000);
    loriotWebsocket.takeMeasure('0080E115000A9B3C', 20, 32);
}

async function mainLoop() {
    if(await weatherAPI.weatherRequest() > MIN_WIND_SPEED) {
        //loriotWebsocket.takeMeasure('0080E115000AC899', 20, 128, 6);
    }
}