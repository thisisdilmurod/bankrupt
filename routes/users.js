// Import the required modules
const router = require('express').Router();
const { restrict } = require('../utils');
const userController = require('../controllers/userController');

// Use the routes
router.use(restrict);
router.get('/', userController.list);
router.get('/add', userController.add);
router.post('/add', userController.save);
router.get('/update/:id', userController.edit);
router.post('/update/:id', userController.update);
router.get('/delete/:id', userController.delete);

module.exports = router;
