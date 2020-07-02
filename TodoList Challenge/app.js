const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose"); 
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine" , 'ejs');

// connect ot the database
const url = "mongodb://localhost:27017/todoDB" ;
mongoose.connect(url , {newUserParser : true});

const todoSchema = new mongoose.Schema({
	description :{
		type : String ,
		required : true
	} 
});

const listSchema = new mongoose.Schema({
	name : String ,
	items : [todoSchema]
})
const Todo = mongoose.model('todo' , todoSchema);
const List = mongoose.model('list' , listSchema)

app.get("/" , function(req,res){
	
	let day = date.getDate();
	Todo.find({},function(err , results){
		res.render("list" , {current : "Today" , items : results } );
	});
	

});

app.post("/" , function(req,res){
	const listName = req.body.listName;
	const newItem = new Todo({
		description : req.body.task 
	});
	if(listName == "Today"){
		newItem.save() ;
		res.redirect("/");

	}
	else{
		List.findOne({name:listName},function(err , foundList){
			foundList.items.push(newItem);
			foundList.save();	
			res.redirect("/" + listName) ;
	});

	}
})

app.post("/delete/:listName" , function(req,res){
	const listName = req.params.listName;
	const checkedId =  req.body.checkbox ;
	if(listName == "Today" )
	{
		Todo.findByIdAndRemove(checkedId , function(err){
			if(!err){
				console.log("removed successfully!");
			}
		});
		res.redirect("/");
	}else{
		List.findOneAndUpdate({name : listName} , {$pull : {items :{_id:checkedId}}} ,function(err,foundList){
			res.redirect("/" + listName) ;
		});
	}
})


app.get("/:list" , function(req,res){
	const list = req.params.list ;
	List.findOne({name:list},function(err , results){
		if(!results){
			const newList = new List({
			name : list ,
			items : []
		});
			newList.save();		
			res.redirect("/" + list) ;
		}
		  else{
			res.render("list" ,{current: list , items:results.items});
		}
	});
	
});

app.listen(3000 , function(){
	console.log("Server is running on port 3000");
});
