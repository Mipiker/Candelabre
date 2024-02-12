import {fillTable, createChart} from "./barChart.js";
import {csvJSON} from './readLogManager.js'

document.addEventListener("DOMContentLoaded", async function () {
    const devices = await csvJSON('../log/devices.csv');
    fillTable(devices);
    createChart(devices, 'freqX', 'freqY', 'freqZ', "Nombre d'appareils selon la fréquence de l'amplitude maximale du spectre");
});