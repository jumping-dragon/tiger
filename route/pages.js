const express = require('express');
const router = express.Router();
const db = require('./db')
const _ = require('lodash');
const crypto = require('crypto');

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

router.get('/cart', (req,res) =>{
    if(req.session.user){
      const query = 'SELECT c.cart_id,c.product_id,c.quantity,c.comments,p.name,p.price,r.full_name,p.picture,r.restaurant_id\
                     FROM user_cart c\
                     INNER JOIN products p \
                     ON c.`product_id` = p.`product_id` \
                     INNER JOIN restaurant_accounts r\
                     ON p.`restaurant_id` = r.`restaurant_id` \
                     WHERE c.`user_id`='+req.session.user.user_id;

      db.query(query, function(error, results, fields) {
        let grouped =  _.groupBy(results, function(car) {
                        return car.full_name;
                      });
        let zhenglihao = Object.keys(grouped).map(i => grouped[i])
        console.log(zhenglihao);

        res.render('cart',{
          cart_load : zhenglihao,
          user : req.session.user,
          success_msg: req.flash('success_msg'),
          error_msg: req.flash('error_msg') 
        })
      });
    }
    else{
    res.redirect(req.prevPath);
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
                   WHERE r.is_open= 1 AND p.restaurant_id= '+req.params.restaurant_id;

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
          if(results.length > 0){
          res.render('resprofile',{
            user : false,
            success_msg: req.flash('success_msg'),
            error_msg: req.flash('error_msg'),
            login_prompt: req.flash('login_prompt'),
            restaurant_load: results
          });
          }
          else{
          res.redirect('/');
          }
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

router.get('/point_machine/:point_value', (req,res) =>{
    crypto.randomBytes(12, function(err, raw) {
      console.log(raw.toString('hex').slice(0,4) + "-" + raw.toString('hex').slice(5,9) + "-"+ raw.toString('hex').slice(10,14));
      let insertCoupon = {
          first : raw.toString('hex').slice(0,4),
          second: raw.toString('hex').slice(5,9),
          third : raw.toString('hex').slice(10,14),
          point_value : req.params.point_value
      }

      db.query('INSERT INTO `points` SET ? ', insertCoupon,  function(error, results, fields) {
        console.log(results);
        if (error) {console.log(error)};
        res.redirect(req.prevPath);
      });
   });
})


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