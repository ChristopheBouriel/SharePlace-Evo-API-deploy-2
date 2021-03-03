const express = require('express');
const router = express.Router();


const moderateCtrl = require('../controllers/moderate');
const auth = require('../middleware/auth');

router.put('/publication', auth, moderateCtrl.moderatePublication);
router.put('/comment', auth, moderateCtrl.moderateComment);
router.post('/news', moderateCtrl.getNewParticipations);

module.exports = router;