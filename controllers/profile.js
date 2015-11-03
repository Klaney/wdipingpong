var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
	if (req.currentUser) {
		res.render("profile");
	} else {
		req.flash("Not logged in", "Please Sign in to access your profile");
		res.redirect("/");
	}
})

module.exports = router;