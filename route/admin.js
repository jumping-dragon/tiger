const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const db = require('./db')
const knex = require('./knex');
const {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");



router.post('/login', (req,res) =>{
	const {email, password} = req.body;
	console.log("Admin Log-in request by ",email," with password ",password);
	if (email && password) {
		db.query('SELECT * FROM `restaurant_accounts` WHERE email = ? AND `password` = ?', [email, password], function(error, results, fields) {
			console.log(results);
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.user = results[0];
				req.flash('success_msg', 'Successfully Signed In');
				res.redirect('/dashboard');
			} else {
				req.flash('error_msg', 'Incorrect Email and/or Password!');
				res.redirect('/dashboard/login');
			}			
			res.end();
		});
	} else {
		req.flash('error_msg', 'Please enter Email and Password!');
		res.redirect('/dashboard/login');
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
	if(errors.length > 0){
		req.flash('error_msg', errors);
		res.redirect('/dashboard/register');
	}

	//heavy verification
	if(errors <= 0){
	db.query('SELECT * FROM `restaurant_accounts` WHERE email = ? AND `password` = ?', [email, password], function(error, results, fields) {
	console.log(results);
	if (results.length > 0) {
	req.flash('error_msg', 'This Email Has Been Registered!');
	res.redirect('/dashboard/register');
	return
	}		

	let restaurant = {
		name : name,
		email : email,
		password : password
	}
	//succeed! registering to database!
    db.query('INSERT INTO `restaurant_accounts` SET ?', restaurant, (err, result) => {
    		 if(err){return err};
		    console.log(result);
		    req.session.loggedin = true
			req.session.user = restaurant;
		    req.flash('success_msg', 'Successfully Signed In');
		    res.redirect('/dashboard');
		    return
    		});
	})
	};
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.regenerate(function(err) {
   	if(err){return err};
    req.flash('success_msg', 'Successfully Signed Out');
	res.redirect('/dashboard/login');
	})
  }
});

router.get('/api/products', async function(req, res) {
	// The following statement can be removed after the first run (i.e. the database
	// table has been created). It is a good idea to do this to help improve
	// performance.
	await knex.raw( "CREATE TABLE IF NOT EXISTS `products` (\
	`product_id` int(10) NOT NULL auto_increment,\
	`name` varchar(255),\
	`restaurant_id` varchar(255),\
	`price` numeric(9,2),\
	`description` varchar(255),\
	`status` varchar(255),\
	`tags` varchar(255),\
	PRIMARY KEY( `product_id` )\
);" );

	let editor = new Editor(knex, 'products','product_id').fields(
		new Field("name"),
		new Field("restaurant_id"),
		new Field("price"),
		new Field("description"),
		new Field("status"),
		new Field("tags"),
	);

	await editor.process(req.body);
	res.json(editor.data());
});



module.exports = router;