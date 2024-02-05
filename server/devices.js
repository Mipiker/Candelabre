import {csvJSON} from './readLogManager.js'

var chart;

// When the page is loaded
document.addEventListener("DOMContentLoaded", async function () {
    // Generate the device list
    await generateDeviceList();
    // Preselect a device is needed
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDeviceEUI = urlParams.get('deviceEUI');
    if (selectedDeviceEUI) {
        preselectDevice(selectedDeviceEUI);
    }
});

// Generate the device list dynamically from the file devices.csv when the page is loaded
async function generateDeviceList() {
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
    var deviceLog = await csvJSON(`../log/${device.EUI}.csv`);
    document.getElementById('selected-device').textContent = `Informations sur l'appareil ${device.EUI}`;
    document.getElementById("selected-device-last-connection").textContent = `Dernière connection le ${deviceLog.slice(-1)[0].date}`;
    document.getElementById("selected-device-coordinates").textContent = `Coordonnées GPS : ${device.latitude}, ${device.longitude}`;
    var element = document.getElementById("selected-device-coordinates");
    element.parentNode.replaceChild(element.cloneNode(true), element);
    document.getElementById("selected-device-coordinates").addEventListener("click", function() {(openGoogleMap(device))});
    updateURLParameter('deviceEUI', device.EUI);

    var XAxis = [];
    var averageX = [];
    var averageY = [];
    var averageZ = [];
    for(const log of deviceLog) {
        XAxis.push(moment(log.date, 'DD/MM/YYYY HH:mm:ss').toDate());
        averageX.push(log.avgX);
        averageY.push(log.avgY);
        averageZ.push(log.avgZ);
    }
    const chartData = {
        labels: XAxis,
        datasets: [{
            label: 'Accélération X',
            data: averageX, 
            borderColor: 'rgba(54, 162, 235, 0.5)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
            label: 'Accélération Y',
            data: averageY,
            borderColor: 'rgba(255, 99, 12, 0.5)',
            backgroundColor: 'rgba(255, 99, 12, 0.5)',
        },
        {
            label: 'Accélération Z',
            data: averageZ,
            borderColor: 'rgba(243, 128, 255, 0.8)',
            backgroundColor: 'rgba(243, 128, 255, 0.8)',
        }]
    }
    if(chart) {
        chart.data = chartData;
        chart.update();
    } else {
        chart = new Chart(document.getElementById('average-chart').getContext('2d'), {
            type: 'line',
            data: chartData,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Accéleration moyenne',
                        font: {
                            size: 20
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        grid: {
                            display:false
                        }
                    }
                }
            }
        });
    }
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

// Open a google map tab with device GPS coordinates
function openGoogleMap(device) {
    window.open(`https://www.google.com/maps?q=${device.latitude},${device.longitude}`);
}