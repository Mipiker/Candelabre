import {csvJSON} from './readLogManager.js'

const NB_BAR = 10

// Fill the table of devices and their respective data values
export async function fillTable(devices) {
    var table = document.getElementById("tabdevice"); 
    var tbody = table.createTBody();
    for(const device of devices) {
        var row = tbody.insertRow();
        row.addEventListener("click", function() {
            window.location.href = `/devices.html?deviceEUI=${device.EUI}`;
        });
        row.insertCell(0).innerHTML = device.EUI;
    }
}

// Search data and create the three bar charts for power, max magnitude and max frequency
export async function createChart(devices, itemX, itemY, itemZ, title) {
    var lastDownlink = (await csvJSON('../log/downlink.csv')).slice(-1)[0];
    var dataX = {};
    var dataY = {};
    var dataZ = {};
    for(const device of devices) {
        var deviceData = await csvJSON(`../log/${device.EUI}.csv`);
        for(const data of deviceData) {
            if(data.date == lastDownlink.date) {
                dataX[device.EUI] = data[itemX];
                dataY[device.EUI] = data[itemY];
                dataZ[device.EUI] = data[itemZ];
                break;
            }
        }
    }
    var {label:labelX, hoverLabel:hoverLabelX, dataBar:dataX} = generateData(dataX);
    var {label:labelY, hoverLabel:hoverLabelY, dataBar:dataY} = generateData(dataY);
    var {label:labelZ, hoverLabel:hoverLabelZ, dataBar:dataZ} = generateData(dataZ);
    displayChart(labelX, hoverLabelX, dataX, 'chartX', `${title} sur l'axe X`, 'rgba(54, 162, 235, 0.5)');
    displayChart(labelY, hoverLabelY, dataY, 'chartY', `${title} sur l'axe Y`, 'rgba(255, 99, 12, 0.5)');
    displayChart(labelZ, hoverLabelZ, dataZ, 'chartZ', `${title} sur l'axe Z`, 'rgba(255, 99, 132, 0.5)');
}

// Create the X and Y axis for a bar chart from a data array 
function generateData(data) {
    var min = Math.min(...Object.values(data));
    var max = Math.max(...Object.values(data));
    var offset = (max - min) / NB_BAR / 2;
    var label = [];
    for(var i = 0; i < NB_BAR; i++) {
        label.push(min + offset + 2 * offset * i);
    }
    var dataBar = new Array(NB_BAR).fill(0);
    var hoverLabel = Array.from({length: NB_BAR}, () => []);
    Object.entries(data).forEach(([key, value]) => {
        dataBar[Math.min(Math.floor((value - min) / (2 * offset)), NB_BAR-1)]++;
        hoverLabel[Math.min(Math.floor((value - min) / (2 * offset)), NB_BAR-1)].push(key);
    });
    return {label, hoverLabel, dataBar};
}

// Create the chart and display it with the given data
function displayChart(label, hoverLabel, data, chartID, title, color) {
    var chart = document.getElementById(chartID).getContext('2d');
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                data: data,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 20
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => hoverLabel[context.parsed.x]
                    },
                }
            },
            scales: {
                x: {
                    grid: {
                        display:false
                    },
                    ticks: {
                        callback: (val) => label[val].toPrecision(3)
                    }
                }
            }
        }
    });
}