const videoController = require('../controllers/VideoController');
const router = require('express').Router();

router.get('/', videoController.getList);
router.get('/count', videoController.countVideos);
router.get('/count-with-search', videoController.countVideosWithSearch);
router.post('/create-video', videoController.createVideo);
router.get('/search-video', videoController.findByName);
router.get('/get-more-with-search', videoController.fetchMoreWithSearch);
router.get('/filter-by-category', videoController.filterByCategory);
router.get('/count-by-category', videoController.countVideoByCategory);
router.get('/get-more-videos', videoController.fetchMoreVideos);


module.exports = router;