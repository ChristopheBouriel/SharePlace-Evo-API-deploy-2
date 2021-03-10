const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const userCtrl = require('../controllers/user');
const profileValidation = require('../middleware/profileValidator');
const userNameValidator = require('../middleware/userNameValidator');
const pwdCheck = require('../middleware/pwdValidator');
const auth = require('../middleware/auth');

router.post('/signup', accessCheck.accessCreateAccountLimiter, userNameValidator, pwdCheck, profileValidation, userCtrl.testU);
router.post('/login', accessCheck.accessCreateAccountLimiter, userCtrl.login);
router.get('/list', accessCheck.seeProfileLimiter, userCtrl.getAllUsers);

router.put('/changeP', accessCheck.accessCreateAccountLimiter, auth, pwdCheck, userCtrl.modifyPassword);
router.put('/changeU', accessCheck.accessCreateAccountLimiter,auth, userNameValidator, userCtrl.testU);
router.post('/deleteU', accessCheck.deleteAccountLimiter, auth, userCtrl.deleteUserAccount);
router.put('/logout', accessCheck.logOutLimiter, auth, userCtrl.logoutDate);

module.exports = router;