const express = require("express");
const router = express.Router();
const Wine = require("../models/Wine.model");
const { vibeArrays } = require("../utils/vibes");

//Got products from db, did a loop to send the vibes to the homepage
router.get("/home", async (req, res) => {
  try {
    const vibe = await Wine.findById("645925bcf60fd15208521c37");
    console.log(vibe.product_vibe.vibe_id);

    
    // console.log(vibe.product_vibe);
    //calls imported function that retrieves seperated vibe arrays
    const vibes = await vibeArrays();
    // console.log(vibes.productVibes);
    const summerVibe = vibes.summerParty;
    const home = vibes.homeAlone;
    const meAndFriends = vibes.meAndSomeFriends;
    const hotGirlSum = vibes.hotGirlSummer;

    res.render("homepage/homepage", {
      vibes: vibes.productVibes,
      home,
      summerVibe,
      meAndFriends,
      hotGirlSum,
      userInSession: req.session.currentUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving wines");
  }
});

router.get("/vibe-check", async (req, res, next) => {
  res.render("vibe-check");
});

router.get("/summer-party", async (req, res, next) => {
  const vibes = await vibeArrays();
    const summerVibe = vibes.summerParty;
  res.render("products/products", {userInSession: req.session.currentUser, vibe: summerVibe})
})

module.exports = router;
