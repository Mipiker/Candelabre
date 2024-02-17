import {fillDownlinkList, gatherData, displayChart} from "./barChart.js";
import {csvJSON} from './readLogManager.js'

document.addEventListener("DOMContentLoaded", async function () {
    const devices = await csvJSON('../log/devices.csv');
    const downlink = await csvJSON('../log/downlink.csv');
    const title = "Nombre d'appareils selon la puissance";
    fillDownlinkList(downlink, devices, 'pX', 'pY', 'pZ', title);
    var data = await gatherData(downlink.slice(-1)[0], devices, 'pX', 'pY', 'pZ');
    var {label:labelX, hoverLabel:hoverLabelX, dataBar:dataX} = data[0];
    var {label:labelY, hoverLabel:hoverLabelY, dataBar:dataY} = data[1];
    var {label:labelZ, hoverLabel:hoverLabelZ, dataBar:dataZ} = data[2];
    displayChart(labelX, hoverLabelX, dataX, 'powerX', `${title} sur l'axe X`, 'rgba(54, 162, 235, 0.5)');
    displayChart(labelY, hoverLabelY, dataY, 'powerY', `${title} sur l'axe Y`, 'rgba(255, 99, 12, 0.5)');
    displayChart(labelZ, hoverLabelZ, dataZ, 'powerZ', `${title} sur l'axe Z`, 'rgba(255, 99, 132, 0.5)');

    /* var {label:labelX, hoverLabel:hoverLabelX, dataBar:dataX} = data[0];
    var {label:labelY, hoverLabel:hoverLabelY, dataBar:dataY} = data[1];
    var {label:labelZ, hoverLabel:hoverLabelZ, dataBar:dataZ} = data[2];
    displayChart(labelX, hoverLabelX, dataX, 'magnitudeX', `${title} sur l'axe X`, 'rgba(54, 162, 235, 0.5)');
    displayChart(labelY, hoverLabelY, dataY, 'magnitudeY', `${title} sur l'axe Y`, 'rgba(255, 99, 12, 0.5)');
    displayChart(labelZ, hoverLabelZ, dataZ, 'magnitudeZ', `${title} sur l'axe Z`, 'rgba(255, 99, 132, 0.5)'); */
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);

// Function to handle search input
function handleSearch() {
    const searchText = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll('.content li');
    var count = 0; 
    listItems.forEach(item => {
        item.style.display = 'none';
        if (item.textContent.toLowerCase().includes(searchText) && count < 10) {
            item.style.display = 'block';
            count++;
        }
    });
}