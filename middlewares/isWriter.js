async function isWriter(req, res, next) {
  if (req.user.role.code >= 200) {
    res.locals.writer = true;
    next();
  } else {
    res.locals.writer = false;
    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/");
  }
}
module.exports = isWriter;
