const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', gamesController.getAll);
router.post('/', isAuthenticated, gamesController.createGame);
router.put('/:id', isAuthenticated, gamesController.updateGame);
router.delete('/:id', isAuthenticated, gamesController.deleteGame);

module.exports = router;