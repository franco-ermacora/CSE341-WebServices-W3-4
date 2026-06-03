const router = require('express').Router();
const passport = require('passport');

// RUTA LOGIN
router.get('/login', passport.authenticate('github'), (req, res) => {});

// RUTA CALLBACK (Esto lo necesita GitHub)
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs',
    sessionSuccessRedirect: '/api-docs' // Redirige a donde está tu Swagger
}), (req, res) => {
    res.status(200).send('Logged in');
});

// RUTA LOGOUT
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/'); // Vuelve al inicio
    });
});

module.exports = router;