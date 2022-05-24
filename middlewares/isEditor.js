async function isEditor(req, res, next) {
  if (req.user.role.code >= 300) {
    res.locals.editor = true;
    next();
  } else {
    res.locals.editor = false;
    req.session.redirectTo = req.query.redirectTo;
    res.redirect("/");
  }
}
module.exports = isEditor;
