import {fillTable, createChart} from "./barChart.js";
import {csvJSON} from './readLogManager.js'

document.addEventListener("DOMContentLoaded", async function () {
    const devices = await csvJSON('../log/devices.csv');
<<<<<<< HEAD
    

    // Boucle sur les appareils pour insérer une ligne pour chaque appareil
    devices.forEach((device, index) => {
        var row = table.insertRow(index+1);
            row.addEventListener("click", function() {
                window.location.href=`/devices.html?deviceEUI=${device.EUI}`
            
        });
        
        // Insertion des valeurs dans les cellules
        var appareil = row.insertCell(0);
        appareil.innerHTML = device.EUI; // Assurez-vous que EUI est la propriété correcte de votre objet device
    });
}


ajoutLigneTableau();



try {
    const result = (await csvJSON('../log/0080E115000A9B3C.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.magX);
        B.push(result.magY);
        C.push(result.magZ);
    }
   

} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}

try {
    const result = (await csvJSON('../log/0080E115000ADBE9.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.magX);
        B.push(result.magY);
        C.push(result.magZ);
    }
} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}

try {
    const result = (await csvJSON('../log/0080E115000AC899.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.magX);
        B.push(result.magY);
        C.push(result.magZ);
    }
} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}



try {
    const result = (await csvJSON('../log/0080E115000ACF0E.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.magX);
        B.push(result.magY);
        C.push(result.magZ);
    }
} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}
console.log(Z);
console.log(B);
console.log(C);


var Cnew=diviserEnPlages(C, 10).plages;
var Bnew=diviserEnPlages(B, 10).plages;
var Znew=diviserEnPlages(Z, 10).plages;
Co=diviserEnPlages(C, 10).compteurs;
Bo=diviserEnPlages(B, 10).compteurs;
Zo=diviserEnPlages(Z, 10).compteurs;

tabamp();

// fonction qui affiche les camemberts 
function tabamp(){

//definition des contexts, on choisi un affichage à deux dimensions

    var ctx1 = document.getElementById('graphique1').getContext('2d');
    var ctx2 = document.getElementById('graphique2').getContext('2d');
    var ctx3 = document.getElementById('graphique3').getContext('2d');

    var graphique1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: Bnew,
            datasets: [{
                label: 'Axe Y',
                data: Bo,
                backgroundColor: 'rgba(255, 99, 12, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude maximale selon l'axe y"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            // Personnalisez ici la façon dont vous souhaitez afficher les étiquettes
                            return ; // Exemple: Ajouter "Mois" devant chaque étiquette
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var graphique2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: Znew,
            datasets: [{
                label: 'Axe X',
                data: Zo,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude maximale selon l'axe x"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                    ticks: {
                        callback: function(value) {
                            // Personnalisez ici la façon dont vous souhaitez afficher les étiquettes
                            return ; // Exemple: Ajouter "Mois" devant chaque étiquette
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
    var graphique3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels:Cnew,
            datasets: [{
                label: 'Axe Z',
                data: Co,
                backgroundColor: 'rgba(243, 128, 255, 0.8 )',
                borderColor: 'rgba(243, 128, 255, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude maximale selon l'axe z"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                    ticks: {
                        callback: function(value) {
                            // Personnalisez ici la façon dont vous souhaitez afficher les étiquettes
                            return; // Exemple: Ajouter "Mois" devant chaque étiquette
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
                
            }
        }
    });
   
}



=======
    fillTable(devices);
    createChart(devices, 'magX', 'magY', 'magZ', "Nombre d'appareils selon l'amplitude maximale du spectre");
});
>>>>>>> eca09d1ba5459cfd221c45da44dc4669e487b563
