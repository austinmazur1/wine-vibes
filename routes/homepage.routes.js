const express = require("express");
const router = express.Router();
const Wine = require("../models/Wine.model");
const { vibeArrays } = require("../utils/vibes");

//Got products from db, did a loop to send the vibes to the homepage
router.get("/home", async (req, res) => {
  try {
    //calls imported function that retrieves seperated vibe arrays
    const vibes = await vibeArrays();

    res.render("homepage/homepage", { vibes: vibes.productVibes, userInSession: req.session.currentUser });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving wines");
  }
});

router.get("/vibe-check", async (req, res, next) => {
  res.render("vibe-check");
})


//wine vibes rout
router.get('/vibes/:vibe', (req, res, next) => {
  const vibe = req.params.vibe;
  Wine.find({ product_vibe: vibe })
    .then((wine) => {
      console.log(wine);
      res.render('products/products', { wine, vibe });
    })
    .catch((err) => {
      console.error("Error retrieving products: ", err);
      next(err);
    });
})

module.exports = router;
