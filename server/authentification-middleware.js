function authentificationMiddleware(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
    res.end();
  } else {
    next();
  }
}

module.exports = authentificationMiddleware;
