const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const {mongoURI} = require('./config/keys');
const {truncate, stripTags, formatDate, select, editIcon} = require('./helpers/hbs');

// load models
require('./models/user');
require('./models/Post');

// passport
require('./config/passport')(passport);

// load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const admin = require('./routes/admin');

// map global promise
mongoose.Promise = global.Promise;
// connect to db
mongoose.connect(mongoURI, {
    useMongoClient: true
}).then(() => {
    console.log("mongodb connected");
}).catch(error => {
    console.log(error);
});

const app = express();

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// method-override
app.use(methodOverride('_method'));

// handlebars
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'lottiemoon',
    resave: false,
    saveUninitialized: false
}));

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

// Set global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

// static
app.use(express.static(path.join(__dirname, 'public')));

// AUTH
app.use('/', index);
app.use('/auth', auth);
app.use('/posts', posts);
app.use('/admin', admin);

module.exports = app;