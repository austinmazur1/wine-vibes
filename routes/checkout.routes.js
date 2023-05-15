const express = require("express");
const session = require("express-session");
const router = express.Router();
const Cart = require("../models/cart.model")
const isLoggedIn = require('../middleware/isLoggedIn');

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/checkout", isLoggedIn, async (req, res, next) => {
  try {
    //get the data from form on cart
    //arrays
    const productId = req.body.productId;
    const productName = req.body.productName;
    let productPrice = req.body.productPrice;

    lineItems = [];

    if (!productId || !productId.length) {
      res.send("No items found in cart");
    }

    //use the product id because we cant get the length of the body

    if(Array.isArray(productPrice) && productPrice.length > 1) {
    for (let i = 0; i < productId.length; i++) {
      if (isNaN(productPrice[i])) {
        console.log(`Invalid value found in productPrice[${i}]: ${productPrice[i]}`);
      }
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: productName[i],
          },
          unit_amount: Number(productPrice[i]) * 100,
        },
        quantity: 1,
      });
    }
  } else {
    productPrice = Number(productPrice);
    lineItems.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
      quantity: 1,
    });
  }
    console.log(lineItems);

    //send all our info to stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // success_url: `${process.env.SERVER_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      success_url: `${process.env.SERVER_URL}/checkout/success`,
      cancel_url: `${process.env.SERVER_URL}/cart`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    next(error);
  }
});

//render success page
router.get("/checkout/success", async (req, res) => {
  try{
    const user = req.session.currentUser.username;
    const userId = req.session.currentUser._id;

    const customerEmail = req.session.currentUser.email;

    await Cart.findOneAndDelete({ userId: userId })

//     const sessionId = req.query.session_id;
//     const session = await stripe.checkout.sessions.retrieve(sessionId);


//     if(!session.id) {
//       return res.status(400).send("Customer ID is required.");
//     }

// const customer = await stripe.customers.retrieve({email: `${session.customer_details.email}`});
// console.log("Customer///////",customer);

// res.send(`<html><body><h1>Thanks for your order, ${customer}!</h1></body></html>`);

res.render('payment/success', {user, customerEmail})
} catch (error) {
  console.log(error);
}
})
//render failed payment
router.get("/cancel", (req, res) => res.render("payment/cancel"));

module.exports = router;
