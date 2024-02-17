const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const SecretKey = "SUPER_SECRET";
const UserModel = require("../models/users");

const routes = express.Router();

let jwt_Auth=(req,res,next)=>{
  const token=req.cookies['jwt'];
  if(token==null){
    res.send("NO TOKEN FOUND");
  }
  else{
    jwt.verify(token,SecretKey,async (err,decoded)=>{
      if(err)console.log(err);
      else{
        const user = await UserModel.findOne({
          name: decoded.email,
          password: decoded.password
        });
        if(!user){
          res.send("JWT TOKEN FAILED");
        }
        next();
      }
    })
  }
}

routes.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

routes.post("/submit_signup", (req, res) => {
  console.log(req.body);
  const User = new UserModel({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    User.save();
    res.send("User created successfully");
  } catch (err) {
    console.log(err);
    res.send("Error: " + err);
  }
});

routes.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

routes.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      isSigned = true;
      jwt.sign({
        name: req.body.email,
        password: req.body.password
      }, SecretKey, (err, token) => {
        if(err) {
          console.log(err);
        } else {
          res.cookie('jwt', token, { httpOnly: false, secure: true, maxAge: 3600000 });
          res.redirect('/home');
        }
      });
    } else {
      res.send("No user with the given email and password was found.");
    }
  } catch (err) {
    console.error(err);
    res.send("Something went wrong!");
  }
});

routes.get("/home", jwt_Auth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = routes;

