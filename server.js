const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');

const port = 8089
const public_path =  __dirname +'/public/';

const flash = require('connect-flash');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const session = require('express-session');
const back = require('express-back');
const fs = require('fs');
const path = require('path');


// Express-session Config
app.use(
	session({
		  genid: (req) => {
		    return uuid() // use UUIDs for session IDs
		  },    
          name: '_es_demo', // The name of the cookie
          secret: '1234', // The secret is required, and is used for signing cookies
          resave: false, // Force save of session for each request.
          saveUninitialized: true // Save a session that is new, but has not been modified
	})
);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', ['./views','./admin_views']);

//STATICS
app.use(express.static('public'))
app.use(express.static('temp'))
app.use('/dashboard', express.static('admin_public'))
app.use('/dashboard', express.static('temp'))

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Session Checker
app.use(function (req, res, next) {
  if (req.session.viewed) {
  console.log('Known already: ' + req.sessionID)
  }
  else{
  console.log('Inside the session middleware with id: ' + req.sessionID)
  req.session.viewed = 1;
  }
  next()
})


// Connect flash & express-back
app.use(flash());
app.use(back());
 
// ROUTES
app.use('/', require('./route/pages.js'));
app.use('/users', require('./route/users.js').route);
app.use('/dashboard', require('./route/admin_pages.js'));
app.use('/admin', require('./route/admin.js'));

// API

app.get('/reset_temp', (req,res) =>{
	const testFolder = './temp/uploads';
	fs.readdir(testFolder, (err, files) => {
		if (err) throw err;
		files.forEach(file => {
			 if (file != 'blank_product.png' && file != 'blank_profile.jpg'){
			 	console.log(`DELETE ${file}`);
				fs.unlink(path.join(testFolder, file), err => {
	    		if (err) throw err;
	    		});
			 }
		});
		req.flash('success_msg', 'Successfully reset temporary uploads!');
		res.redirect(req.prevPath);
	});
});

app.get('/email_api', (req,res) =>{
	var email_api = require('./gmail/email.js');
	console.log(email_api);
    var requ = require('./route/users.js').api;
    email_api.api(requ);
    res.redirect('req.prevPath');
});



let server = app.listen(port, () => {
	console.log(`Server started on port : ${port}!`);
});


