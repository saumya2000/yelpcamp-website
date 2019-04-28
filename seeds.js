var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comments");

var data=[
	{
		name:"Cloud's Rest",
		image:"https://cali-content.usedirect.com/themes/California/simple_banner.jpg",
		description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
	},
	{
		name:"Desert Mesa",
		image:"https://www.outdoorproject.com/sites/default/files/styles/cboxshow/public/blog-copies/dsc_5871_10.jpg?itok=tppN195d",
		description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
	},
	{
		name:"Canyon Floor",
		image:"https://outdoorfeeds.com/wp-content/uploads/2017/11/camping1.jpg",
		description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
	}
]

function seedDB(){
	Campground.remove({},function(err){   //remove one campground
	// Campground.remove({},function(err){
	if(err){
		console.log(err);
	}
	
	console.log("removed campgrounds!");
		//add a few campgrounds
	data.forEach(function(seed){             // wait to add until all campgrounds are removed
		Campground.create(seed,function(err,campground){    
			if(err){
				console.log(err);
			}else{
				console.log("added a campground");
				//create a comment
				Comment.create(
					{
						text:"this place is great but I wish that thers was internet",
						author:"Bob Green"
					},function(err,comment){
						if(err){
							console.log(err);
						}else{
							campground.comments.push(comment);
							campground.save();
							console.log("created new comment");
						}
					});
				
			}
		});
	});
});
}


//add a few comments
module.exports=seedDB;
