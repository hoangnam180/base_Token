require('dotenv').config()
import express from 'express'
import initWebRoute from './router/index.js'
import configViewEngine from './config/viewEngine'
import morgan from 'morgan'
// import connection from './config/connectDatabase'
const app = express()
const port = process.env.PORT || 3000
const cookieParser = require("cookie-parser");

app.use(morgan("combined"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser('asdfsdgfsdr243234'));

//config view engine
configViewEngine(app)

//init web route
initWebRoute(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})