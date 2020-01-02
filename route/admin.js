const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const db = require('./db')

router.get('/', (req,res) =>{
	 res.render('body', { layout: 'admin_layout' });
});

router.get('/dashboard', (req,res) =>{
	 res.render('body', { layout: 'admin_layout' });
});

router.get('/login', (req,res) =>{
	 res.render('login',{ layout: 'blank' });
});

router.get('/register', (req,res) =>{
	 res.render('register',{ layout: 'blank' });
});

router.post('/login', (req,res) =>{
	const {email, password} = req.body;
	console.log("Admin Log-in request by ",email," with password ",password);
	if (email && password) {
		db.query('SELECT * FROM `restaurant-accounts` WHERE email = ? AND `password` = ?', [email, password], function(error, results, fields) {
			console.log(results);
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.user = results[0];
				res.redirect('/admin');
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Email and Password!');
		res.end();
	}
}
);

router.post('/signup', (req,res) =>{
	console.log(req.body);
	const {name, email, password, password2} = req.body;
	let errors = [];
	if(!password){errors.push('Please enter all fields!')};

	/// Verifications
	if(password != password2){errors.push('Password do not match')};
	//ADD OTHERS
	if(errors.length > 0){res.send(errors)}

	//heavy verification
	if(errors <= 0){
	db.query('SELECT * FROM `restaurant-accounts` WHERE email = ? AND `password` = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				errors.push('This Email Has Been Registered')
			} 		
			res.end();
	})

	let restaurant = {
		name : name,
		email : email,
		password : password
	}
	//succeed! registering to database!
    db.query('INSERT INTO `restaurant-accounts` SET ?', restaurant, (err, res) => {
    		 console.log('succeed');
    		 });
   	res.redirect('/admin/login');
	};
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/admin/login');
      }
    });
  }
});





module.exports = router;