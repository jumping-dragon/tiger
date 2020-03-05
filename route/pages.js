const express = require('express');
const router = express.Router();
const db = require('./db')

router.get('/app', (req,res) =>{
    req.flash('success_msg', 'Hello');
    console.log("GOGO");
    console.log(req.prevPath);
    res.redirect(req.prevPath);
});

router.get('/err', (req,res) =>{
    req.flash('error_msg', 'Sorry');
    console.log("GOGO");
    console.log(req.prevPath);
    res.redirect(req.prevPath);
});

router.get('/', (req,res) =>{
    if(req.session.user){
    res.render('index',{
      user : req.session.user,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg') 
    })
    }
    else{
    res.render('index',{
      user : false,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg')
    });
    }
});

router.get('/catalog', (req,res) =>{
    if(req.session.user){
    res.render('resto',{
      user : req.session.user,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg') 
    })
    }
    else{
    res.render('resto',{
      user : false,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg')
    });
    }
});

router.get('/resprofile/:restaurant_id', (req,res) =>{
    const query = 'SELECT p.product_id,p.name,p.description,p.status,p.tags,p.picture,p.price,r.full_name,r.restaurant_id  \
                   FROM products p\
                   INNER JOIN restaurant_accounts r \
                   ON r.`restaurant_id` = p.`restaurant_id` \
                   WHERE p.restaurant_id='+req.params.restaurant_id;

    db.query(query, function(error, results, fields) {
      console.log(results);
      if(req.session.user){
      res.render('resprofile',{
        user : req.session.user,
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg'),
        restaurant_load: results
      })
      }
      else{
      res.render('resprofile',{
        user : false,
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg'),
        login_prompt: req.flash('login_prompt'),
        restaurant_load: results
      });
      }
    });
});

router.get('/catalog', (req,res) =>	{
    if(req.session.user){
    res.render('resto',{
      user : req.session.user,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg') 
    })
    }
    else{
    res.render('resto',{
      user : false,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg')
    });
    }
});


router.get('/profile', (req,res) =>{
    if(req.session.user){
    res.render('userprofile',{
      user : req.session.user,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg') 
    })
    }
    else{
    res.render('userprofile',{
      user : false,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg')
    });
    }
});


module.exports = router;