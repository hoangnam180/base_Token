import express from 'express';
import path from 'path';
import sessionMiddleware from '../middlewares/session.middleware';
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

export default configViewEngine;