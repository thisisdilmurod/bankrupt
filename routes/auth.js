const router = require('express').Router();
const authController = require('../controllers/authController');

router.get("/login", authController.login);
router.get('/logout', authController.logout);
router.post('/login', authController.verify);

module.exports = router;
