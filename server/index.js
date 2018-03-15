const express = require('express'),
    app = express(),
    config = require('./config');

app.use('/config', function (req, res, next) {
    res.send({config: true});
});

app.post('/test', function (req, res, next) {
    setTimeout(()=>{
        res.send({test: true, body:req.body});
    },5000)
});

app.use(function (req, res, next) {
    console.error("сработало 404");
    res.send({'not-found': true});
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    err.userMessage = err.userMessage || 'На сервере произошла ошибка';
    if (res.status() == 200)
        res.status(500);
    res.send({'server-error': true});
});

module.exports = app;
