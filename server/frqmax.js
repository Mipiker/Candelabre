import {afficherdevices} from './readLogManager.js'
var Z=[];
var B=[];
var C=[];
var Zo=[];
var Bo=[];
var Co=[];
var a=1;
function ajoutlisteZ(nb){
    let around = Math.round(nb/a)*a;
    let index = Z.indexOf(around);

    if (index !== -1) {
        Zo[index]++;
    } else {
        Z.push(around);
        Zo.push(1);
    }
}

function ajoutlisteB(nb){
    let around = Math.round(nb/a)*a;
    let index = B.indexOf(around);

    if (index !== -1) {
        Bo[index]++;
    } else {
        B.push(around);
        Bo.push(1);
    }
}

function ajoutlisteC(nb){
    let around = Math.round(nb/a)*a;
    let index = C.indexOf(around);

    if (index !== -1) {
        Co[index]++;
    } else {
        C.push(around);
        Co.push(1);
    }
}


afficherdevices('../log/0080E115000A9B3C.csv')

    .then(result => {
        ajoutlisteZ(result[12]);
        ajoutlisteB(result[13]);
        ajoutlisteC(result[14]);
     
    })
    .catch(error => {
        console.error('Erreur lors de l\'affichage des devices :', error);
    });

    afficherdevices('../log/0080E115000ADBE9.csv')

    .then(result => {
        ajoutlisteZ(result[12]);
        ajoutlisteB(result[13]);
        ajoutlisteC(result[14]);
    })
    .catch(error => {
        console.error('Erreur lors de l\'affichage des devices :', error);
    });

afficherdevices('../log/0080E115000AC899.csv')

    .then(result => {
        ajoutlisteZ(result[12]);
        ajoutlisteB(result[13]);
        ajoutlisteC(result[14]);
    })
    .catch(error => {
        console.error('Erreur lors de l\'affichage des devices :', error);
    });

afficherdevices('../log/0080E115000ACF0E.csv')

 .then(result => {
    ajoutlisteZ(result[12]);
    ajoutlisteB(result[13]);
    ajoutlisteC(result[14]);
    tabamp();       
    })
    .catch(error => {
        console.error('Erreur lors de l\'affichage des devices :', error);
    });

function tabamp(){

//definition des contexts, on choisi un affichage à deux dimensions

    var ctx1 = document.getElementById('graphique1').getContext('2d');
    var ctx2 = document.getElementById('graphique2').getContext('2d');
    var ctx3 = document.getElementById('graphique3').getContext('2d');

//ajout graphique 1
    var graphique1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: B,
            datasets: [{
                label: 'Axe Y',
                data: Bo,
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
            labels: Z,
            datasets: [{
                label: 'Axe X',
                data: Zo,
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
            labels:C,
            datasets: [{
                label: 'Axe Z',
                data: Co,
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