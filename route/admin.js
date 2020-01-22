const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const db = require('./db')
const NodeTable = require("./Nodetables");

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
        return res.redirect('/dashboard/login');
      }
    });
  }
});

router.get("/data", (req, res, next) => {

  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
  console.log(requestQuery);
  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "name",
      dt: 0
    },
    {
      db: "price",
      dt: 1
    },
    {
      db: "description",
      dt: 2
    },
    {
      db: "status",
      dt: 3
    },
    {
      db: "tags",
      dt: 4
    }
  ];

  // our database table name
  // const tableName = "users"

  // Custome SQL query
  const query = "SELECT * FROM products";

  // NodeTable requires table's primary key to work properly
  const primaryKey = "product_id";
  
  const nodeTable = new NodeTable(requestQuery, db, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }

    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});



module.exports = router;