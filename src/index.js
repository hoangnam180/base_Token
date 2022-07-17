require('dotenv').config()
import express from 'express'
import initWebRoute from './router/web'
import configViewEngine from './config/viewEngine'
// import connection from './config/connectDatabase'
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//config view engine
configViewEngine(app)

//init web route
initWebRoute(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})