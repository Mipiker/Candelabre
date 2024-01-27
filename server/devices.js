import {csvJSON} from './readLogManager.js'

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

function deviceClicked(device) {
   console.log(device);
}