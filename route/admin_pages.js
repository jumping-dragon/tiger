const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const db = require('./db')

router.get('/', (req,res) =>{
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
	   // if(req.session.user){
    res.render('manage',{
      user : req.session.user,
      layout: 'admin_layout'
    })
    // }
    // else{
    // res.redirect('/dashboard/login')
    // }
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

router.get('/gmail', (req,res) =>{
	res.render('body', { layout: 'admin_layout' });
});


router.get('/login', (req,res) =>{
	 res.render('login',{ layout: 'blank' });
});

router.get('/register', (req,res) =>{
	 res.render('register',{ layout: 'blank' });
});



module.exports = router;