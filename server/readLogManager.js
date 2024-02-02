export async function afficherdevices(fileeui) {
    try {
        const contents = await (await fetch(fileeui)).text();
        const linesArray = contents.split('\n');
        const sendres = linesArray.slice(-2, -1)[0]; 

        if (sendres) {
            return sendres.split(',');
        } else {
            throw new Error('La ligne spécifique n\'a pas été trouvée');
        }
    } catch (error) {
        console.error('Erreur :', error);
        throw error; // Propager l'erreur pour la gérer en dehors de cette fonction
    }
}
