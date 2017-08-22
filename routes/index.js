

var pins=require("../models/scheme");
function ensureAuth(req,res,next){
     if(req.isAuthenticated()){
return next();
     }
     else{
       res.redirect("/");
     }
}
module.exports=function(app,passport){
  //to display all pins
  app.get("/",function(req,res,next){
    pins.User_pin.find({},function(err,doc){
      if(err){console.log(err);}
      else{
        res.render("index",{pin_up:doc});
      }
    });
  });
  //to see pins by uploaded by user
  app.get("/mypins",function(req,res,next){
     pins.User_pin.find({"username":req.user.username},function(err,doc){
      if(err){console.log(err);}
      else{
        res.render("mypins",{pin_up:doc});
      }
     });
  })
  app.get("/add",ensureAuth,function(req,res,next){
      res.render("add");
      console.log("on add");
  });
  app.post("/add",function(req,res,next){
       var insert=new pins.User_pin({
       "title":req.body.title,
       "url":req.body.url,
       "username":req.user.username
      });
      insert.save();
      console.log("add done");
      res.redirect("/mypins");
  });
    app.get("/end",function(req,res,next){
    pins.User_twitter.find({},function(err,doc){
     console.log(doc);
    });
  });
  //////////////////////////////
  //////////////////////////////twitter login/////////////////////////
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/',
                failureRedirect : '/end'
            })
    );
    //to delete pin
       app.get('/api/delete/:id', function(req, res, next) {
       pins.User_pin.find( { _id: req.params.id }).remove().exec(function(err, doc) {
           if (err) {
               throw err;
           }

           res.redirect('/');
       });
    });
    app.get("/logout",function(req,res,next){
     req.logout();
     res.redirect("/");
    });
}
