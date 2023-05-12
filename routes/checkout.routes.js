const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/checkout", async (req, res, next) => {
  try {
    //get the data from form on cart
    //arrays
    const productId = req.body.productId;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;

    lineItems = [];

    if (!productId || !productId.length) {
      console.log("No items found in request body");
    }

    //use the product id because we cant get the length of the body
    for (let i = 0; i < productId.length; i++) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: productName[i],
          },
          unit_amount: productPrice[i] * 100,
        },
        quantity: 1,
      });
    }

    //send all our info to stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cart`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    next(error);
  }
});

//render success page
router.get("/success", (req, res) => res.render("payment/success"));
//render failed payment
router.get("/cancel", (req, res) => res.render("payment/cancel"));

module.exports = router;
