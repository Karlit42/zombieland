import Commande from "../models/Commande.js";
import Utilisateur from "../models/Utilisateur.js";
import Attraction from "../models/Attraction.js";
import bcrypt from 'bcrypt';
import validator from 'validator';

const userController = {

    profil: async function (req, res) {

        try {
            const id = req.session.userId;
            const user = await Utilisateur.findById(id);

            //Récuperation des réservations

            const commandeUser = await Commande.findByUtilisateur_id(id)

            // exemple de commande (result.rows[0])
        //     const commandeExemple = [{
        //         id : 1,
        //         statut : false,
        //         date_de_reservation : "2024-03-01",
        //         nombre_de_jours : 2,
        //         nombre_de_personnes : 2,
        //         reservation_hotel : 'no',
        //         prix_total : '420.00',
        //         utilisateur_id : 32
        //     },{
        //         id : 2,
        //         statut : true,
        //         date_de_reservation : "2024-03-01",
        //         nombre_de_jours : 2,
        //         nombre_de_personnes : 20,
        //         reservation_hotel : 'yes',
        //         prix_total : '420.00',
        //         utilisateur_id : 32
        //     },{
        //         id : 3,
        //         statut : true,
        //         date_de_reservation : "2024-03-01",
        //         nombre_de_jours : 2,
        //         nombre_de_personnes : 2,
        //         reservation_hotel : 'yes',
        //         prix_total : '420.00',
        //         utilisateur_id : 32
        //     },{
        //         id : 4,
        //         statut : false,
        //         date_de_reservation : "2024-03-01",
        //         nombre_de_jours : 2,
        //         nombre_de_personnes : 2,
        //         reservation_hotel : 'yes',
        //         prix_total : '4200.00',
        //         utilisateur_id : 32
        //     },{
        //         id : 5,
        //         statut : false,
        //         date_de_reservation : "2024-03-01",
        //         nombre_de_jours : 4,
        //         nombre_de_personnes : 2,
        //         reservation_hotel : 'yes',
        //         prix_total : '4020.00',
        //         utilisateur_id : 32
        //     },
        // ]

            res.render('user', { user, commandeUser });
        } catch (error) {
            console.error('Erreur lors de la récupération de la page profil :', error);
            // Envoyez une réponse d'erreur à l'utilisateur
            // res.status(500).render('error');
            res.status(500).render('error', { error });
        }
      },

    profilAction: async function(req, res) {
        try {
            // J'utilise la destructuration pour récupérer les infos du formulaire
            const { name, firstname, email, password, newPassword,  confirmNewPassword } = req.body;

            // Je recupère l'utilisateur qui a le même id que la session actuelle
            const id = req.session.userId;
            const user = await Utilisateur.findById(id);

            const options = { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0 };
            if (!name || !validator.isAlpha(name, 'fr-FR', {ignore: ' '})) {
                throw new Error('Le nom est obligatoire et ne peut contenir que des lettres');
            } else if (!firstname || !validator.isAlpha(firstname, 'fr-FR', {ignore: ' '})) {
                throw new Error('Le prénom est obligatoire et ne peut contenir que des lettres');
            } else if  (!email || !validator.isEmail(email))  {
                throw new Error('l\'email est obligatoire et doit être au format email');
            }

            let hash = user.mot_de_passe; // Par défaut, utilisez l'ancien mot de passe
            if (newPassword) {
                if (!validator.isStrongPassword(newPassword, options)) {
                    throw new Error('Le nouveau mot de passe doit comporter au moins 6 caractères avec au moins 1 majuscule et 1 minuscule');
                }
                if (newPassword !== confirmNewPassword) {
                    throw new Error('Les mots de passe ne correspondent pas');
                }
                hash = await bcrypt.hash(newPassword, 10);
            }

            if (password && newPassword) {
                const result = await bcrypt.compare(password, user.mot_de_passe);
                if (!result) {
                    throw new Error('Mauvais mot de passe actuel');
                }
            }

            const updateUser = new Utilisateur({
                id: user.id,
                nom: name,
                prenom: firstname,
                email: email,
                mot_de_passe: hash,
                admin: user.admin
            });

            await updateUser.update();
            res.redirect('/profil');
        } catch (error) {
            console.error(error);
            res.render('user', { alert: error.message });
        }
    },

    deleteAccount: async function(req, res) {
        try {
            const userId = req.session.userId;
            await Utilisateur.delete(userId);
            req.session.destroy(() => {
                res.redirect('/');
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
            res.status(500).render('user', { alert: 'Erreur lors de la suppression du compte.' });
        }
    },


    reservations: async function(req, res) {

      

        res.redirect('/inscription');
    },
};


export default userController;