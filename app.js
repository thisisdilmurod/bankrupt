// Import the required modules
const express = require('express');
const path = require('path');
const createError = require("http-errors");
const cookieParser = require('cookie-parser');

// Import the routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const authConfig = require('./controllers/authController');
const usersRouter = require("./routes/users");

// Create the express app
const app = express();
const port = process.env.PORT || 3000;

// Set the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use the required middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Use the routes
app.use(authConfig.session);
app.use(authConfig.middleware);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// Error handling
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status);
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

// Start the server
app.listen(port, function () {
    console.log(`Listening on port ${port}.`);
});