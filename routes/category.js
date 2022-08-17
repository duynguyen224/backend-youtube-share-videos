const categoryController = require('../controllers/CategoryController');
const router = require('express').Router();

router.get('/', categoryController.getList);

module.exports = router;