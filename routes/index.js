const router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/games', require('./games'));

module.exports = router;