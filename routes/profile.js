const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const profileCtrl = require('../controllers/profile');
const profileValidator = require('../middleware/profileValidator');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/:userName', accessCheck.seeProfileLimiter, profileCtrl.seeProfile);
router.put('/modify', accessCheck.seeProfileLimiter, auth, profileValidator, profileCtrl.modifyProfile);
router.get('/notifications/:userName', accessCheck.seeProfileLimiter, profileCtrl.getNotifications);
router.post('/picture', multer, auth, profileCtrl.loadPicture);
router.put('/picture/delete', auth, profileCtrl.deletePicture);

module.exports = router;