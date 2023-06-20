const express = require("express");
const user_route = express();
const session = require("express-session");
const config = require("../config/config");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const cartController=require("../controllers/cartController");
const wishlistController=require("../controllers/wishlistController");



require('dotenv').config();
user_route.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

user_route.set("views", "./views/users");

user_route.get("/",userController.loadHome);

user_route.get("/login",userController.loginLoad);

user_route.get("/register",userController.loadRegister);

user_route.get("/login", auth.isLogout, userController.loginLoad);

user_route.post("/login",auth.isLogout, userController.verifyLogin);

user_route.post("/verifytwofact" ,auth.isLogout, userController.twoFactor)

user_route.get("/register", auth.isLogout, userController.loadRegister);

user_route.post("/register",auth.isLogout, userController.loadOtp);

user_route.post("/againotp",userController.againOtp);

user_route.post("/otpPage",userController.verifyOtp)


user_route.use(auth.isLogin);

user_route.get("/home", userController.loadHome);

user_route.get("/logout",userController.userLogout);

user_route.get("/view-details",userController.loadDetails);

user_route.get("/loadShop",userController.loadShop);

user_route.get("/loadcart",cartController.loadCart);

user_route.get("/addToCart",cartController.addToCart);

user_route.post("/updateCart",cartController.updateCart);

user_route.get('/delete-cart',cartController.deleteCart)

user_route.get("/loadWishlist",wishlistController.loadWishlist);

user_route.get("/addWishlist",wishlistController.addWishlist);

user_route.get("/deleteWishlist",wishlistController.deleteWishlist)


user_route.get("/vieworder",userController.viewOrderDetails)

user_route.get("/cancelorder",userController.cancelOrder);

user_route.get("/loadCheckout",userController.loadCheckout);

user_route.post("/applyCoupon",userController.applyCoupon);

user_route.get("/userProfile",userController.loadUserProfile);

user_route.post("/editUser",userController.editUserUpdate);

user_route.get("/editUser",userController.editUser);

user_route.post("/addAddress",userController.addNewAddress);

user_route.get("/delete-address",userController.deleteAddress);

user_route.get("/edit-address",userController.editAddress);

user_route.post("/edit-address",userController.editUpdateAddress);

user_route.post("/orderSuccess",userController.placeOrder);

user_route.get("/onlinePayment",userController.loadOrderSuccess);

user_route.get("/adCartremoveWishlist",wishlistController.addToCartremovefromwishlist)

user_route.get("/editcheckout-address",userController.editCheckoutAddress);

user_route.post("/editcheckout-address",userController.editUpdateCheckoutAddress);

user_route.get("/deletecheckout-address",userController.deleteCheckoutAddress)

user_route.get("/returnOrder",userController.retunOrder);



module.exports = user_route;
