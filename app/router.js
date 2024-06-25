import express from 'express';
import mainController from './controllers/mainController.js';
import userController from './controllers/userController.js';
import adminController from './controllers/adminController.js';
import cartController from './controllers/cartController.js';
import authController from './controllers/authController.js';
import isLogged from './middlewares/isLogged.js';
import isAdmin from './middlewares/isAdmin.js';
import isNotLogged from './middlewares/isNotLogged.js';

const router = express.Router();

router.get('/', mainController.accueil);

router.get('/connexion', isNotLogged, authController.login);
router.post('/connexion', isNotLogged, authController.loginAction);
router.get('/inscription', isNotLogged, authController.signup);
router.post('/inscription', isNotLogged, authController.signupAction);
router.get('/deconnexion', isLogged, authController.logout);
router.get('/reservations', mainController.reservations);
router.post('/reservations', mainController.reservationsAction);

router.get('/profil', isLogged, userController.profil);
router.post('/profil', isLogged, userController.profilAction);
router.post('/profil/supprimer', isLogged, userController.deleteAccount);
router.get('/profil/reservations', isLogged, userController.reservations);

router.get('/attractions', mainController.attractions);
router.post('/attractions', mainController.attractionsAction);
router.get('/attractions/:slug', mainController.attraction);

router.get('/panier', cartController.panier);
router.post('/panier', isLogged, cartController.reservationDelete);
router.post('/panier/confirmation', isLogged, cartController.confirmation);

router.get('/mentions-legales', mainController.legals);

router.get('/admin', isAdmin, adminController.profil);
router.post('/admin/utilisateur/supprimer', isAdmin, adminController.deleteAccount);
router.post('/admin/utilisateur/admin', isAdmin, adminController.adminAccount);



export default router;