import {csvJSON} from './readLogManager.js'

const NB_BAR = 10;
var NB_DOWNLINK_LIST = 5;

// When the page is loaded
document.addEventListener("DOMContentLoaded", async function () {
    // Read all files
    const downlinks = await csvJSON('../log/downlink.csv');
    var devicesData = {};
    for(const device of await csvJSON('../log/devices.csv'))
        devicesData[device.EUI] = await csvJSON(`../log/${device.EUI}.csv`);

    // Display bar charts
    displayAllCharts(downlinks[downlinks.length - 1], devicesData);

    // Add downlink search bar event and create the interractive downlink list
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    fillDownlinkList(downlinks, devicesData);
    window.addEventListener('resize', () => setTimeout(adjustListVisibility, 20));
});

// Fill the list with downlinks and their event when clicked
function fillDownlinkList(downlinks, devicesData) {
    var ul = document.createElement("ul");
    for(const downlink of downlinks) {
        var li = document.createElement("li");
        li.textContent = downlink.date;
        li.addEventListener("click", function() {
            displayAllCharts(downlink, devicesData);

        });
        ul.insertBefore(li, ul.firstChild);
    }
    document.getElementById("dynamic-downlink-list").appendChild(ul);
    adjustListVisibility();
}

// Change the downlink list length based on availability on screen
function adjustListVisibility() {
    const height = document.getElementById('power').height;
    NB_DOWNLINK_LIST = Math.max(Math.floor((height - 36 - 20 - 3 - 8 - 15 - 8 - 3 - 25) / (24 + 5)) - 1, 1);
    var count = 0; 
    document.querySelectorAll('.content li').forEach(item => {
        item.style.display = 'none';
        if (count < NB_DOWNLINK_LIST) {
            item.style.display = 'block';
            count++;
        }
    });
}

// Handle search input and display only a certain number of matches
function handleSearch() {
    var count = 0; 
    document.querySelectorAll('.content li').forEach(item => {
        item.style.display = 'none';
        if (item.textContent.toLowerCase().includes(document.getElementById('searchInput').value.toLowerCase()) && count < NB_DOWNLINK_LIST) {
            item.style.display = 'block';
            count++;
        }
    });
}

// Search and fill the array with the data corresponding to the proper downlink date and item
function getData(downlink, devicesData, item) {
    var data = {};
    for(const EUI in devicesData) {
        for(const d of devicesData[EUI]) {
            if(d.date == downlink.date) {
                data[EUI] = d[item];
                break;
            }
        }
    }
    return data;
}

// Create the X and Y axis for a bar chart from a data array 
function generateChartData(data) {
    var min = Math.min(...Object.values(data));
    var max = Math.max(...Object.values(data));
    var offset = (max - min) / NB_BAR / 2;
    var label = [];
    for(var i = 0; i < NB_BAR; i++)
        label.push(min + offset + 2 * offset * i);
    var dataBar = new Array(NB_BAR).fill(0);
    var hoverLabel = Array.from({length: NB_BAR}, () => []);
    Object.entries(data).forEach(([key, value]) => {
        dataBar[Math.min(Math.floor(offset == 0 ? 0 : (value - min) / (2 * offset)), NB_BAR-1)]++;
        hoverLabel[Math.min(Math.floor(offset == 0 ? 0 : (value - min) / (2 * offset)), NB_BAR-1)].push(key);
    });
    return {label, hoverLabel, dataBar};
}

// Display all the needed charts on this page
function displayAllCharts(downlink, devicesData) {
    // Display title
    document.getElementById('data-date-title').textContent = `Données du ${downlink.date}`;
    // Display power
    const powerXData = getData(downlink, devicesData, 'pX');
    const powerYData = getData(downlink, devicesData, 'pY');
    const powerZData = getData(downlink, devicesData, 'pZ');
    var powerData = {};
    for(const EUI in powerXData)
        powerData[EUI] = Math.sqrt(powerXData[EUI]**2 + powerYData[EUI]**2 + powerZData[EUI]**2);
    const powerChartData = generateChartData(powerData);
    displayChart(powerChartData.label, powerChartData.hoverLabel, powerChartData.dataBar, 'power', "Nombre d'appareils selon la puissance", 'rgba(54, 162, 235, 0.5)');
    // Display max magnitude
    const magnitudeYChartData = generateChartData(getData(downlink, devicesData, 'pY'));
    const magnitudeZChartData = generateChartData(getData(downlink, devicesData, 'pZ'));
    displayChart(magnitudeYChartData.label, magnitudeYChartData.hoverLabel, magnitudeYChartData.dataBar, 'magnitudeY', "Nombre d'appareils selon l'amplitude maximale du spectre sur l'axe Y", 'rgba(54, 162, 235, 0.5)');
    displayChart(magnitudeZChartData.label, magnitudeZChartData.hoverLabel, magnitudeZChartData.dataBar, 'magnitudeZ', "Nombre d'appareils selon l'amplitude maximale du spectre sur l'axe Z", 'rgba(54, 162, 235, 0.5)');
}

// Create or update the chart and display it with the given data
function displayChart(label, hoverLabel, data, chartID, title, color) {
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