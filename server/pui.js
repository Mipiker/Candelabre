//animations boutons
var button = document.querySelector('#frqmax');

        // Ajouter un écouteur d'événement pour détecter le survol
        button.addEventListener('mouseover', function() {
            button.style.backgroundColor = " hsla(0, 1%, 60%, 0.608)";
            button.style.color = "black";
        });

        // Ajouter un écouteur d'événement pour détecter la sortie du survol
        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = "";
            button.style.color = "";
        });

var button1 = document.querySelector('#pui');

        button1.addEventListener('mouseover', function() {
            button1.style.backgroundColor = "hsla(0, 1%, 60%, 0.608)";
            button1.style.color = "black";
        });

        button1.addEventListener('mouseout', function() {
            button1.style.backgroundColor = "";
            button1.style.color = "";
        });
        
    var button2 = document.querySelector('#amp');

        button2.addEventListener('mouseover', function() {
            button2.style.backgroundColor = "hsla(0, 1%, 60%, 0.608)";
            button2.style.color = "black";
        });

        button2.addEventListener('mouseout', function() {
            button2.style.backgroundColor = "";
            button2.style.color = "";
        });
        
var button3 = document.querySelector('#anomalies');

        button3.addEventListener('mouseover', function() {
            button3.style.backgroundColor = "hsla(0, 1%, 60%, 0.608)";
            button3.style.color = "black";
        });

        button3.addEventListener('mouseout', function() {
            button3.style.backgroundColor = "";
            button3.style.color = "";
        });

var button4 = document.querySelector('#devices');

        button4.addEventListener('mouseover', function() {
            button4.style.backgroundColor = "hsla(0, 1%, 60%, 0.608)";
            button4.style.color = "black";
        });

        button4.addEventListener('mouseout', function() {
            button4.style.backgroundColor = "";
            button4.style.color = ""; 
        });
        
var button5 = document.querySelector('#para');

        button5.addEventListener('mouseover', function() {
            button5.style.backgroundColor = "hsla(0, 1%, 60%, 0.608)";
            button5.style.color = "black";
        });

        button5.addEventListener('mouseout', function() {
            button5.style.backgroundColor = "";
            button5.style.color = "";
        });

let A=[3,0,1,2,7];
let B=[0,0,0,0,10];
let C=[6,1,1,1,0];
// animations boutons terminée. Maintenant on passe à l'affichage des graphiques et des canvas.
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
                data: A,
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

tabpui();



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