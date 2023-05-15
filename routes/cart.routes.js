const express = require("express");
const router = express.Router();

//Import the models
const Cart = require("../models/cart.model");
const Product = require("../models/Wine.model");

//middle page route
router.get("/add-item/:id", (req, res, next) => {
  res.render("cart/add-item");
});

//handles when user adds items to the cart
router.post("/add-item/:id", async (req, res, next) => {
  try {
    if (!req.session.currentUser) {
      res.redirect("/auth/signup");
    }
    const userId = req.session.currentUser._id;
    const id = req.body.id;
    const product = await Product.findById(id);

    let userCart = await Cart.findOne({ userId }).populate("items");

    //if no cart exists we create a new one
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
    }
    //if exists we check if its a duplicate, if so we update the quantity
    else {
      let item = userCart.items.find((item) =>
        item.productId.equals(product._id)
      );
      if (item) {
        item.quantity += 1;
        item.productName = product.product_name;
        item.productPrice = product.product_price;
      }
      //other wise we just push the object to the cart
      else {
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

//Render the cart
router.get("/", async (req, res, next) => {
  //grab user id from session
  const id = req.session.currentUser._id;

  //with user id, find associated cart
  const userCart = await Cart.findOne({ userId: id });

  //if no cart, render an "empty cart" page, link to homepage
  //else if, render their cart, send user and cart to access data in hbs
  if (!userCart || userCart.items.length < 1) {
    res.render("cart/empty-cart");
  } else {
    res.render("cart/cart", {
      userInSession: req.session.currentUser,
      userCart,
    });
  }
});

//remove item from cart
router.post("/:id", async (req, res, next) => {
  const itemId = req.params.id;
  const userId = req.session.currentUser._id;
  const userCart = await Cart.findOne({ userId: userId });
  const cartItems = userCart.items;

  //loop to compare cartItem with form item
  //if the same, we remove that item
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].productId.toString() === itemId) {
      cartItems.splice(i, 1);
      break;
    }
  }

  //Update cart and save then send back to cart
  userCart.items = cartItems;
  await userCart.save();
  req.session.cart = userCart;
  res.redirect("/cart");
});

module.exports = router;
