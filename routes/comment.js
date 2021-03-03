const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const commentCtrl = require('../controllers/comment');
const contentValidator = require('../middleware/commentValidator');
const auth = require('../middleware/auth');

router.post('', accessCheck.getContentLimiter, auth, commentCtrl.getAllComments);
router.post('/add', accessCheck.sendContentLimiter, auth, contentValidator, commentCtrl.addComment);
router.post('/delete', accessCheck.deleteContentLimiter, auth, commentCtrl.deleteComment);
router.put('/modify', accessCheck.sendContentLimiter, auth, contentValidator, commentCtrl.modifyComment);

module.exports = router;