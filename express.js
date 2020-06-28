const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./index.router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(compress());

app.use(helmet());

app.use(
    cors({
        exposedHeaders: ['x-auth-header'],
    }),
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'POST,GET,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', router);

module.exports = app;