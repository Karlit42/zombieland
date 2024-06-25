import Utilisateur from '../models/Utilisateur.js';

async function isAdmin(req, res, next) {

    if (req.session.isAdmin == false) {
      res.status(401).render('error', {
        message: 'Vous n\'êtes pas autorisé à accéder à la page demandée.',
      });
    }
    else {
      next();
    }
  }
  
  export default isAdmin;