const express = require('express');
const port = 8000;

const app = express();

const expressLayout = require('express-ejs-layouts');


const cookieParser = require('cookie-parser');



// Create session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// Require mongo-store, so that we can use the existing user even after server start
const MongoStore = require('connect-mongo');

// flsh notification
const flash = require('connect-flash');
const customware = require('./config/flashmiddleware');

// Require Database
const db = require('./config/mongoose');

// Using the asset folder
app.use(express.static('./assets'));

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views')

app.use(expressLayout)

app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
    name: 'ERS',
    secret: 'employeeReviewSystem',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 10)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nandishmohanty:Mohanty1818@cluster0.vugqe6n.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    },(err)=> console.log(err || 'connect mongo set up is ok'))
}))


// Using Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Connect flash
app.use(flash());
app.use(customware.setFlash);


app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`error in connection to the ${port}`);
    }
    console.log(`Successfully connected to the ${port}`);
})