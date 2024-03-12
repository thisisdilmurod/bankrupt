const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const authConfig = require('./controllers/authController');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authConfig.session);
app.use(authConfig.middleware);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.format({
        html: function () {
            res.render('error', {
                status: err.status,
                message: err.message,
                error: err,
                url: req.url,
            });
        },
        json: function () {
            res.json({
                status: err.status,
                message: err.message,
                error: err,
                url: req.url,
            });
        },
        default: function () {
            res.type('txt').send(err.message);
        },
    });
});

app.listen(port, function () {
    console.log(`Listening on port ${port}.`);
});