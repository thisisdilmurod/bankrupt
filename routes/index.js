// Import the required modules
const express = require('express');
const router = express.Router();

// Use the auth route
router.get('/', function (req, res, next) {
    res.redirect('auth/login');
});

module.exports = router;
