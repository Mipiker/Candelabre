import {csvJSON} from './readLogManager.js'

const NB_BAR = 10

// Fill the table of devices and their respective data values
export async function fillDownlinkList(downlink, devices, itemX, itemY, itemZ, title) {
    var container = document.getElementById("dynamic-downlink-list");
    var ul = document.createElement("ul");
    for(const d of downlink) {
        var li = document.createElement("li");
        li.textContent = d.date;
        li.addEventListener("click", async function() {
            var data = await gatherData(d, devices, itemX, itemY, itemZ);
            var {label:labelX, hoverLabel:hoverLabelX, dataBar:dataX} = data[0];
            var {label:labelY, hoverLabel:hoverLabelY, dataBar:dataY} = data[1];
            var {label:labelZ, hoverLabel:hoverLabelZ, dataBar:dataZ} = data[2];
            displayChart(labelX, hoverLabelX, dataX, 'chartX', `${title} sur l'axe X`, 'rgba(54, 162, 235, 0.5)');
            displayChart(labelY, hoverLabelY, dataY, 'chartY', `${title} sur l'axe Y`, 'rgba(255, 99, 12, 0.5)');
            displayChart(labelZ, hoverLabelZ, dataZ, 'chartZ', `${title} sur l'axe Z`, 'rgba(255, 99, 132, 0.5)');
        });
        ul.insertBefore(li, ul.firstChild);
    }
    container.appendChild(ul);
}

// Search data and create the three bar charts for power, max magnitude and max frequency
export async function gatherData(downlink, devices, itemX, itemY, itemZ) {
    var dataX = {};
    var dataY = {};
    var dataZ = {};
    for(const device of devices) {
        var deviceData = await csvJSON(`../log/${device.EUI}.csv`);
        for(const data of deviceData) {
            if(data.date == downlink.date) {
                dataX[device.EUI] = data[itemX];
                dataY[device.EUI] = data[itemY];
                dataZ[device.EUI] = data[itemZ];
                break;
            }
        }
    }
    return [generateData(dataX), generateData(dataY), generateData(dataZ)];
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
        dataBar[Math.min(Math.floor(offset == 0 ? 0 : (value - min) / (2 * offset)), NB_BAR-1)]++;
        hoverLabel[Math.min(Math.floor(offset == 0 ? 0 : (value - min) / (2 * offset)), NB_BAR-1)].push(key);
    });
    return {label, hoverLabel, dataBar};
}

// Create the chart and display it with the given data
export function displayChart(label, hoverLabel, data, chartID, title, color) {
    var context = document.getElementById(chartID).getContext('2d');
    var chart = Chart.getChart(context);
    if(chart) {
        chart.data.labels = label;
        chart.data.datasets[0].data = data;
        chart.options.scales.x.ticks.callback = (val) => label[val].toPrecision(3);
        chart.options.plugins.tooltip.callbacks.label = (context) => hoverLabel[context.parsed.x];
        chart.update();
    } else {
        new Chart(context, {
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
                            display: false
                        },
                        ticks: {
                            callback: (val) => label[val].toPrecision(3)
                        }
                    }
                }
            }
        });
    }
}