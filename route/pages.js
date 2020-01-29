const express = require('express');
const router = express.Router();

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

router.get('/resprofile', (req,res) =>{
    if(req.session.user){
    res.render('resprofile',{
      user : req.session.user,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg') 
    })
    }
    else{
    res.render('resprofile',{
      user : false,
      success_msg: req.flash('success_msg'),
      error_msg: req.flash('error_msg') 
    });
    }
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