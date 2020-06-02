//node modules
const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const ejs = require('ejs')
const expressSession = require('express-session')
const flash = require('connect-flash')


//Controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const logoutController = require('./controllers/logout')

//Middleware
const validationMiddleware = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectAuthMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const app = new express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
mongoose.connect('mongodb+srv://gshir326:123456-@cluster0-w5zfz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//express fileupload
app.use(fileUpload())

//express sessions
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userID;
    next()
})

//connect-flash
app.use(flash());

//for heroku deployment
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('App listening on port 4000')
})

//Main Page
app.get('/', homeController)

//Post Page
app.get('/post/:id', getPostController)

//new post page
app.get('/posts/new', authMiddleware, newPostController)

//new user page
app.get('/auth/register', redirectAuthMiddleware, newUserController)

//login user
app.get('/auth/login', redirectAuthMiddleware, loginController)

//logout user
app.get('/auth/logout', logoutController)

//create user
app.post('/users/register', redirectAuthMiddleware, storeUserController)

//create post
app.post('/posts/store', authMiddleware, storePostController)

//login
app.post('/users/login', redirectAuthMiddleware, loginUserController)

//404
app.use((req, res) => res.render('notfound'))
