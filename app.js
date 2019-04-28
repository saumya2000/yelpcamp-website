var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comments");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v5", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));


// Campground.create(
// 	{
// 	name:"saumya gupta",
// 	image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",
// 	description:"Lovely atmosphere.I love it."
// 	},function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("NEWLY CREATED CAMPGROUND");
// 			console.log(campground);
// 		}

// });

// var campgrounds=[
// 	{name:"saumya gupta",image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"},
// 	{name:"simran gupta",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZlpgHFX7cAtY5g-sIKoE_O2VSQgPmCPK5WX1fh57eax9Tlfd3xw"},
// 	{name:"riya jain",image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
// 	];

app.get("/",function(req,res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
	//GET ALL CAMPGROUNDS FROM DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render('campgrounds/index',{campgrounds:allCampgrounds});
		}

});
	// res.render('campgrounds',{campgrounds:campgrounds});
});

//CREATE-add new campgrounds to DB
app.post("/campgrounds",function(req,res){
	// res.send("you hit the post route");
	//get data from form and add to campgrounds array
	
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newcampground={name:name , image:image , description:desc}
	//CREATE A NEW CAMPGROUND AND SAVE TO DB
	Campground.create(newcampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			//redirect back to campgrounds page
			res.redirect("/campgrounds");    //redirect to get request
		}
	// campgrounds.push(newcampground);
});
});

//NEW-show form to create new campgrounds
app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});

//SHOW-show more info about one campground
app.get("/campgrounds/:id",function(req,res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
});


//==============================
//COMMENT ROUTES
//==============================
app.get("/campgrounds/:id/comments/new",function(req,res){
	//find campground by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});	
		}
	});
	
});

app.post("/campgrounds/:id/comments",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			//console.log(req.body.comment); will directly print the comment in the terminal without using text and author as attribute
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
	//lookup campground using id
	//create new comment
	//connect new comment to campground
	//redirect campground show page
});

app.listen(3000,process.env.IP,function(){
	console.log("The Yelpcamp server has started");
});