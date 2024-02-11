import {fillTable, createChart} from "./barChart.js";
import {csvJSON} from './readLogManager.js'

document.addEventListener("DOMContentLoaded", async function () {
    const devices = await csvJSON('../log/devices.csv');
    fillTable(devices);
    createChart(devices, 'magX', 'magY', 'magZ', "Nombre d'appareils selon l'amplitude maximale du spectre");
});