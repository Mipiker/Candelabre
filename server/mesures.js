import {csvJSON} from './readLogManager.js'


async function ajouterDevices(EUI){
    var X=[];
    var Y=[];
    var Z=[];
    var V=[];
    var S=[];
    var T=[];
    var L=[];
    var M=[];
    var N=[];
    var W=[];
    try {
        const result = (await csvJSON(EUI));
        const downlinks= (await csvJSON('../log/downlink.csv'));
        result.forEach((measure) => {
            downlinks.forEach((downlink) => {
                if(downlink.date==measure.date){
                    W.push(downlink.wind);
                    X.push(measure.magX);
                    Y.push(measure.magY);
                    Z.push(measure.magZ);
                    S.push(measure.pX);
                    T.push(measure.pY);
                    V.push(measure.pZ);
                    L.push(measure.freqX);
                    M.push(measure.freqY);
                    N.push(measure.freqZ);
                }
                });
            });    
    }
     catch (error) {
        console.error('Erreur lors de l\'affichage des devices :', error);
    }
    return{wind: W, resX: X, resY: Y, resZ:Z, puiX:S, puiY:T, puiZ: V, fX:L, fY:M, fZ:N};


}



function getRandomColor() {
    var hue = Math.floor(Math.random() * 360); // génère une teinte aléatoire entre 0 et 360
    var saturation = '75%'; // fixe la saturation à 75%
    var lightness = '50%'; // fixe la luminosité à 50%
    var color = 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')'; // crée une couleur HSL
    return color;
  }

async function graph(){
    var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
    const devices = await csvJSON('../log/devices.csv');
    var ctx1 = document.getElementById('graphique1').getContext('2d');
    var ctx2 = document.getElementById('graphique2').getContext('2d');
    var ctx3 = document.getElementById('graphique3').getContext('2d');
    var ctx4 = document.getElementById('graphique4').getContext('2d');
    var ctx5 = document.getElementById('graphique5').getContext('2d');
    var ctx6 = document.getElementById('graphique6').getContext('2d');
    var ctx7 = document.getElementById('graphique7').getContext('2d');
    var ctx8 = document.getElementById('graphique8').getContext('2d');
    var ctx9 = document.getElementById('graphique9').getContext('2d');
    var dataX = [];
    var dataY = [];
    var dataZ = [];
    var datapX = [];
    var datapY = [];
    var datapZ = [];
    var datafX = [];
    var datafY = [];
    var datafZ = [];
  
    const promises = devices.map(async (device) => {
      var Ap = (await ajouterDevices(`../log/${device.EUI}.csv`)).wind;
      var X = (await ajouterDevices(`../log/${device.EUI}.csv`)).resX;
      var Y = (await ajouterDevices(`../log/${device.EUI}.csv`)).resY;
      var Z = (await ajouterDevices(`../log/${device.EUI}.csv`)).resZ;
      var pX = (await ajouterDevices(`../log/${device.EUI}.csv`)).puiX;
      var pY = (await ajouterDevices(`../log/${device.EUI}.csv`)).puiY;
      var pZ = (await ajouterDevices(`../log/${device.EUI}.csv`)).puiZ;
      var frX = (await ajouterDevices(`../log/${device.EUI}.csv`)).fX;
      var frY = (await ajouterDevices(`../log/${device.EUI}.csv`)).fY;
      var frZ = (await ajouterDevices(`../log/${device.EUI}.csv`)).fZ;
      
      var color= getRandomColor();
      
      dataX.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: X[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      dataY.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: Y[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      dataZ.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: Z[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      datapX.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: pX[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      datapY.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: pY[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      datapZ.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: pZ[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      datafX.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: frX[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      datafY.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: frY[index] })),
        borderColor: color,
        backgroundColor: color,
      });
      datafZ.push({
        label: `${device.EUI}`,
        data: Ap.map((value, index) => ({ x: value, y: frZ[index] })),
        borderColor: color,
        backgroundColor: color,
      });
    });
    
    await Promise.all(promises);
    
    var graphique1 = new Chart(ctx1, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: dataX
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude maximale selon l'axe X"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    var graphique2 = new Chart(ctx2, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: dataY
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude maximale selon l'axe Y"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    var graphique3 = new Chart(ctx3, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: dataZ
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude maximale selon l'axe Z"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
var graphique4 = new Chart(ctx4, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: datapX
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Puissance selon l'axe X"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    var graphique5 = new Chart(ctx5, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: datapY
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Puissance selon l'axe Y"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    var graphique6 = new Chart(ctx6, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: datapZ
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Puissance selon l'axe Z"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var graphique7 = new Chart(ctx7, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: datafX
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude à la fréquence maximale selon l'axe X"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    var graphique8 = new Chart(ctx8, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: datafY
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude à la fréquence maximale selon l'axe Y"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    var graphique9 = new Chart(ctx9, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: datafZ
        },
        options: {
            plugins: {
                title:{
                    display: true,
                    text:"Amplitude à la fréquence maximale selon l'axe Z"
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                    },
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


await graph();