const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', categoriesController.getAll);
router.post('/', isAuthenticated, categoriesController.createCategory);
router.put('/:id', isAuthenticated, categoriesController.updateCategory);
router.delete('/:id', isAuthenticated, categoriesController.deleteCategory);

module.exports = router;