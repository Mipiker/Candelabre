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
          throw error; // Propager l'erreur pour la gérer en dehors de cette fonction
      });
}


