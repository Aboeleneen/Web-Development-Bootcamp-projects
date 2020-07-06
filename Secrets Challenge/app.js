//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10 ;

// app configuration
const app = express();
app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


// database configuration
const url = "mongodb://localhost:27017/secretDB" ;
mongoose.connect(url);

const userSchema = new mongoose.Schema({
	email : String ,
	password : String
});


//userSchema.plugin(encrypt , {secret:process.env.SECRET, encryptedFields : ['password']});

const User = new mongoose.model('User' , userSchema);


app.get("/" , function(req,res){
	res.render('home');
});

app.get("/login" , function(req,res){
	res.render('login');
});

app.post("/login" , function(req,res){
	const email =   req.body.username;
	const password = req.body.password;
	User.findOne({email:email}, function(err,foundUser){
		if(err){
			console.log(err);
		}else{
			if(foundUser){
				bcrypt.compare(password , foundUser.password , function(err,result){
					if(result == true){
						res.render('secrets');
					}
				});
			}
		}
	});
});

app.get("/register" , function(req,res){
	res.render('register');
});

app.post("/register" , function(req,res){
	bcrypt.hash(req.body.password , saltRounds , function(err,hash){
		const user = new User({
			email : req.body.username,
			password : hash
		});
		user.save(function(err){
			if(err){
				console.log(err);
			}else{
				res.render('secrets');
			}
		});
	});
});
app.get("/submit" , function(req,res){
	res.render('submit');
});



app.listen(3000 , function(){
	console.log("Server is running on port 3000");
});
