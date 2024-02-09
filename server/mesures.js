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

// fonction qui affiche les camemberts 
async function graphAmplitudeX(){

        var ctx1 = document.getElementById('graphique1').getContext('2d');
        var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
        var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).resX;
        var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
        var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).resX;
        var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
        var F=(await ajouterDevices('../log/0080E115000AC899.csv')).resX;

    
        var graphique1 = new Chart(ctx1, {
            type: 'scatter',
            data: {
                labels:A,
                datasets: [{
                    label: '0080E115000A9B3C',
                    data:B, 
                    borderColor: 'rgba(54, 162, 235, 0.5)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
                {
                    label: '0080E115000ADBE9',
                    data: D.map((value, index) => ({x: value, y: C[index]})),
                    borderColor: 'rgba(255, 99, 12, 0.5)',
                    backgroundColor: 'rgba(255, 99, 12, 0.5)',
                },
                {
                    label: '0080E115000AC899',
                    data: E.map((value, index) => ({x: value, y: F[index]})),
                    borderColor: 'rgba(243, 128, 255, 0.8)',
                backgroundColor: 'rgba(243, 128, 255, 0.8)',
                }
    ]
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
       
    }
    
    
    async function graphAmplitudeY(){

            var ctx2 = document.getElementById('graphique2').getContext('2d');
            var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
            var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).resY;
            var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
            var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).resY;
            var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
            var F=(await ajouterDevices('../log/0080E115000AC899.csv')).resY;
    
        
            var graphique2 = new Chart(ctx2, {
                type: 'scatter',
                data: {
                    labels:A,
                    datasets: [{
                        label: '0080E115000A9B3C',
                        data:B, 
                        borderColor: 'rgba(54, 162, 235, 0.5)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    },
                    {
                        label: '0080E115000ADBE9',
                        data: D.map((value, index) => ({x: value, y: C[index]})),
                        borderColor: 'rgba(255, 99, 12, 0.5)',
                        backgroundColor: 'rgba(255, 99, 12, 0.5)',
                    },
                    {
                        label: '0080E115000AC899',
                        data: E.map((value, index) => ({x: value, y: F[index]})),
                        borderColor: 'rgba(243, 128, 255, 0.8)',
                    backgroundColor: 'rgba(243, 128, 255, 0.8)',
                    }
        ]
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
           
        }
   
        async function graphAmplitudeZ(){

                var ctx3 = document.getElementById('graphique3').getContext('2d');
                var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
                var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).resZ;
                var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
                var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).resZ;
                var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
                var F=(await ajouterDevices('../log/0080E115000AC899.csv')).resZ;
        
            
                var graphique3 = new Chart(ctx3, {
                    type: 'scatter',
                    data: {
                        labels:A,
                        datasets: [{
                            label: '0080E115000A9B3C',
                            data:B, 
                            borderColor: 'rgba(54, 162, 235, 0.5)',
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        },
                        {
                            label:'0080E115000ADBE9',
                            data: D.map((value, index) => ({x: value, y: C[index]})),
                            borderColor: 'rgba(255, 99, 12, 0.5)',
                            backgroundColor: 'rgba(255, 99, 12, 0.5)',
                        },
                        {
                            label: '0080E115000AC899',
                            data: E.map((value, index) => ({x: value, y: F[index]})),
                            borderColor: 'rgba(243, 128, 255, 0.8)',
                        backgroundColor: 'rgba(243, 128, 255, 0.8)',
                        }
            ]
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
               
            }
            
            
        
        
    


await graphAmplitudeX();
await graphAmplitudeY();
await graphAmplitudeZ();



async function graphPuissanceX(){

    var ctx4 = document.getElementById('graphique4').getContext('2d');
    var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
    var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).puiX;
    var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
    var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).puiX;
    var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
    var F=(await ajouterDevices('../log/0080E115000AC899.csv')).puiX;


    var graphique4 = new Chart(ctx4, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: [{
                label: '0080E115000A9B3C',
                data:B, 
                borderColor: 'rgba(54, 162, 235, 0.5)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: '0080E115000ADBE9',
                data: D.map((value, index) => ({x: value, y: C[index]})),
                borderColor: 'rgba(255, 99, 12, 0.5)',
                backgroundColor: 'rgba(255, 99, 12, 0.5)',
            },
            {
                label: '0080E115000AC899',
                data: E.map((value, index) => ({x: value, y: F[index]})),
                borderColor: 'rgba(243, 128, 255, 0.8)',
            backgroundColor: 'rgba(243, 128, 255, 0.8)',
            }
]
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
   
}


async function graphPuissanceY(){

        var ctx5 = document.getElementById('graphique5').getContext('2d');
        var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
        var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).puiY;
        var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
        var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).puiY;
        var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
        var F=(await ajouterDevices('../log/0080E115000AC899.csv')).puiY;

    
        var graphique5 = new Chart(ctx5, {
            type: 'scatter',
            data: {
                labels:A,
                datasets: [{
                    label: '0080E115000A9B3C',
                    data:B, 
                    borderColor: 'rgba(54, 162, 235, 0.5)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
                {
                    label: '0080E115000ADBE9',
                    data: D.map((value, index) => ({x: value, y: C[index]})),
                    borderColor: 'rgba(255, 99, 12, 0.5)',
                    backgroundColor: 'rgba(255, 99, 12, 0.5)',
                },
                {
                    label: '0080E115000AC899',
                    data: E.map((value, index) => ({x: value, y: F[index]})),
                    borderColor: 'rgba(243, 128, 255, 0.8)',
                backgroundColor: 'rgba(243, 128, 255, 0.8)',
                }
    ]
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
       
    }

async function graphPuissanceZ(){

            var ctx6 = document.getElementById('graphique6').getContext('2d');
            var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
            var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).puiZ;
            var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
            var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).puiZ;
            var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
            var F=(await ajouterDevices('../log/0080E115000AC899.csv')).puiZ;
    
        
            var graphique6 = new Chart(ctx6, {
                type: 'scatter',
                data: {
                    labels:A,
                    datasets: [{
                        label: '0080E115000A9B3C',
                        data:B, 
                        borderColor: 'rgba(54, 162, 235, 0.5)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    },
                    {
                        label:'0080E115000ADBE9',
                        data: D.map((value, index) => ({x: value, y: C[index]})),
                        borderColor: 'rgba(255, 99, 12, 0.5)',
                        backgroundColor: 'rgba(255, 99, 12, 0.5)',
                    },
                    {
                        label: '0080E115000AC899',
                        data: E.map((value, index) => ({x: value, y: F[index]})),
                        borderColor: 'rgba(243, 128, 255, 0.8)',
                    backgroundColor: 'rgba(243, 128, 255, 0.8)',
                    }
        ]
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
           
        }
        
        
    
    



await graphPuissanceX();
await graphPuissanceY();
await graphPuissanceZ();

async function graphFreqX(){

    var ctx7 = document.getElementById('graphique7').getContext('2d');
    var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
    var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).fX;
    var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
    var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).puiX;
    var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
    var F=(await ajouterDevices('../log/0080E115000AC899.csv')).puiX;


    var graphique7 = new Chart(ctx7, {
        type: 'scatter',
        data: {
            labels:A,
            datasets: [{
                label: '0080E115000A9B3C',
                data:B, 
                borderColor: 'rgba(54, 162, 235, 0.5)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: '0080E115000ADBE9',
                data: D.map((value, index) => ({x: value, y: C[index]})),
                borderColor: 'rgba(255, 99, 12, 0.5)',
                backgroundColor: 'rgba(255, 99, 12, 0.5)',
            },
            {
                label: '0080E115000AC899',
                data: E.map((value, index) => ({x: value, y: F[index]})),
                borderColor: 'rgba(243, 128, 255, 0.8)',
            backgroundColor: 'rgba(243, 128, 255, 0.8)',
            }
]
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
   
}


async function graphFreqY(){

        var ctx8 = document.getElementById('graphique8').getContext('2d');
        var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
        var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).fY;
        var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
        var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).fY;
        var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
        var F=(await ajouterDevices('../log/0080E115000AC899.csv')).fY;

    
        var graphique8 = new Chart(ctx8, {
            type: 'scatter',
            data: {
                labels:A,
                datasets: [{
                    label: '0080E115000A9B3C',
                    data:B, 
                    borderColor: 'rgba(54, 162, 235, 0.5)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
                {
                    label: '0080E115000ADBE9',
                    data: D.map((value, index) => ({x: value, y: C[index]})),
                    borderColor: 'rgba(255, 99, 12, 0.5)',
                    backgroundColor: 'rgba(255, 99, 12, 0.5)',
                },
                {
                    label: '0080E115000AC899',
                    data: E.map((value, index) => ({x: value, y: F[index]})),
                    borderColor: 'rgba(243, 128, 255, 0.8)',
                backgroundColor: 'rgba(243, 128, 255, 0.8)',
                }
    ]
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
       
    }

    async function graphFreqZ(){

            var ctx9 = document.getElementById('graphique9').getContext('2d');
            var A=(await ajouterDevices('../log/0080E115000A9B3C.csv')).wind;
            var B=(await ajouterDevices('../log/0080E115000A9B3C.csv')).fZ;
            var D=(await ajouterDevices('../log/0080E115000ADBE9.csv')).wind;
            var C=(await ajouterDevices('../log/0080E115000ADBE9.csv')).fZ;
            var E=(await ajouterDevices('../log/0080E115000AC899.csv')).wind;
            var F=(await ajouterDevices('../log/0080E115000AC899.csv')).fZ;
    
        
            var graphique9 = new Chart(ctx9, {
                type: 'scatter',
                data: {
                    labels:A,
                    datasets: [{
                        label: '0080E115000A9B3C',
                        data:B, 
                        borderColor: 'rgba(54, 162, 235, 0.5)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    },
                    {
                        label:'0080E115000ADBE9',
                        data: D.map((value, index) => ({x: value, y: C[index]})),
                        borderColor: 'rgba(255, 99, 12, 0.5)',
                        backgroundColor: 'rgba(255, 99, 12, 0.5)',
                    },
                    {
                        label: '0080E115000AC899',
                        data: E.map((value, index) => ({x: value, y: F[index]})),
                        borderColor: 'rgba(243, 128, 255, 0.8)',
                    backgroundColor: 'rgba(243, 128, 255, 0.8)',
                    }
        ]
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
        
        
    
    



await graphFreqX();
await graphFreqY();
await graphFreqZ();
