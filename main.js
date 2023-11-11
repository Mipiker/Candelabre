const loriotWebsocket = require('./loriotWebsocket');
const utils = require('./utils')

loriotWebsocket.connectToWebsocket();
takeMeasureAfter10s();

async function takeMeasureAfter10s() {
    await utils.sleep(10*1000);
    loriotWebsocket.takeMeasure('0080E115000AC899', 20, 128);
}
