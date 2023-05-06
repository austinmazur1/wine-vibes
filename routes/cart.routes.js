const express = require("express");
const router = express.Router();

//Import the models
const Cart = require("../models/cart.model");
const User = require("../models/User.model");
const Product = require("../models/Wine.model"); 



//Render the cart
router.get('/:id', async (req, res, next) => {

    //grab user id from session
    const id = req.session.currentUser._id;

    //with user id, find associated cart
    const userCart = await Cart.findOne({user: id})

    //if no cart, render an "empty cart" page, link to homepage
    //else if, render their cart, send user and cart to access data in hbs
    if(!userCart) {
        res.render('cart/empty-cart');
    } else {
        res.render('cart/cart', {userInSession: req.session.currentUser, userCart});    
    }
});

//TODO create the cart post route
//handles when user adds items to the cart
router.post('/:id', async (req, res, next) => {
    console.log(req.session.currentUser._id);

    //get user id, find the cart with it

    //when user clicks add to cart, we get the id of that product

    //with the id we can then populate the cart

    //if cart doesnt exist, we create a new Cart

    //will need to make sure when we populate, we dont get duplicates
    //just add to the quantity
})


//Stripe checkout is in checkout.routes
//dom manipulation is in public/js/script.js

module.exports = router;