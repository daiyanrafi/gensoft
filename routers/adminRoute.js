
//internal import
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

//external import
const config = require("../config/config");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/adminAuth");

const admin_route = express();
admin_route.use(session({ secret: config.sessionSecret }));

admin_route.use(bodyParser.urlencoded({ extended: true }));
admin_route.use(bodyParser.json());

//for ejs view engine
admin_route.set("view engine", "ejs");
admin_route.set("views", "./views/admin");

//for admin routes
admin_route.get("/", auth.isLogout, adminController.loadLogin);

admin_route.post('/', adminController.verifyLogin); //post request for admin login

admin_route.get("/home", auth.isLogin, adminController.loadDashboard);

admin_route.get('/logout',auth.isLogin, adminController.logout);

admin_route.get("/forget", auth.isLogout, adminController.forgetLoad);

admin_route.post("/forget", adminController.forgetVerify);

admin_route.get("/forget-password", auth.isLogout , adminController.forgetPasswordLoad);

admin_route.post("/forget-password", adminController.resetPassword);

admin_route.get("/dashboard", auth.isLogin, adminController.adminDashboard);

admin_route.get("*", function (req, res) {
    res.redirect("/admin");
});


//export
module.exports = admin_route;