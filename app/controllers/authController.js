import Utilisateur from '../models/Utilisateur.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import isLogged from '../middlewares/isLogged.js';
import { cleanString, isValidName } from '../../public/js/clean.js';

const authController = {

    login: function(req, res) {
        res.render ('login');
    },

    loginAction: async function(req, res) {
        try {
            const email = req.body.email;
            const utilisateur = await Utilisateur.findByEmail(email);

            if (utilisateur) {
                const result = await bcrypt.compare(req.body.password, utilisateur.mot_de_passe);

                if (result) {
                    req.session.isLogged = true;
                    req.session.userId = utilisateur.id;
                    req.session.isAdmin = utilisateur.admin;
                    console.log("req.session.userId", req.session.userId);
                    console.log("données de l'user", utilisateur);
                    console.log("t'es admin ?", req.session.isAdmin);

                    res.redirect('/')
                   
                } else {
                    res.render('login', { alert: 'Mauvais mot de passe' })
                }
            } else {
                throw new Error('Mauvais mot de passe');
            }
            
        } catch (error) {
            res.render('login', { alert: error.message })
        }
    },

    signup: function(req, res) {
        res.render ('register');
    },

    signupAction: async function(req, res) {
        try {
            // j'utilise la destructuration pour récupérer les infos du formulaire
            const { email, password, confirmPassword } = req.body;
            let { name, firstname } = req.body;

            name = cleanString(name);
            firstname = cleanString(firstname);

            //on valide le mot de passe
            const options = { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0 };

            if (!name || !isValidName(name)) {
                throw new Error('Le nom est obligatoire et ne peut contenir que des lettres');
            } else if (!firstname || !isValidName(firstname)) {
                throw new Error('Le prénom est obligatoire et ne peut contenir que des lettres');
            } else if  (!email || !validator.isEmail(email))  {
                throw new Error('l\'email est obligatoire et doit être au format email');
            } else if (!validator.isStrongPassword(password, options)) {
                throw new Error('Le mot de passe doit comporter au moins 6 caractères avec au moins 1 majuscule et 1 minuscule');
            } else if (password !== confirmPassword) {
                throw new Error('Les mot de passe ne correspondent pas')
            }

            //on crée le hash
            const hash = await bcrypt.hash(req.body.password, 10);
            //on crée un nouvel utilisateur avec les infos qu'on a récupéré 
            const user = new Utilisateur({nom: name, prenom: firstname, email: email, mot_de_passe: hash, admin: false})
            user.create();
            console.log(name, email, password);
            console.log("NOUVEL USER CREÉ");
            res.redirect('/connexion');
            // const userSearch = Utilisateur.findByEmail('fezfze@hjfez.com')
            // console.log(userSearch)
        } catch (error) {
            console.error(error);
            res.render('register', { alert: error.message });
        }
    },

    logout: function (req, res) {
        req.session.destroy();
        res.redirect('/');
      },
};

export default authController;