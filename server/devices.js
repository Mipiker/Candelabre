import {csvJSON} from './readLogManager.js'

var selectedDevice = document.getElementById('device-selection');
var lastConnection = document.createElement("p");

var ctx1 = document.getElementById('average-chart').getContext('2d');

var graph = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [''],
        datasets: [{
            label: 'Moyenne X',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderWidth: 0
        },
        {
            label: 'Moyenne Y',
            data: [],
            backgroundColor: 'rgba(255, 99, 12, 0.5)',
            borderWidth: 0
        },
        {
            label: 'Moyenne Z',
            data: [],
            backgroundColor: 'rgba(243, 128, 255, 0.8)',
            borderWidth: 0
        }],
    }
});

// When the page is loaded
document.addEventListener("DOMContentLoaded", async function () {
    // Generate the device list
    await generateEUIList();
    // Preselect a device is needed
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDeviceEUI = urlParams.get('deviceEUI');
    if (selectedDeviceEUI) {
        preselectDevice(selectedDeviceEUI);
    }
});

// Generate the device list dynamically from the file devices.csv when the page is loaded
async function generateEUIList() {
    var devices = await csvJSON('../log/devices.csv');
    var container = document.getElementById("dynamic-device-list");
    var ul = document.createElement("ul");
    for(const device of devices) {
        var li = document.createElement("li");
        li.textContent = device.EUI;
        li.addEventListener("click", function() {
            deviceSelected(device)
        });
        ul.appendChild(li);
    }
    container.appendChild(ul);
}

// Display the device informations when selected
async function deviceSelected(device) {
    var deviceInfo = document.getElementById('device-info');
    var deviceLog = await csvJSON(`../log/${device.EUI}.csv`)
    selectedDevice.textContent = `Informations de l'appareil ${device.EUI}`;
    lastConnection.textContent = `Dernière connection le ${deviceLog.slice(-1)[0].date}`;
    deviceInfo.appendChild(lastConnection);
    updateURLParameter('deviceEUI', device.EUI);
}

// Preselect the device based on the URL parameter
function preselectDevice(deviceEUI) {
    const devicesList = document.getElementById("dynamic-device-list").getElementsByTagName("li");
    for (const deviceElement of devicesList) {
        if (deviceElement.textContent === deviceEUI) {
            deviceElement.click();
            break;
        }
    }
}

// Update a URL parameter
function updateURLParameter(key, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    const newURL = window.location.pathname + '?' + urlParams.toString();
    window.history.replaceState({}, '', newURL);
}