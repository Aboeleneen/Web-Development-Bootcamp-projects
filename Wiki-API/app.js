const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

// app configuration
app = express();

app.set("View engine" , "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// database configuration 
const url = "mongodb://localhost:27017/wikiDB" ;
mongoose.connect(url , {useNewUrlParser:true });

const articleSchema = new mongoose.Schema({
	title: String,
	body:String
})

const Article = mongoose.model('article' , articleSchema);

// APT Endpoints

/*we can also use app.route("articles").get().post().delete() --> chained route handling use express*/
// get all articles
app.get("/articles" , function(req,res){
	Article.find({},function(err , articles){
		if(!err){
			res.send(articles);
		}else{
			res.send(err);
		}
	});
});

// post a new article
app.post("/articles", function(req,res){
	const title = req.body.title;
	const body = req.body.body;
	const article = new Article({
		title : title ,
		body : body
	});
	article.save();
	res.send("inserted successfully !");
});

// delete all articles 
app.delete("/articles" , function(req,res){
	Article.deleteMany({} ,function(err){
		if(!err){
			res.send("Deleted all articles successfully !");
		}else{
			res.send(err);
		}
	})
});



// get a specific article by title
app.get("/articles/:title" , function(req,res){
	const title = req.params.title;
	Article.findOne({title:title} , function(err,foundArticle){
		if(foundArticle){
			res.send(foundArticle);
		}else{
			res.send("No Article with this title ");
		}
	});
});

// modify an entire article
app.put("/articles/:title" , function(req,res){
	const title = req.params.title;
	const newTitle = req.body.title;
	const newBody = req.body.body;
	Article.update(
		{title:title} , 
		{title:newTitle , body:newBody} , 
		{overwrite : true},
		function(err){
		if(!err){
			res.send("updated successfully !");
		}else{
			res.send(err);
		}
	});
});

// modify a part of an specific article
app.patch("/articles/:title" , function(req,res){
	const title = req.params.title;
	Article.update(
		{title : title},
		{$set : req.body},
		function(err){
			if(!err){
				res.send("updated successfully !");
			}else{
				res.send(err);
			}

		});
});

// delete a specific article 
app.delete("/articles/:title" , function(req,res){
	const title  = req.params.title;
	Article.deleteOne({title:title} , function(err){
		if(!err){
			res.send("Deleted successfully !");
		}else{
			res.send(err);
		}
	});
});


app.listen(3000, function(){
	console.log("Server is running on port 3000");
});