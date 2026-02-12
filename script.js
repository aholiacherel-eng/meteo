const inputVille = document.getElementById('input-ville');
const formRecherche = document.getElementById('form-recherche');
const btnRecherche = document.getElementById('btn-recherche');
const villeNom = document.getElementById('ville-nom');
const meteoInfo = document.getElementById('meteo-info');
const iconeMeteo = document.getElementById('icone-meteo');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidite = document.getElementById('humidite');
const vent = document.getElementById('vent');
const messageErreur = document.getElementById('message-erreur');

const API_KEY = '15d467c83fed5afe8412b7a0cf6fc073';  
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


// Fonction pour récupérer les données météo
async function obtenirMeteo(ville) {
    try {
        // Afficher un état de chargement
        meteoInfo.classList.remove('show');
        messageErreur.classList.remove('show');
        
        // Construire l'URL avec les paramètres
        const url = `${API_URL}?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;
        
        // Faire la requête à l'API
        const response = await fetch(url);
        
        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error('Ville non trouvée');
        }
        
        // Convertir la réponse en JSON
        const data = await response.json();
        
        // Afficher les données
        afficherMeteo(data);
        
    } catch (erreur) {
        // Afficher le message d'erreur
        afficherErreur('Ville non trouvée. Veuillez réessayer.');
    }

}
function afficherMeteo(donnees) {
        // EXPLICATION DE LA STRUCTURE DES DONNÉES :
        // donnees = {
        //   main: { temp: 15.5, humidity: 60 },
        //   weather: [{ description: "nuageux", icon: "04d" }],
        //   wind: { speed: 3.5 },
        //   name: "Paris"
        // }
        
        // 1. EXTRAIRE LES INFORMATIONS
        const temp = Math.round(donnees.main.temp);           // Température arrondie
        const desc = donnees.weather[0].description;          // Description
        const humid = donnees.main.humidity;                  // Humidité (%)
        const vitesseVent = donnees.wind.speed;               // Vitesse du vent (m/s)
        const iconeCode = donnees.weather[0].icon;            // Code de l'icône
        const nomVille = donnees.name;                        // Nom de la ville
        
        // 2. METTRE À JOUR LE DOM (HTML)
        villeNom.textContent = `${nomVille}`;
        temperature.textContent = `${temp}°C`;
        description.textContent = desc;
        humidite.textContent = `${humid}%`;
        vent.textContent = `${vitesseVent} m/s`;
        
        
        // 3. AFFICHER L'ICÔNE MÉTÉO
        // OpenWeatherMap fournit des icônes officielles
        iconeMeteo.src = `https://openweathermap.org/img/wn/${iconeCode}@2x.png`;
        iconeMeteo.alt = desc;
        iconeMeteo.classList.add('show');
        
        // 4. AFFICHER LA SECTION MÉTÉO
        meteoInfo.classList.add('show');
        messageErreur.classList.remove('show');

        
        console.log('✅ Météo affichée pour:', nomVille);
    }

function afficherErreur(message) {
    messageErreur.textContent = message;
    meteoInfo.classList.add('show');
    messageErreur.classList.remove('show');
}

formRecherche.addEventListener('submit', function(e) {
    // 1. Empêcher le rechargement de la page
    e.preventDefault();
    
    // 2. Récupérer la valeur de l'input
    const ville = inputVille.value.trim();
    
    // 3. Vérifier que l'input n'est pas vide
    if (ville === '') {
        afficherErreur('⚠️ Veuillez entrer un nom de ville');
        return;
    }
    
    // 4. Appeler la fonction pour récupérer la météo
    obtenirMeteo(ville);
});

