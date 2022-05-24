function makeUserAvailableInViews(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
    res.locals.logged = true;
  } else {
    res.locals.user = { firstname: "", roleId: "", role: { code: "" } };
    res.locals.logged = false;
  }
  next();
}
module.exports = makeUserAvailableInViews;
