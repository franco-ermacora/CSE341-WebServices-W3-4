const router = require('express').Router();

router.use('/', require('./auth'));
router.use('/categories', require('./categories'));
router.use('/games', require('./games'));
router.use('/', require('swagger-ui-express').setup(require('../swagger.json')));

module.exports = router;