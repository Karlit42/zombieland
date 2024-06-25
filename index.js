import * as dotenv from 'dotenv';
import express from 'express';
import router from './app/router.js';
import session from 'express-session';
import isLogged from './app/middlewares/isLogged.js';
import logged from './app/middlewares/logged.js';
import Admin from './app/middlewares/Admin.js';
import isAdmin from './app/middlewares/isAdmin.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(session({
  secret: 'votre_secret_ici',
  resave: false,
  saveUninitialized: false, 
  cookie: { secure: false, 
  maxAge: 24 * 60 * 60 * 1000 } 
}));
app.use(Admin);

app.use(logged);
app.use(router);

app.use(function(req, res, next) {
  res.status(404).render('error', { error: 'Page not found' });
  });

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });