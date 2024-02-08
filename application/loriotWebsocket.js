const logManager = require('./logManager');
const utils = require('./utils');
const WebSocket = require('ws');

const uri = 'wss://eu1.loriot.io/app?token=vnop3gAAAA1ldTEubG9yaW90LmlvULNu1IIiBz1KvdF2U4Rnbw==';
let websocket;
let downlinksDates = [];

// Connect the websocket to loriot and manage received packets
function connectToWebsocket() {
    
    websocket = new WebSocket(uri); 

    websocket.on('open', function () {
        console.log('Connected to the loriot server');
    });

    websocket.on('message', function (data) {
        const obj = JSON.parse(data.toString());
        console.log(`CMD:${obj.cmd} | EUI:${obj.EUI} | DATA:${obj.data}`);
        if(obj.cmd === 'rx' && obj.data.length) {
            logManager.saveData(obj.EUI, decodeData(obj.data));
        }
    });

    websocket.on('close', function (code, reason) {
        console.log(`Loriot server disconnected with code: ${code}, reason: ${reason}`);
    });

    websocket.on('error', function (error) {
        console.error('Loriot websocket error: ', error);
    });
}

// Send data to the device EUI on port
function sendPayload(EUI, port, data) {
    if(websocket && websocket.readyState == WebSocket.OPEN) {
        const payload = {
            cmd:'tx',
            EUI:EUI,
            port:port,
            confirmed:false,
            data:data
        }
        websocket.send(JSON.stringify(payload));
        console.log('Paylaod send to loriot server');
    } else { 
        console.log('Loriot websocket connection not open. Cannot send payload');
    }
}

// Instruct the device EUI to take a identificated measure with parameter fe and Ne  
function takeMeasure(EUI, fe, Ne, wind) {
    if(downlinksDates.length == 65535)
        downlinksDates = [];
    downlinksDates.push(new Date());
    data = Ne.toString(16).padStart(4, '0');
    data += fe.toString(16).padStart(2, '0');
    data += (downlinksDates.length - 1).toString(16).padStart(4, '0');
    sendPayload(EUI, 1, data);
    logManager.saveDownlink(downlinksDates[downlinksDates.length - 1], wind);
}

// Transform a packed data to a structured data
function decodeData(data) {
    data = BigInt(`0x${data}`);
    let dataStruct = {
        date: utils.getDate(downlinksDates[Number(data & 0xFFFFn)]),
        fe: Number((data >> 16n) & 0xFFn),
        Ne: Number((data >> 24n) & 0xFFFFn),
        pX: Number((data >> 40n) & 0xFFFFn) * 1e-5,
        pY: Number((data >> 56n) & 0xFFFFn) * 1e-5,
        pZ: Number((data >> 72n) & 0xFFFFn) * 1e-5,
        avgX: (Number((data >> 88n) & 0xFFFFn) * 1e-4),
        avgY: (Number((data >> 104n) & 0xFFFFn) * 1e-4),
        avgZ: (Number((data >> 120n) & 0xFFFFn) * 1e-4),
        magX: (Number((data >> 136n) & 0xFFFFn) * 1e-3),
        magY: (Number((data >> 152n) & 0xFFFFn) * 1e-3),
        magZ: (Number((data >> 168n) & 0xFFFFn) * 1e-3),
        freqX: Number((data >> 184n) & 0xFFFFn),
        freqY: Number((data >> 200n) & 0xFFFFn),
        freqZ: Number((data >> 216n) & 0xFFFFn)
    }
    dataStruct.freqX *= dataStruct.fe/dataStruct.Ne;
    dataStruct.freqY *= dataStruct.fe/dataStruct.Ne;
    dataStruct.freqZ *= dataStruct.fe/dataStruct.Ne;
    return dataStruct;
}

module.exports = {
    connectToWebsocket:connectToWebsocket,
    sendPayload:sendPayload,
    takeMeasure:takeMeasure
}