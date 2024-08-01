var express = require('express');
var router = express.Router();

const userModel = require("./users");
const postModel = require("./posts");

const passport = require("passport");
const upload = require("./multer");//posting the posts
//below two lines helps user to log in
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/login", function(req, res,next){
  // console.log(req.flash("error"));
  res.render("login", {error: req.flash("error")});
});

router.get("/feed", function(req,res,next){
  res.render("feed");
})

router.post("/upload", isLoggedIn, upload.single("file"), async function(req,res,next){
  if(!req.file){
    return res.status(404).send("no files are given");
  }
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    image: req.file.filename,
    imageText : req.body.filecaption,
    user: user._id
  });
  user.posts.push(post._id);
  await user.save();
  res.send("file uploaded successfully");
  
})

router.get("/profile", isLoggedIn, async function(req,res,next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
    });
  res.render("profile",{user});
})

router.post("/register", function(req,res){

  // const userData = new userModel({
  //   username: req.body.username,
  //   email: req.body.em  ail,
  //   fullName: req.body,fullname,
  // })

  //WRITING THESE FOUR LINES IN SHORT
  const{ username, email, fullname} = req.body;
  const userData = new userModel({username, email, fullname});

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    })
  })

})
router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login" ,
  failureFlash: true
}), function(req, res){
});

router.get("/logout", function(req, res){
  req.logout(function(err){
    if(err) {
      return next(err);
    }
    res.redirect("/login");
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect("/login");
}

module.exports = router;

