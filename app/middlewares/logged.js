function logged(req, res, next) {
    if (req.session.isLogged) {
      res.locals.isLogged = true;
    }
    next();
}
  export default logged;