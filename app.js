//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "This is a public microblogging and social networking website developed by Gaurav Kumar Thakur in [2022] for educational purposes. This website allows users to post content or a blog. Feel free to use this website as much as you like and content of this website.";
const aboutContent = "I make these kind of websites when I study and When I don't study I spend my time in Game, Eat, Sleep, Repeat. ";
const contactContent = "Don't try to contact me. you might disturb me when i am sleeping";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/",function(req,res){
  res.render("home",{
    ejsHome: homeStartingContent,
     info: posts
   });
})

app.get("/about",function(req,res){
  res.render("about",{
    ejsAbout: aboutContent
  });
});

app.get("/contact",function(req,res){
  res.render("contact",{
    ejsContact: contactContent
  });
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  // console.log(req.body.postTitle);

var post = {
    Title: req.body.postTitle,
    Content: req.body.postBody
  };

  posts.push(post);

    res.redirect("/");

  // console.log(post);
})

app.get('/posts/:postName',function(req,res){
  // console.log(req.params.postName);

    var linkname = _.lowerCase(req.params.postName);
  posts.forEach(function(posting){

    var titleName = _.lowerCase(posting.Title);

       if(linkname === titleName){
         res.render("post",{
           title: posting.Title,
           content: posting.Content,
         });
       }
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
