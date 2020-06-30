const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine" , 'ejs');

var items = [] ;
app.get("/" , function(req,res){
	
	let day = date.getDate();
	res.render("list" , {current : day , items : items } );

});

app.post("/" , function(req,res){
	var new_task = req.body.task ;
	items.push(new_task);
	res.redirect("/");
})

app.listen(3000 , function(){
	console.log("Server is running on port 3000");
});
