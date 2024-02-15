const logManager = require('./application/logManager');
const loriotWebsocket = require('./application/loriotWebsocket');
const weatherAPI = require('./application/weatherAPI');
const utils = require('./application/utils')
const WebSocket = require('ws');

const MIN_WIND_SPEED = 0;

init();
setInterval(mainLoop, 10*1000);

async function init() {
    do {
        var websocket = await loriotWebsocket.connectToWebsocket();
    } while(!(websocket && websocket.readyState == WebSocket.OPEN));
    //await loriotWebsocket.takeMeasure('0080E115000A9B3C', 20, 128*4, 0);
}

async function mainLoop() {
    /* var wind = await weatherAPI.weatherRequest();
    if(wind > MIN_WIND_SPEED) {
        await loriotWebsocket.takeMeasure('0080E115000A9B3C', 20, 128, wind);
    } */
} 