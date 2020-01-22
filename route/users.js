const express = require('express');
const router = express.Router();
const db = require('./db')

router.post('/login', (req,res) =>{
	const {email, password} = req.body;
	console.log("Log-in request by ",email," with password ",password);
	if (email && password) {
		db.query('SELECT * FROM `user-accounts` WHERE email = ? AND `password` = ?', [email, password], function(error, results, fields) {
			console.log(results);
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.user = results[0];
				res.redirect('/');
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
	const {name, email, password, password2, phone_number ,student_id} = req.body;
	let errors = [];
	if(!password){errors.push('Please enter all fields!')};

	/// Verifications
	if(password != password2){errors.push('Password do not match')};
	//ADD OTHERS
	if(errors.length > 0){res.send(errors)}

	//heavy verification
	if(errors <= 0){
	db.query('SELECT * FROM `user-accounts` WHERE email = ? AND `password` = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				errors.push('This Email Has Been Registered')
			} 		
			res.end();
	})

	let user = {
		name : name,
		email : email,
		student_id : student_id,
		phone_number : phone_number,
		password : password
	}
	//succeed! registering to database!
    db.query('INSERT INTO `user-accounts` SET ?', user, (err, res) => {
    		 console.log('succeed');
    		 });
   	res.redirect('/');
	};
});

router.post('/forgot', (req,res) =>{
	const {email} = req.body;
	console.log("Forgot request by ",email);
	if (email) {
		db.query('SELECT * FROM `user-accounts` WHERE email = ?', [email], function(error, results, fields) {
			if (results.length > 0) {
				var forgot_user = results[0]
				console.log(forgot_user);
				// req.session.incognito = requ;
				requ.forgot_user_email = forgot_user.email;
				requ.forgot_user_password = forgot_user.password;
				requ.forgot_user_name = forgot_user.name;
				res.redirect('/email_api')
			} else {
				res.send('Email not found!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter email of a registered account');
		res.end();
	}
});



router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

var requ = { forgot_user_name : "",forgot_user_email : "",forgot_user_password : "" };
module.exports.route = router;
module.exports.api = requ;