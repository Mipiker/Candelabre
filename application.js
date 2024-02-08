const logManager = require('./application/logManager');
const loriotWebsocket = require('./application/loriotWebsocket');
const weatherAPI = require('./application/weatherAPI');
const utils = require('./application/utils')

const MIN_WIND_SPEED = 0;

init();
setInterval(mainLoop, 2*60*1000);

async function init() {
    loriotWebsocket.connectToWebsocket();
    await utils.sleep(5000);
    loriotWebsocket.takeMeasure('0080E115000A9B3C', 20, 128*4); 
}

async function mainLoop() {
    var wind= await weatherAPI.weatherRequest();
    if(wind > MIN_WIND_SPEED) {
        loriotWebsocket.takeMeasure('0080E115000A9B3C', 20, 128, wind);
    }
}