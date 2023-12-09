import {afficherdevices} from './readLogManager.js'
var Z=[0,0,0,0];
var B=[0,0,0,0];
var C=[0,0,0,0];
afficherdevices()
    .then(result => {
        Z.push(result[3]);
        B.push(result[4]);
        C.push(result[5]);
        console.log(Z);
        console.log(B);
        console.log(C);
        tabpui();
       
    })
    .catch(error => {
        console.error('Erreur lors de l\'affichage des devices :', error);
    });



function tabpui(){

//definition des contexts, on choisi un affichage à deux dimensions

    var ctx1 = document.getElementById('graphique1').getContext('2d');
    var ctx2 = document.getElementById('graphique2').getContext('2d');
    var ctx3 = document.getElementById('graphique3').getContext('2d');

//ajout graphique 1
    var graphique1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                label: 'Axe Y',
                data: Z,
                backgroundColor: 'rgba(255, 99, 12, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

//ajout graphique 2
    var graphique2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['F', 'G', 'H', 'I', 'J'],
            datasets: [{
                label: 'Axe X',
                data: B,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

//ajout graphique 3
    var graphique3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['F', 'G', 'H', 'I', 'J'],
            datasets: [{
                label: 'Axe Z',
                data: C,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderColor: 'rgba(0, 0, 0, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
   
}





//ajout de ligne dans notre tableau de page

function ajoutLigneTableau(EUI,n){
    var table = document.getElementById("tabdevice");

// on met à la ligne qu'on veut les éléments qu'on cherche à introduire
var row = table.insertRow(n);

// on crée nos variables qui vont entrer dans les cellules
var appareil = row.insertCell(0);
var etat = row.insertCell(1);

// on met le contenu des colonnes
appareil.innerHTML = EUI;
etat.innerHTML = "Connecté";

}

ajoutLigneTableau("561451514545465",1);
ajoutLigneTableau("536144545645644",2);