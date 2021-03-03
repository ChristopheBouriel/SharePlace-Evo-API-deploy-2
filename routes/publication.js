const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');

const publicationValidator = require('../middleware/publicationValidator');

router.get('/', accessCheck.getContentLimiter, publicationCtrl.getAllPublications);
router.get('/:id', accessCheck.getContentLimiter, publicationCtrl.getOnePublication);
router.post('/add', accessCheck.postLimiter, auth, publicationValidator, publicationCtrl.addPublication);
router.put('/modify', accessCheck.postLimiter, auth, publicationValidator, publicationCtrl.modifyPost);
router.post('/delete', accessCheck.postLimiter, auth, publicationCtrl.deletePost);
router.put('/read', accessCheck.seeLimiter, auth, publicationCtrl.markAsRead);

module.exports = router;