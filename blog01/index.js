require('dotenv').config()

const express = require('express');
const edge = require('edge.js')
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const cloudinary = require('cloudinary')


const Post = require('./database/models/Post');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout')

const app = new express();
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true});

app.use(connectFlash());

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME
})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))



app.use(fileUpload())

app.use(express.static('public'));

app.use(expressEdge);
app.set('views',`${__dirname}/views`);

app.use('*', (req, res, next) =>{
    edge.global('auth', req.session.userId)
    next()
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//middleware
const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


app.get('/', homePageController);

app.get('/post/:id', getPostController);

app.get('/posts/new', auth ,createPostController);

app.post('/posts/store', auth , storePost, storePostController);

app.get('/auth/register', redirectIfAuthenticated, createUserController);

app.get('/auth/login', redirectIfAuthenticated, loginController);

app.get('/auth/logout' , auth ,logoutController)

app.post('/users/login', redirectIfAuthenticated, loginUserController);

app.post('/users/register', redirectIfAuthenticated, storeUserController);

app.get('/about', (req, res) =>{
    res.render('about');
});

app.get('/contact', (req, res) =>{
    res.render('contact');
});

app.use((req, res) => res.render('not-found'));

console.log('server is start');
app.listen(4000,() =>{
    console.log('app listen on port 4000');
})