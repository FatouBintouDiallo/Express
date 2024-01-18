// Import des modules nécessaires
const express = require('express');
const app = express();

// Middleware personnalisé pour vérifier l'heure de la demande
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const Week = now.getDay();
  const hour = now.getHours();

  // Vérifier si c'est un jour ouvrable (du lundi au vendredi) et si c'est entre 9h et 17h
  if (Week >= 1 && Week <= 5 && hour>= 9 && hour < 17) {
    next(); 
  } else {
    res.send('L\'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
};

// Utiliser le middleware pour toutes les routes
app.use(checkWorkingHours);

// Configuration de l'utilisation d'EJS comme moteur de template
app.set('view engine', 'ejs');

// Définir les routes pour les trois pages
app.get('/', (req, res) => {
  res.render('home'); 
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.use(express.static(__dirname +'/public'))

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
