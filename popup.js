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

button.addEventListener('click', event => {
    console.log("Le script est en cours d'exécution");

    startBox.classList.add('hidden');
    loaderBox.classList.remove('hidden');

    const url = 'https://ecoindex.p.rapidapi.com/v1/ecoindexes?size=50&page=1';
    const method = 'GET';
    const headers = {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'ecoindex.p.rapidapi.com'
    };

    const options = { method, headers };

    fetch(url, options)
        .then(res => res.json())
        .then(data => {

            loaderBox.classList.add('hidden');
            resultsBox.classList.remove('hidden');

            if (data.items.length) {
                const item = data.items[0];

                for (const element of elements) {
                    console.log(element);
                    const key = element.id;
                    const value = item[key];
                    
                    const grandPa = element.parentElement.parentElement;

                    if(value) {
                        grandPa.classList.remove('hidden');
                        element.innerText = value;
                    } else {
                        if(grandPa.tagName === 'TR') {
                            grandPa.classList.add('hidden');
                            element.innerText = '?'
                        }
                    }

                    if (key === 'grade') {
                        element.style.backgroundColor = letterColors[value];
                    }
                }
            }

        })
        .catch(err => {
            console.error('Erreur lors de la requête API :', err);
        })
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
