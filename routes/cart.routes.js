const express = require("express");
const router = express.Router();

//Import the models
const Cart = require("../models/cart.model");
const Product = require("../models/Wine.model");

//middle page route
router.get("/add-item/:id", async (req, res, next) => {
  res.render("cart/add-item");
});

//handles when user adds items to the cart
router.post("/add-item/:id", async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;

    const id = req.body.id;
    console.log("product id", id);

    const product = await Product.findById(id);
    console.log("product", product);

    let userCart = await Cart.findOne({ userId }).populate("items");

    if (!userCart) {
      userCart = new Cart({
        userId,
        items: [
          {
            productId: product._id,
            quantity: 1,
            productName: product.product_name,
            productPrice: product.product_price,
          },
        ],
      });
    } else {
      let item = userCart.items.find((item) =>
        item.productId.equals(product._id)
      );
      if (item) {
        item.quantity += 1;
        item.productName = product.product_name;
        item.productPrice = product.product_price;
      } else {
        userCart.items.push({
          productId: product._id,
          quantity: 1,
          productName: product.product_name,
          productPrice: product.product_price,
        });
      }
    }

    await userCart.save();

    res.render("cart/add-item", {
      userCart,
      product,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

//Cart
//Render the cart
router.get("/", async (req, res, next) => {
  //grab user id from session
  const id = req.session.currentUser._id;

  //with user id, find associated cart
  const userCart = await Cart.findOne({ userId: id });

  console.log(userCart);

  //if no cart, render an "empty cart" page, link to homepage
  //else if, render their cart, send user and cart to access data in hbs
  if (!userCart) {
    res.render("cart/empty-cart");
  } else {
    res.render("cart/cart", {
      userInSession: req.session.currentUser,
      userCart,
    });
  }
});

module.exports = router;
