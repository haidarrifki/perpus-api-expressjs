var express = require('express'),
    app = express(),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser'),
    koneksi = require('./config/koneksi'),
    logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(1337, () => {
    routes(app)
    console.log('The magic happen on port 1337')
});

module.exports = app;
