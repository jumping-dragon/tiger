const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const db = require('./db')
const NodeTable = require("./nodetables");
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './temp/uploads/',
  filename: function(req, file, cb){
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      let filename = raw.toString('hex')+ '-' + Date.now() + path.extname(file.originalname);
      cb(null,filename);
    });
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000}
}).single('avatar');

// Init Upload
const product_upload = multer({
  storage: storage,
  limits:{fileSize: 1000000}
}).single('product_picture');

router.post('/login', (req,res) =>{
	const {email, password} = req.body;
	console.log("Admin Log-in request by ",email," with password ",password);
	if (email && password) {
		db.query('SELECT * FROM `restaurant_accounts` WHERE email = ? AND `password` = ?', [email, password], function(error, results, fields) {
			console.log(results);
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.res_user = results[0];
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
});

router.post('/signup', (req,res) =>{
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
	if(errors.length == 0){
  db.query('SELECT * FROM `restaurant_accounts` WHERE email = ?', [email],  function(error, results, fields) {
    console.log(results);
    if (results.length > 0) {
      console.log("DUPLICATE FOUND!");
      req.flash('error_msg', 'This Email Has Been Registered!');
      res.redirect('/dashboard/register');
      return
    }
    else{  
    console.log("CREATING NOW!");
    let restaurant = {
      full_name : name,
      email : email,
      password : password
    };
    //succeed! registering to database!
    db.query('INSERT INTO `restaurant_accounts` SET ?', restaurant, (err, results) => {
          if (err)  throw err;
          console.log("MASUK");
          console.log(results);
          req.session.loggedin = true
          req.session.res_user = restaurant;
          req.flash('success_msg', 'Successfully Signed In');
          res.redirect('/dashboard');
          return
    }); 
    }
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

router.get('/api/orders', function(req, res) {
 // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
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
      db: "order_id",
      dt: 0
    },
    {
      db: "name",
      dt: 1
    },
    {
      db: "quantity",
      dt: 2
    },
    {
      db: "product_id",
      dt: 3
    },
    {
      db: "product_name",
      dt: 4
    },
    {
      db: "timestamp",
      dt: 5
    },
    {
      db: "completed",
      dt: 6
    },
    {
      db: "price",
      dt: 7
    }
  ];

  // our database table name
  // const tableName = "res_users"
  // Custome SQL query

  const query = 'SELECT order_id,u.name,timestamp,o.product_id,quantity,completed,p.name AS product_name,p.price \
   FROM orders o \
   INNER JOIN user_accounts u \
   ON o.`user_id` = u.`user_id` \
   INNER JOIN products p\
   ON o.`product_id` = p.`product_id` \
   WHERE o.restaurant_id='+req.session.res_user.restaurant_id;
  // NodeTable requires table's primary key to work properly
  const primaryKey = "order_id"
  
  const nodeTable = new NodeTable(requestQuery, db, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {throw err }
    // Directly send this data as output to Datatable
    res.send(data)
  })

});

router.post('/order', (req,res) =>{
  
      const {customerID, menuID, orderQuantity} = req.body;
      

      let insertMenu = {
        restaurant_id: req.session.res_user.restaurant_id,
        user_id : customerID,
        product_id : menuID,
        quantity : orderQuantity,
        completed : false
      }

      console.log(insertMenu)
      db.query('INSERT INTO `orders` SET ? ', [insertMenu],  function(error, results, fields) {
        console.log(results);
        res.redirect('/dashboard/');
      });
  
});

router.post('/receipt', (req,res) =>{
  const {orderID} = req.body;
  console.log("deleting order_id :" + orderID);
  let delID = orderID.split(",");
  console.log(delID);
  db.query('DELETE FROM `orders` WHERE (order_id) IN (?) ', [delID],  function(error, results, fields) {
    if(error){throw error};
    res.redirect('/dashboard/');
  });
});

router.post('/profile', (req,res) =>{
  const {restaurantName, restaurantUsername} = req.body;
  
  let updateProfile = {
    full_name : restaurantName,
    username : restaurantUsername
  }

  db.query('UPDATE `restaurant_accounts` SET ? WHERE `restaurant_id` = ?', [updateProfile,req.session.res_user.restaurant_id],  function(err, results, fields) {
    if(err){throw err};
    db.query('SELECT * FROM `restaurant_accounts` WHERE `restaurant_id` = ?', [req.session.res_user.restaurant_id], function(error, results, fields) {
    console.log(results);
    req.session.res_user = results[0];
    res.redirect('/dashboard/manage');
    })
  });
});

router.get('/api/products', function(req, res) {
 // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
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
      db: "restaurant_id",
      dt: 1
    },
    {
      db: "price",
      dt: 2
    },
    {
      db: "description",
      dt: 3
    },
    {
      db: "status",
      dt: 4
    },
    {
      db: "tags",
      dt: 5
    },
    {
      db: "product_id",
      dt: 6
    },
    {
      db: "picture",
      dt: 7
    }
  ];

  // our database table name
  // const tableName = "res_users"
  // Custome SQL query
  const query = 'SELECT * FROM products WHERE restaurant_id='+req.session.res_user.restaurant_id;
  // NodeTable requires table's primary key to work properly
  const primaryKey = "product_id"
  
  const nodeTable = new NodeTable(requestQuery, db, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {throw err }
    // Directly send this data as output to Datatable
    res.send(data)
  })
});

router.post('/update', (req,res) =>{
  product_upload(req, res, (err) => {
      const {menuName, menuPrice, menuDescription, menuTags,menuStatus,menuID} = req.body;
      let status = 0;
      if(menuStatus == 1){
        status = 1;
      }

      let updateMenu = {
        name : menuName,
        price : menuPrice,
        description : menuDescription,
        tags : menuTags,
        status : status
      }

      if(req.file !== undefined){
        updateMenu.picture = req.file.filename
      }

      console.log(updateMenu);
      db.query('UPDATE `products` SET ? WHERE `product_id` = ?', [updateMenu,menuID],  function(error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.redirect('/dashboard/manage');
      });
      
  })
});

router.post('/insert', (req,res) =>{
  product_upload(req, res, (err) => {
      const {menuName, menuPrice, menuDescription, menuTags,menuStatus} = req.body;
      let status = 0;
      let picture_name = "blank_product.png"
      if(menuStatus == 1){
        status = 1;
      }

      if(req.file !== undefined){
        picture_name = req.file.filename
      }

      let insertMenu = {
        name : menuName,
        restaurant_id: req.session.res_user.restaurant_id,
        price : menuPrice,
        description : menuDescription,
        tags : menuTags,
        status : status,
        picture : picture_name
      }

      console.log(insertMenu)
      db.query('INSERT INTO `products` SET ? ', [insertMenu],  function(error, results, fields) {
        console.log(results);
        res.redirect('/dashboard/manage');
      });
  });
});

router.post('/delete', (req,res) =>{
  const {menuID} = req.body;
  console.log("deleting product_id :" + menuID);
  db.query('DELETE FROM `products` WHERE product_id = ? ', [menuID],  function(error, results, fields) {
    if(error){throw error};
    res.redirect('/dashboard/manage');
  });
});

router.post('/security',(req,res) =>{
  upload(req, res, (err) => {
    if(err){throw err};
    const {restaurantEmail} = req.body;

    let updateProfile = {
    email : restaurantEmail,
    picture : req.file.filename
    }

  db.query('UPDATE `restaurant_accounts` SET ? WHERE `restaurant_id` = ?', [updateProfile,req.session.res_user.restaurant_id],  function(err, results, fields) {
    if(err){throw err};
    db.query('SELECT * FROM `restaurant_accounts` WHERE `restaurant_id` = ?', [req.session.res_user.restaurant_id], function(error, results, fields) {
    console.log(results);
    req.session.res_user = results[0];
    res.redirect('/dashboard/manage');
    })
  });
  })
})
module.exports = router;