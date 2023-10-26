import { API_KEY } from "./constants.js";

console.log('popup.js works!')

const letterColors = {
    'A': '#4CAF50',
    'B': '#34bc6e',
    'C': '#f7ed00',
    'D': '#FFC107',
    'E': '#FF5722',
    'F': '#f01c16'
};

const elements = [
    document.getElementById('grade'),
    document.getElementById('score'),
    document.getElementById('url'),
    document.getElementById('width'),
    document.getElementById('height'),
    document.getElementById('size'),
    document.getElementById('nodes'),
    document.getElementById('requests'),
    document.getElementById('ges'),
    document.getElementById('water'),
];

const button = document.getElementById('start-button');
const startBox = document.getElementById('start-box');
const loaderBox = document.getElementById('loader-box');
const resultsBox = document.getElementById('results-box');

button.addEventListener('click', async () => {
    console.log("Le script est en cours d'exécution");

    startBox.classList.add('hidden');
    loaderBox.classList.remove('hidden');

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        const tabUrl = new URL(activeTab.url);

        // Faites ce que vous voulez avec l'URL (par exemple, affichez-le dans la console)
        console.log('URL de l\'onglet actif : ' + tabUrl);

        const url = `https://bff.ecoindex.fr/api/results/?url=${tabUrl}`;
        const method = 'GET';
        const headers = {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'ecoindex.p.rapidapi.com'
        };

        const options = { method, headers };

        fetch(url, options)
            .then(res => res.json())
            .then(data => {

                console.log(data);

                loaderBox.classList.add('hidden');
                resultsBox.classList.remove('hidden');

                const result = getResult(data);

                console.log(result);

                if (result) {
                    for (const element of elements) {
                        const key = element.id;
                        const value = result[key];

                        const grandPa = element.parentElement.parentElement;

                        if (value) {
                            grandPa.classList.remove('hidden');
                            element.innerText = value;
                        } else {
                            if (grandPa.tagName === 'TR') {
                                grandPa.classList.add('hidden');
                                element.innerText = '?'
                            }
                        }

                        if (key === 'grade') {
                            element.style.backgroundColor = result.colors;
                        }
                    }
                }

            })
            .catch(err => {
                console.error('Erreur lors de la requête API :', err);
            })
    });

})

const detailsBox = document.getElementById('details-box');

document.getElementById('show-details-button').addEventListener('click', () => {
    detailsBox.classList.remove('hidden');
})

document.getElementById('close-details-button').addEventListener('click', () => {
    detailsBox.classList.add('hidden');
})

document.getElementById('refresh-button').addEventListener('click', () => {
    resultsBox.classList.add('hidden');
    startBox.classList.remove('hidden');
})


function getResult(data) {
    const lastestResult = data['latest-result'];
    const olderResults = data['older-results'];
    const hotsResults = data['host-results'];

    if (lastestResult.date) {
        return lastestResult;
    } else if (olderResults && olderResults.length) {
        return olderResults[0];
    } else if (hotsResults && hotsResults.length) {
        return hotsResults[0];
    } else {
        return null;
    }
}