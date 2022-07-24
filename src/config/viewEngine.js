const express = require('express');
const path = require('path');
const sessionMiddleware = require('../middlewares/session.middleware');
const moment = require("moment");
const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, '../views'))
    app.use((req, res, next) => {
        res.locals.moment = moment;
        next();
    });
    app.use(sessionMiddleware.Session);
}

module.exports = configViewEngine;