const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/logout', authController.logout);
router.get('/login', authController.login);
router.post('/login', authController.verify);

module.exports = router;
