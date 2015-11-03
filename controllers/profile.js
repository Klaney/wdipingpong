var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
	if (req.currentUser) {
		res.render("profile");
	} else {
		req.flash("Not logged in", "Please Sign in before continuing");
		res.redirect("/");
	}
})

module.exports = router;