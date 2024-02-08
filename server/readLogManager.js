// Return the last line of a CSV file
export async function afficherdevices(fileeui) {
  return fetch(fileeui)
      .then(response => {
          if (!response.ok) {
              throw new Error('Erreur de chargement du fichier');
          }
          return response.text();
      })
      .then(contents => {
          const linesArray = contents.split('\n');
          const sendres = linesArray.slice(-2, -1)[0]; // Sélectionne la ligne spécifique du tableau
          if (sendres) {
              return sendres.split(',');
          } else {
              throw new Error('La ligne spécifique n\'a pas été trouvée');
          }
      })
      .catch(error => {
          console.error('Erreur :', error);
          throw error;
      });
}

// Return a JSON from a CSV file
export async function csvJSON(fileEUI){
    var csv = await (await fetch(fileEUI)).text();
    let lines = csv.split("\r\n");
    while(lines.slice(-1) == '') {
        lines = lines.slice(0, -1);
    }
    var result = [];
    var headers = lines[0].split(",");
    for(var i=1; i<lines.length; i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0; j<headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
  }
