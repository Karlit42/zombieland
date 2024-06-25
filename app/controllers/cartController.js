import Commande from "../models/Commande.js";
import Utilisateur from "../models/Utilisateur.js";
import client from "../database.js";
import isLogged from "../middlewares/isLogged.js";

const cartController = {

    panier: async function(req, res) {
        try {
            
            if (!isLogged) {
                throw new Error('Vous devez être connecté pour accéder au panier');
            }
    
            const id = req.session.userId;
            const commandeResult = await Commande.findActiveCommandesByUtilisateurId(id);
            const utilisateurResult = await Utilisateur.findById(id);

            res.render('cart', { utilisateurResult, commandeResult });
            
        } catch (error) {
            console.error(error);
            res.render('error', { error });
        }
    },

    reservationDelete: async function(req, res) {
        try {

            const commandeId = req.body.commande_id;

            Commande.deleteCommande(commandeId);

            res.redirect('/panier');
        } catch (error) {
            res.render('error', { error });
        }
    }, 

    confirmation: async function(req, res) {

        try {
            const id = req.session.userId;
            const result = await Commande.toggleStatutsByUtilisateurId(id);
            console.log(`Statuts des commandes mis à jour :`, result.rows);

            res.redirect('/profil')
          } catch (error) {
            res.render('error', { error });
          }
    },
};

export default cartController;