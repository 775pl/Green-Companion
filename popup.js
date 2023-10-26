document.addEventListener('DOMContentLoaded', function () {
    console.log("Le script est en cours d'exécution");
    const apiUrl = 'https://ecoindex.p.rapidapi.com/v1/ecoindexes?size=50&page=1';

    const headers = {
        'X-RapidAPI-Key': '4f7506cf85msh8e06d119de9750fp14685bjsn604511cca067',
        'X-RapidAPI-Host': 'ecoindex.p.rapidapi.com'
    };

    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.items && data.items.length > 0) {

        const ecoIndex = data.items[0].score;

        let letter;
        let legend;

        if (ecoIndex >= 90) {
            letter = 'A';
            legend = 'Excellent';
        } else if (ecoIndex >= 80) {
            letter = 'B';
            legend = 'Très bien';
        } else if (ecoIndex >= 70) {
            letter = 'C';
            legend = 'Bien';
        } else if (ecoIndex >= 60) {
            letter = 'D';
            legend = 'Assez bien';
        } else if (ecoIndex >= 50) {
            letter = 'E';
            legend = 'Nul';
        } else {
            letter = 'F';
            legend = 'Horrible';
        }

        document.getElementById('eco-index').textContent = letter;
        document.getElementById('legend').textContent = legend;

        const letterColors = {
            'A': '#4CAF50',
            'B': '#34bc6e',
            'C': '#f7ed00',
            'D': '#FFC107',
            'E': '#FF5722',
            'F': '#f01c16'
        };

        const body = document.querySelector('body');

        if (letterColors.hasOwnProperty(letter)) {
            body.className = 'color-theme-' + letter;
        }

    }else {
        console.error('Aucune donnée valide trouvée dans la réponse API.');
    }
    })
    .catch(error => {
        console.error('Erreur lors de la requête API :', error);
    });
});