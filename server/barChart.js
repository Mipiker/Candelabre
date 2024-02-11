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
    var dataX = [];
    var dataY = [];
    var dataZ = [];
    for(const device of devices) {
        var deviceData = await csvJSON(`../log/${device.EUI}.csv`);
        for(const data of deviceData) {
            if(data.date == lastDownlink.date) {
                dataX.push(data[itemX]);
                dataY.push(data[itemY]);
                dataZ.push(data[itemZ]);
                break;
            }
        }
    }
    var {label:labelX, dataBar:dataX} = generateData(dataX);
    var {label:labelY, dataBar:dataY} = generateData(dataY);
    var {label:labelZ, dataBar:dataZ} = generateData(dataZ);
    displayChart(labelX, dataX, 'chartX', `${title} sur l'axe X`, 'rgba(54, 162, 235, 0.5)');
    displayChart(labelY, dataY, 'chartY', `${title} sur l'axe Y`, 'rgba(255, 99, 12, 0.5)');
    displayChart(labelZ, dataZ, 'chartZ', `${title} sur l'axe Z`, 'rgba(255, 99, 132, 0.5)');
}

// Create the X and Y axis for a bar chart from a data array 
function generateData(data) {
    var min = Math.min(...data);
    var max = Math.max(...data);
    var offset = (max - min) / NB_BAR / 2;
    console.log(`offset ${offset}, min ${min}, max ${max}`);
    console.log(data);
    var label = [];
    for(var i = 0; i < NB_BAR; i++) {
        label.push(min + offset + 2 * offset * i);
    }
    var dataBar = new Array(NB_BAR).fill(0);
    for(const d of data) {
        dataBar[Math.min(Math.floor((d - min) / (2 * offset)), NB_BAR-1)]++;
    }
    console.log(dataBar);
    return {label, dataBar};
}

// Create the chart and display it with the given data
function displayChart(label, data, chartID, title, color) {
    var chart = document.getElementById(chartID).getContext('2d');
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'AAAAAAAAA',
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