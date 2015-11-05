var express = require("express");
var router = express.Router();
router.use(express.static(__dirname + '/static'));
var multer = require("multer");
var upload = multer({ dest: './uploads/' });
var cloudinary = require('cloudinary');

var db = require("./../models");

router.get("/", function(req, res){
	db.user.findById(req.currentUser.id).then(function(profile){
		profile.getPlayer().then(function(player){
			var imgUrl = cloudinary.url(player.imgkey, { 
				width: 200, 
				height: 200, 
				crop: 'thumb' 
				});
			console.log(player);
			var playerinfo = player;
			if (req.currentUser) {
				res.render("profile/profile", {playerinfo:playerinfo, imgUrl:imgUrl});
			} else {
				req.flash("Not logged in", "Please Sign in to access your profile");
				res.redirect("/");
			}
		})
	})
})

router.get("/createprofile", function(req, res){
	res.render("profile/createprofile");
})

router.post("/createprofile", upload.single('myFile'), function(req, res){
	cloudinary.uploader.upload(req.file.path, function(result) {
    //store public_id from the result in database
    //redirect somewhere
	db.player.findOrCreate({
		where: {
			userId: req.currentUser.id
		},
		defaults: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			nickname: req.body.nickname,
			style: req.body.style,
			handgrip: req.body.handgrip,
			biography: req.body.biography,
			imgkey: result.public_id,
			wins: 0,
			losses: 0
		}
	}).spread(function(player, created){
		if (created){
			req.flash("success", "You are signed up");
			res.redirect("/");
		} else {
			req.flash("danger", "A profile for you already exists");
			res.redirect("/profile/createprofile");
		}
	}).catch(function(err){
		console.log(err);
		req.flash("error", "an error occurred");
		res.redirect("/profile/createprofile");
	});
  });
});

module.exports = router;