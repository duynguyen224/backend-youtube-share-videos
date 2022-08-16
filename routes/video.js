const videoController = require('../controllers/VideoController');
const router = require('express').Router();

router.get('/', videoController.getList);
router.post('/create-video', videoController.createVideo);
router.get('/search-video', videoController.findByName);

module.exports = router;