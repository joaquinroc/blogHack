async function isAdmin(req, res, next) {
  if (req.user.role.code >= 400) {
    res.locals.admin = true;
    next();
  } else {
    res.locals.admin = false;
    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/");
  }
}
module.exports = isAdmin;
