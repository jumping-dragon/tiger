const express = require('express');
const router = express.Router();
var gold = new Object();
gold.name = "gold";


router.get('/', (req,res) =>{
    if(req.session.user){
    res.render('index',{
      user : req.session.user
    })
    }
    else{
    res.render('index',{
      user : false
    });
    }
});

router.get('/catalog', (req,res) =>{
    if(req.session.user){
    res.render('resto',{
      user : req.session.user
    })
    }
    else{
    res.render('resto',{
      user : false
    });
    }
});

router.get('/resprofile', (req,res) =>{
    if(req.session.user){
    res.render('resprofile',{
      user : req.session.user
    })
    }
    else{
    res.render('resprofile',{
      user : false
    });
    }
});

router.get('/catalog', (req,res) =>	{
    if(req.session.user){
    res.render('resto',{
      user : req.session.user
    })
    }
    else{
    res.render('resto',{
      user : false
    });
    }
});


router.get('/profile', (req,res) =>{
    if(req.session.user){
    res.render('userprofile',{
      user : req.session.user
    })
    }
    else{
    res.render('userprofile',{
      user : false
    });
    }
});


module.exports = router;