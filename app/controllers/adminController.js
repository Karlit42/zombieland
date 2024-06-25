import Utilisateur from '../models/Utilisateur.js';
import Attraction from '../models/Attraction.js';
import Commande from '../models/Commande.js';

const adminController = {

    profil: async function(req, res) {

    // Pagination pour les attractions
    const pageAttractions = req.query.pageAttractions ? parseInt(req.query.pageAttractions) : 1;
    const limitAttractions = 5;
    const offsetAttractions = (pageAttractions - 1) * limitAttractions;

    // Pagination pour les utilisateurs
    const pageUtilisateurs = req.query.pageUtilisateurs ? parseInt(req.query.pageUtilisateurs) : 1;
    const limitUtilisateurs = 5;
    const offsetUtilisateurs = (pageUtilisateurs - 1) * limitUtilisateurs;

    // Pagination pour les commandes
    const pageCommande = req.query.pageCommande ? parseInt(req.query.pageCommande) : 1;
    const limitCommande = 5;
    const offsetCommande = (pageCommande - 1) * limitCommande;


    try {
        // Récupération des données utilisateur pour la session
        const id = req.session.userId;
        const user = await Utilisateur.findById(id);

        // Appel des attractions et utilisateurs avec pagination
        const resultAttractions = await Attraction.findAllPagination(limitAttractions, offsetAttractions);
        const resultUtilisateurs = await Utilisateur.findAllPagination(limitUtilisateurs, offsetUtilisateurs);
        const resultCommande = await Commande.findAllPagination(limitCommande, offsetCommande);


        res.render('admin', {
            user,
            attractions: resultAttractions,
            currentPageAttractions: pageAttractions,
            hasNextPageAttractions: resultAttractions.rows.length === limitAttractions,
            nextPageAttractions: pageAttractions + 1,
            previousPageAttractions: pageAttractions - 1,
            hasPreviousPageAttractions: pageAttractions > 1,
            utilisateurs: resultUtilisateurs,
            currentPageUtilisateurs: pageUtilisateurs,
            hasNextPageUtilisateurs: resultUtilisateurs.rows.length === limitUtilisateurs,
            nextPageUtilisateurs: pageUtilisateurs + 1,
            previousPageUtilisateurs: pageUtilisateurs - 1,
            hasPreviousPageUtilisateurs: pageUtilisateurs > 1,
            commande: resultCommande,
            currentPageCommande: pageCommande,
            hasNextPageCommande: resultCommande.rows.length === limitCommande,
            nextPageCommande: pageCommande + 1,
            previousPageCommande: pageCommande - 1,
            hasPreviousPageCommande: pageCommande > 1
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de la page profil :', error);
        // Envoyez une réponse d'erreur à l'utilisateur
        // res.status(500).render('error');
        res.render('error', { error : error.message });
    }
  },

    deleteAccount: async function(req, res) {
        

        try {
            const idUser = req.body.idUser
            await Utilisateur.delete(idUser);

            res.redirect('/admin');
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
            res.status(500).render('user', { alert: 'Erreur lors de la suppression du compte.' });
        }
    },

    adminAccount: async function(req, res) {
        

        try {
            const idUser = req.body.idUserAdmin
            const id = parseInt(idUser)
            console.log(id);

            await Utilisateur.makeAdmin(id);

            res.redirect('/admin');
        } catch (error) {
            res.render('error', { error: error.message });
        }
    },

    // reservationsModifier: function(req, res) {
    //     res.write ('<h1>Welcome to my modifier la reservation</h1>')
    // },

    // messagerie: function(req, res) {
    //     res.write ('<h1>Welcome to my messagerie</h1>')
    // },

    // attractions: function(req, res) {
    //     res.write ('<h1>Welcome to my attractions wow</h1>')
    // },

    // attractionsModifier: function(req, res) {
    //     res.write ('<h1>Welcome to my modifier l\'attraction ma belle</h1>')
    // },

    // membres: function(req, res) {
    //     res.write ('<h1>Welcome to my membres</h1>')
    // },

    // membresModifier: function(req, res) {
    //     res.write ('<h1>Welcome to my modifier le membre</h1>')
    // },
};

export default adminController;