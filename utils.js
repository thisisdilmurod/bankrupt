// Restrict access
const restrict = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/auth/login');
    }
};

// Get the database
const getDb = () => {
    const config = require('./config.json');
    const db = require(config.db);
    return db;
};

// Get the admins
const getAdmins = () => {
    const config = require('./config.json');
    const db = require(config.admins);
    return db;
};

module.exports = {
    restrict,
    getDb,
    getAdmins,
};
