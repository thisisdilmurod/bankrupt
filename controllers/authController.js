const session = require('express-session');
const { loginUser, createUser } = require("../services/authServices");

const authController = {
    session: session({resave: false, saveUninitialized: false, secret: 'wiut-webtech-cw2',}),
    middleware: (req, res, next) => {
        var err = req.session.error;
        var msg = req.session.success;
        var user = req.session.user;
        delete req.session.error;
        delete req.session.success;
        res.locals.message = "";
        res.locals.errMsg = "";
        res.locals.user = {};
        if (err) res.locals.errMsg = err;
        if (msg) res.locals.message = msg;
        if (user) res.locals.user = { name: user.name };
        next();
    },
    logout: (req, res) => {
        req.session.destroy(function () {
            res.redirect('/');
        });
    },
    login: (req, res) => {
        res.render('login');
    },
    verify: (req, res) => {
        if (req.body.create) {
            createUser(req, res);
        } else {
            loginUser(req, res);
        }
    }
}

module.exports = authController;
