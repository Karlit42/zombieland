import Utilisateur from '../models/Utilisateur.js';
import client from '../database.js';
import Attraction from '../models/Attraction.js';
import Categorie from '../models/Categorie.js';
import isLogged from '../middlewares/isLogged.js';
import Commande from '../models/Commande.js';


const mainController = {

    accueil: async function(req, res) {
        try {
            // Exécutez la requête SQL pour récupérer les noms des attractions
            const result = await Attraction.findAll();
            const id = req.session.userId;
            // Appel à l'API Weatherstack
            const parameters = {
                access_key: process.env.ACCESSKEY,
                city: "La Tombe, France",
                units: "m",
                };

            const url = `http://api.weatherstack.com/current?access_key=${parameters.access_key}&query=${parameters.city}&units=${parameters.units}`;

            let fetchOptions = {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache'
            };

            const responseAPI = await fetch(url, fetchOptions);

            if (!responseAPI) {
                throw new Error('Erreur lors de la récupération des données météorologiques');
            }

            const data = await responseAPI.json();

            res.render ('home', { result: result, weatherData: data.current });
            // res.render ('home', { result: result });
        
        } catch (error) {
            console.error('Erreur lors de la récupération des attractions :', error);
            res.render('error', { error });
        }
    },

    attractions: async function(req, res) {
        try {
            // Exécutez les requêtes SQL pour récupérer les noms des attractions et des catégories
            const result = await Attraction.findAll();
            const categorieResult = await Categorie.findAll();

            res.render('attractions', { result: result, categorieResult: categorieResult, });

        } catch (error) {
            console.error('Erreur lors de la récupération des attractions :', error);
            // Envoyez une réponse d'erreur à l'utilisateur
            res.render('error', { error });
        }
    },

    attractionsAction: async function(req, res) {
        try {
            // Je récupère la catégorie sélectionnée depuis le formulaire
            const categorieSelected = req.body.categories;



            // Si aucune catégorie n'est sélectionnée :
            if (!categorieSelected || categorieSelected == 0) {
                const result = await Attraction.findAll();
                const categorieResult = await Categorie.findAll();
                return res.render('attractions', { result, categorieResult });
            }
    
            // Je récupère les attractions correspondant à la catégorie sélectionnée
            const result = await Attraction.findByCategorie(categorieSelected);
            const categorieResult = await Categorie.findAll();
    
            res.render('attractions', { result, categorieResult });

        } catch (error) {
            console.error('Erreur lors de la récupération des attractions filtrées :', error);
            res.status(500).send('Erreur lors de la récupération des attractions filtrées');
        }
    },

    attraction: async function(req, res) {

        try {
            const slug = req.params.slug;
            const result = await Attraction.findBySlug(slug);

            res.render (`attraction`, { result, });
        } catch (error) {
            res.render('error', { error: 'impossible d\'accéder à la page attraction' });
        }  
    },

    legals: function(req, res) {

        res.render('legal-notice')
    },

    reservations: function(req, res) {

        res.render('reservations')
    },

    reservationsAction: async function(req, res) {
        try {
            const isLogged = req.session.isLogged;

            const id = req.session.userId;
            const statut = true;
            const nbJour = req.body.nbJour;
            const hotel = req.body.hotel;
            const nbPerson = req.body.adults;
            const dateRes = req.body.dateRes;

            // créer un nouvel objet Date qui contient la date et l'heure actuelles
            const date = new Date();

            const annee = date.getFullYear();
            const mois = ('0' + (date.getMonth() + 1)).slice(-2);
            const jour = ('0' + date.getDate()).slice(-2);
            const dateJourFormatee = annee + mois + jour;
            const dateResFormatee = dateRes.replace(/-/g, '');

            //récupère les commandes deja enregistrer

            const commandeResult = await Commande.findActiveCommandesByUtilisateurId(id);

            if (!dateResFormatee || dateJourFormatee > dateResFormatee) {
                throw new Error('Vous devez miser sur l\'avenir (choisissez une date valide)');
            } else if (!isLogged) {
                throw new Error('Vous devez être connecté pour réserver');
            } else if (commandeResult) {
                if (commandeResult.rows.length >= 5) {
                    throw new Error('Vous avez atteint la limite de commandes autorisées dans le panier.');
            }}

            // calcul du prix 
            const prixParJourSansHotel = {1: 65, 2: 110, 3: 150, 4: 185};
            const prixParJourAvecHotel = {2: 210, 3: 385, 4: 560};
            const prix = hotel === "yes" ? prixParJourAvecHotel[nbJour] : prixParJourSansHotel[nbJour];
            const totalPrice = prix * nbPerson;
            
            const commande = new Commande({ 
                statut: statut,
                date_de_reservation: dateRes,
                nombre_de_jours: parseInt(nbJour),
                nombre_de_personnes: parseInt(nbPerson),
                reservation_hotel: hotel,
                prix_total: totalPrice,
                utilisateur_id: id 
            });

            await commande.create();

            res.redirect('/panier');

        } catch (error) {

            console.error(error);
            res.render('reservations', { error : error.message, });
        }
    },


    notFound: function (req, res) {
        res.status(404).render('error', {
          message: 'La page demandée n\'a pas été trouvée.',
        });
      }
};

export default mainController;