const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine" , 'ejs');

var items = [] ;
app.get("/" , function(req,res){
	var today = new Date();
	
	var options = {
		weekday : "long" ,
		day : "numeric" ,
		month : "long"
	}

	var day = today.toLocaleDateString("en-US" , options);  

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
