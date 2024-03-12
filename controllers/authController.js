const hash = require('pbkdf2-password')();
const session = require('express-session');
const { getAdmins } = require('../utils');

// Divide to controllers and services

const controller = {};

controller.session = session({
    resave: false, 
    saveUninitialized: false,
    secret: 'wiut-webtech-cw2',
});

controller.middleware = function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    var user = req.session.user;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    res.locals.errMsg = '';
    res.locals.user = {};
    if (err) res.locals.errMsg = err;
    if (msg) res.locals.message = msg;
    if (user) res.locals.user = { name: user.name };
    next();
};

const saveDb = (data, callback) => {
    var fs = require('fs');
    const config = require('../config.json');
    const writeStream = fs.createWriteStream(config.admins, { flags: 'w', encoding: 'utf8' });
    writeStream.write(JSON.stringify(data, null, 4));
    writeStream.end();

    writeStream.on('error', function (err) {
        callback(err);
    });
    writeStream.on('finish', function () {
        callback();
    });
};


function authenticate(name, pass, fn) {
    if (!module.parent) console.log('Authenticating %s:%s', name, pass);
    var admins = getAdmins();
    var user = admins[name];
    if (!user) return fn(new Error('Cannot find user'));
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === user.hash) return fn(null, user);
        fn(new Error('Invalid password'));
    });
}

controller.logout = function (req, res) {

    req.session.destroy(function () {
        res.redirect('/');
    });
};

controller.login = function (req, res) {
    res.render('login');
};

controller.verify = function (req, res) {
    if (req.body.create) {
        createUser(req, res);
    } else {
        loginUser(req, res);
    }
};

const loginUser = (req, res) => {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {

            req.session.regenerate(function () {
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.name;
                res.redirect('/users/');
            });
        } else {
            req.session.error = 'Authentication failed!';
            res.redirect('/auth/login');
        }
    });
};

const createUser = (req, res) => {
    var admins = getAdmins();

    var user = admins[req.body.username];
    if (!user) {
        hash({ password: req.body.password }, function (err, pass, salt, hash) {
            if (err) throw err;
            admins[req.body.username] = {
                name: req.body.username,
                salt,
                hash,
            };
            saveDb(admins, (err) => {
                if (err) {
                    req.session.error = err.message;
                    res.redirect('/auth/login');
                } else {
                    loginUser(req, res);
                }
            });
        });
    } else {
        req.session.error = 'User already exists!';
        res.redirect('/auth/login');
    }
};

module.exports = controller;
