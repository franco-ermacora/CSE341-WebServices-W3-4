const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: true
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;