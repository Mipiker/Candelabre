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
    displayChart(labelX, hoverLabelX, dataX, 'chartX', `${title} sur l'axe X`, 'rgba(54, 162, 235, 0.5)');
    displayChart(labelY, hoverLabelY, dataY, 'chartY', `${title} sur l'axe Y`, 'rgba(255, 99, 12, 0.5)');
    displayChart(labelZ, hoverLabelZ, dataZ, 'chartZ', `${title} sur l'axe Z`, 'rgba(255, 99, 132, 0.5)');
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);

// Function to handle search input
function handleSearch() {
    const searchText = searchInput.value.toLowerCase(); // Get the search text
    const listItems = document.querySelectorAll('.dynamic-downlink-list li'); // Get all list items

    console.log('coucou');
    listItems.forEach(item => {
        const text = item.textContent.toLowerCase(); // Get text content of each list item
        if (text.includes(searchText)) {
            item.style.display = 'block'; // Show the item if it matches the search
        } else {
            item.style.display = 'none'; // Hide the item if it doesn't match the search
        }
    });
}