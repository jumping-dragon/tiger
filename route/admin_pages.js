const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const db = require('./db')

router.get('/', (req,res) =>{
    // if(req.session.user){
    res.render('body',{
      user : req.session.user,
      layout: 'admin_layout'
    })
    // }
    // else{
    // res.redirect('/dashboard/login')
    // }
});

router.get('/analytics', (req,res) =>{
	if(req.session.user){
    res.render('body',{
      user : req.session.user,
      layout: 'admin_layout'
    })
    }
    else{
    res.redirect('/dashboard/login')
    }
});

router.get('/manage', (req,res) =>{
	   if(req.session.user){
    res.render('manage',{
      user : req.session.user,
      layout: 'admin_layout'
    })
    }
    else{
    res.redirect('/dashboard/login')
    }
});

router.get('/stocks', (req,res) =>{
	   if(req.session.user){
    res.render('body',{
      user : req.session.user,
      layout: 'admin_layout'
    })
    }
    else{
    res.redirect('/dashboard/login')
    }
});

router.get('/billings', (req,res) =>{
	   if(req.session.user){
    res.render('body',{
      user : req.session.user,
      layout: 'admin_layout'
    })
    }
    else{
    res.redirect('/dashboard/login')
    }
});

router.get('/login', (req,res) =>{
	 res.render('login',{ 
        layout: 'blank' ,
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg') 
    });
});

router.get('/register', (req,res) =>{
	 res.render('register',{ 
    layout: 'blank' ,
    success_msg: req.flash('success_msg'),
    error_msg: req.flash('error_msg') 
    });
});

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

module.exports = router;