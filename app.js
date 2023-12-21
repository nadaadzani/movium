const express = require('express')
const app = express()
const Controller = require('./controllers/controller')
const UserController = require('./controllers/userController')
const router = require('./routers/index.js')
const session = require('express-session')
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(session({
    secret: 'teehee',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true }
}))

app.use(router)

app.listen(port, () => {
    console.log(`App listening to http://localhost:3000/`)
})