import {csvJSON} from './readLogManager.js'

var Z=[];
var B=[];
var C=[];
var Zo=[];
var Bo=[];
var Co=[];
var a=1;


function diviserEnPlages(liste, nombreDePlages) {
    // Trouver la valeur minimale et maximale dans la liste
    const min = Math.min(...liste);
    const max = Math.max(...liste);

    // Calculer la largeur de chaque plage
    const largeurPlage = (max - min+1) / nombreDePlages;

    // Initialiser les listes de plages et de comptages
    const plages = [];
    const compteurs = new Array(nombreDePlages).fill(0);

    // Remplir la liste des plages
    for (let i = 0; i < nombreDePlages; i++) {
        const plageMin = min + i * largeurPlage;
        const plageMax = min + (i + 1) * largeurPlage;
        plages.push([plageMin, plageMax]);
    }

    // Compter le nombre de valeurs dans chaque plage
    for (const valeur of liste) {
        for (let i = 0; i < nombreDePlages; i++) {
            if (valeur >= plages[i][0] && valeur < plages[i][1]) {
                compteurs[i]++;
                break;  // Une valeur ne peut appartenir qu'à une seule plage
            }
        }
    }

    return { plages, compteurs };
}






//ajout de ligne dans notre tableau de page
async function ajoutLigneTableau() {
    var table = document.getElementById("tabdevice");
    const devices = await csvJSON('../log/devices.csv');   
    var tbody = table.createTBody();

    // Boucle sur les appareils pour insérer une ligne pour chaque appareil
    devices.forEach((device, index) => {
        var row = tbody.insertRow();
        row.addEventListener("click", function() {
            window.location.href = `/devices.html?deviceEUI=${device.EUI}`;
        });
        
        // Insertion des valeurs dans les cellules
        var appareil = row.insertCell(0);
        appareil.innerHTML = device.EUI; // Assurez-vous que EUI est la propriété correcte de votre objet device
    });
}


ajoutLigneTableau();


// ajout des listes dans les devices 
try {
    const result = (await csvJSON('../log/0080E115000A9B3C.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.freqX);
        B.push(result.freqY);
        C.push(result.freqZ);
    }
 

} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}

try {
    const result = (await csvJSON('../log/0080E115000ADBE9.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.freqX);
        B.push(result.freqY);
        C.push(result.freqZ);
    }

} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}

try {
    const result = (await csvJSON('../log/0080E115000AC899.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.freqX);
        B.push(result.freqY);
        C.push(result.freqZ);
    }


} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}



try {
    const result = (await csvJSON('../log/0080E115000ACF0E.csv')).slice(-1)[0];
    const date= (await csvJSON('../log/downlink.csv')).slice(-1)[0].date;
    if(result.date==date){
        Z.push(result.freqX);
        B.push(result.freqY);
        C.push(result.freqZ);
    }
} catch (error) {
    console.error('Erreur lors de l\'affichage des devices :', error);
}
console.log(Z);

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
                    text:"Fréquence de l'amplitude  selon l'axe y"
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
                title: {
                    display: true,
                    text: "Fréquence de l'amplitude  selon l'axe x"
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
                            return; // Par exemple, afficher directement la valeur de l'axe x
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
           
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
                    text:"Fréquence de l'amplitude  selon l'axe z"
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



