const csv = require('csvtojson');
const fs = require('fs');

// Return a list of all devices EUI
async function getDevices() {
    return await csv().fromFile('./log/devices.csv');
}

// Save data corresponding to the device EUI
async function saveData(EUI, data) {
    const path = `./log/${EUI}.csv`;
    const newCsvLine = (fileHasNewLine(path) ? '' : '\n') + Object.values(data).join(',') + '\n';
    fs.appendFile(path, newCsvLine, 'utf8', (err) => {
        if (err) {
            console.error(`Error saving data of device ${EUI}:`, err);
            return;
        }
        console.log(`Data of device ${EUI} saved successfully`);
    });
}

// Return data history of device EUI
async function getData(EUI) {
    return await csv().fromFile(`./log/${EUI}.csv`);
}

// Save the downlink date
async function saveDownlink(date) {
    const path = './log/downlink.csv';
    const newCsvLine = (fileHasNewLine(path) ? '' : '\n') + date.toUTCString() + '\n';
    fs.appendFile(path, newCsvLine, 'utf8', (err) => {
        if (err) {
            console.error(`Error saving ${date.toUTCString()} downlink :`, err);
            return;
        }
        console.log(`Downlink ${date.toUTCString()} saved successfully`);
    });
}

// Return all downlink dates
async function getDownlink() {
    return await csv().fromFile('./log/downlink.csv');
}

// Return if the end of the file has a new line 
function fileHasNewLine(path) {
    const buffer = Buffer.alloc(1);
    const fileDescriptor = fs.openSync(path, 'r');
    const bytesRead = fs.readSync(fileDescriptor, buffer, 0, 1, fs.statSync(path).size - 1);
    fs.closeSync(fileDescriptor);
    return bytesRead === 1 && buffer.toString() === '\n';
}

module.exports = {
    getDevices:getDevices,
    saveData:saveData,
    getData:getData,
    saveDownlink:saveDownlink,
    getDownlink:getDownlink
}