const WebSocket = require('ws');

const uri = 'wss://eu1.loriot.io/app?token=vnop3gAAAA1ldTEubG9yaW90LmlvULNu1IIiBz1KvdF2U4Rnbw==';
let websocket;

async function connectToWebsocket() {
    
    websocket = new WebSocket(uri);

    websocket.on('open', function () {
        console.log('Connected to the loriot server');
    });

    websocket.on('message', function (data) {
        const obj = JSON.parse(data.toString());
        console.log(`CMD:${obj.cmd} | EUI:${obj.EUI} | DATA:${obj.data}`);
    });

    websocket.on('close', function (code, reason) {
        console.log(`Loriot server disconnected with code: ${code}, reason: ${reason}`);
    });

    websocket.on('error', function (error) {
        console.error('Loriot websocket error:', error);
    });
}

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

function takeMeasure(EUI, fe, Ne) {
    data = Ne.toString(16).padStart(4, '0');
    data += fe.toString(16).padStart(2, '0');
    sendPayload(EUI, 1, data);
}

module.exports = {
    connectToWebsocket:connectToWebsocket,
    sendPayload:sendPayload,
    takeMeasure:takeMeasure
}