const router = require('express').Router();
const passport = require('passport');

// RUTA LOGIN
router.get('/login', passport.authenticate('github'));

// RUTA CALLBACK
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs',
    successRedirect: '/api-docs'
}));

// RUTA LOGOUT
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/api-docs'); // Redirige a docs tras salir
    });
});

module.exports = router;