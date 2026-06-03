const router = require('express').Router();

router.use('/', require('./auth'));
router.use('/categories', require('./categories'));
router.use('/games', require('./games'));
router.use('/', require('swagger-ui-express').setup(require('../swagger.json')));
router.get('/profile', (req, res) => {
  res.send(req.user || "No hay usuario en sesión");
});

module.exports = router;