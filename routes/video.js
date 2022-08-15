const videoController = require('../controllers/VideoController');
const router = require('express').Router();

router.post('/create-video', videoController.createVideo);
router.get('/', videoController.getList);
//...

module.exports = router;