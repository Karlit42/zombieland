function Admin(req, res, next) {
    if (req.session.isAdmin == true) {
        res.locals.isAdmin = true;
      } else {
        res.locals.isAdmin = false
      }
    next();
}
  export default Admin;