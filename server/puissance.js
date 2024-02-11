import {fillTable, createChart} from "./barChart.js";
import {csvJSON} from './readLogManager.js'

document.addEventListener("DOMContentLoaded", async function () {
    const devices = await csvJSON('../log/devices.csv');
    fillTable(devices);
    createChart(devices, 'pX', 'pY', 'pZ', "Nombre d'appareils selon la puissance");
});