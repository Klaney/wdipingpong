var express = require("express");
var router = express.Router();

var db = require("../models");

router.route("/login")
	.get(function(req, res){
		res.render("auth/login");
	})
	.post(function(req, res){
		db.user.authenticate(
			req.body.email,
			req.body.password, 
			function(err, user){
				if (err){
					res.send(err);
				} else if (user) {
					console.log(user.name);
					req.session.user = user.id;
					console.log(req.session.user);
					req.flash("success", "You have now logged in");
					res.redirect("/");
				} else {
					req.flash("danger", "Invalid username or password");
					res.redirect("/auth/login");
				}
		});
	})

router.route("/signup")
	.get(function(req, res){
	res.render("auth/signup");
	})
	.post(function(req,res){
		if (req.body.password !== req.body.password2){
			req.flash("error", "Password must match!");
			res.redirect("/auth/signup");
		} else {
			db.user.findOrCreate({
				where: {
					email: req.body.email
				},
				defaults: {
					email: req.body.email,
					password: req.body.password,
					name: req.body.username
				}
			}).spread(function(user, created){
				if (created){
					req.flash("success", "You are signed up");
					res.redirect("/");
				} else {
					req.flash("danger", "A user with that email already exists");
					res.redirect("/auth/signup");
				}
			}).catch(function(err){
				req.flash("error", "an error occurred");
				res.redirect("/auth/signup");
			});
	}
});


module.exports = router;