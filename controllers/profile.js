var express = require("express");
var router = express.Router();
router.use(express.static(__dirname + '/static'));

var db = require("./../models");

router.get("/", function(req, res){
	if (req.currentUser) {
		res.render("profile/profile");
	} else {
		req.flash("Not logged in", "Please Sign in to access your profile");
		res.redirect("/");
	}
})

router.get("/createprofile", function(req, res){
	res.render("profile/createprofile");
})

router.post("/createprofile", function(req, res){
	db.player.findOrCreate({
		where: {
			lastname: req.body.lastname
		},
		defaults: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			nickname: req.body.nickname,
			style: req.body.style,
			handgrip: req.body.handgrip,
			biography: req.body.biography
		}
	}).spread(function(player, created){
		if (created){
			req.flash("success", "You are signed up");
			res.redirect("/");
		} else {
			req.flash("danger", "A player with that lastname already exists");
			res.redirect("/profile/createprofile");
		}
	}).catch(function(err){
		req.flash("error", "an error occurred");
		res.redirect("/profile/createprofile");
	});
});

module.exports = router;