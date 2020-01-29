const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');

const port = 8089
const path =  __dirname +'/public/';

const flash = require('connect-flash');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const session = require('express-session');
const back = require('express-back');

// Express-session Config
app.use(session({
		  genid: (req) => {
		    console.log('Inside the session middleware')
		    console.log(req.sessionID)
		    return uuid() // use UUIDs for session IDs
		  },
          name: '_es_demo', // The name of the cookie
          secret: '1234', // The secret is required, and is used for signing cookies
          resave: false, // Force save of session for each request.
          saveUninitialized: true // Save a session that is new, but has not been modified
}));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', ['./views','./admin_views']);

//STATICS
app.use(express.static('public'))
app.use('/dashboard', express.static('admin_public'))

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Connect flash & express-back
app.use(flash());
app.use(back());
 
// ROUTES
app.use('/', require('./route/pages.js'));
app.use('/users', require('./route/users.js').route);
app.use('/dashboard', require('./route/admin_pages.js'));
app.use('/admin', require('./route/admin.js'));

// API

app.get('/email_api', (req,res) =>{
	var email_api = require('./gmail/email.js');
	console.log(email_api);
    var requ = require('./route/users.js').api;
    email_api.api(requ);
    res.redirect('req.prevPath');
});


app.listen(port, () => {
	console.log(`Server started on port : ${port}!`);
});
