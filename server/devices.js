import {csvJSON} from './readLogManager.js'

var selectedDevice = document.getElementById('device-selection');
var lastConnection = document.createElement("p");

document.addEventListener("DOMContentLoaded", function () {
    generateEUIList("dynamic-device-list");
});

// Generate the device list dynamically from the file devices.csv
async function generateEUIList(containerId) {

    var devices = await csvJSON('../log/devices.csv');

    var container = document.getElementById(containerId);

    var ul = document.createElement("ul");

    for(const device of devices) {
        var li = document.createElement("li");
        li.textContent = device.EUI;
        li.addEventListener("click", function() {
            deviceClicked(device)
        });
        ul.appendChild(li);
    }

    container.appendChild(ul);
}

async function deviceClicked(device) {
    console.log(device);
    var deviceInfo = document.getElementById('device-info');
    var deviceLog = await csvJSON(`../log/${device.EUI}.csv`)
    selectedDevice.textContent = `Informations de l'appareil ${device.EUI}`;
    lastConnection.textContent = `Dernière connection le ${deviceLog.slice(-1)[0].date}`;
    deviceInfo.appendChild(lastConnection);
}