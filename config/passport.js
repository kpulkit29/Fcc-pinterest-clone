
var Scheme=require("../models/scheme");
var tweet  = require('passport-twitter').Strategy;
module.exports=function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Scheme.User_twitter.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use(new tweet({
                consumerKey :       "3ZHI76MbgTGA0PYG9SpKF738R",
                consumerSecret :    "8Bd8H2KuPCveqj08vVFVyFqn0ewM4EqMgGFYgwXdwUH6UA3WdY",
                callbackURL :       "https://twinterest-fcc.herokuapp.com/auth/twitter/callback"

    },  function(token, tokenSecret, profile, done){
        //takes once in one event loop
        process.nextTick(function(){
         console.log(profile);
         Scheme.User_twitter.findOne({"id":profile.id},function(err,user){
            if(err){console.log(err);}
            if(user){
                console.log(user);
                console.log("here");
               return done(null,user);
            }
            if(!user){
                console.log("here2");
                var insert=new Scheme.User_twitter();
                insert.id=profile.id;
                insert.username=profile.username;
                insert.dis_name=profile.displayName;
                insert.save(function(err){
                    console.log("yes");
                    if(err){console.log(err);}
                    return done(null,insert);
                });
            }
         });
        });
    }
    
    )
    );
}