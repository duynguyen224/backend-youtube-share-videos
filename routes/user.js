const userController = require('../controllers/UserController');
const router = require('express').Router();

router.get('/', userController.getAllUsers);
router.delete('/:id/delete', userController.deleteUser);

module.exports = router;