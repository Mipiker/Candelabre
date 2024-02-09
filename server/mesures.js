import {csvJSON} from './readLogManager.js'


async function ajouterDevices(EUI){
    var X=[];
    var Y=[];
    var Z=[];
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
                }
                });
            });    
    }
     catch (error) {
        console.error('Erreur lors de l\'affichage des devices :', error);
    }
    return{wind: W, resX: X, resY: Y, resZ:Z};


}

// fonction qui affiche les camemberts 
async function graphX(){

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
    
    
    async function graphY(){

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
   
        async function graphZ(){

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
            
            
        
        
    


await graphX();
await graphY();
await graphZ();


