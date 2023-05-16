const express = require("express");
const router = express.Router();
const Wine = require("../models/Wine.model");
const { vibeArrays } = require("../utils/vibes");
const { isNotOfAge} = require("../middleware/isOfAge");

//Got products from db, did a loop to send the vibes to the homepage
router.get("/home", isNotOfAge, async (req, res) => {
  try {
    const vibe = await Wine.find();

    //calls imported function that retrieves seperated vibe arrays
    const vibes = await vibeArrays();
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

router.get("/summer-party", async (req, res, next) => {
  try {
    const vibes = await vibeArrays();
    const summerVibe = vibes.summerParty;
    res.render("products/products", {
      userInSession: req.session.currentUser,
      vibe: summerVibe,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/home-alone", async (req, res, next) => {
  try {
    const vibes = await vibeArrays();
    const homeAlone = vibes.homeAlone;
    res.render("products/products", {
      userInSession: req.session.currentUser,
      vibe: homeAlone,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me-and-friends", async (req, res, next) => {
  try {
    const vibes = await vibeArrays();
    const meAndFriends = vibes.meAndSomeFriends;
    res.render("products/products", {
      userInSession: req.session.currentUser,
      vibe: meAndFriends,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/hot-girl-summer", async (req, res, next) => {
  try {
    const vibes = await vibeArrays();
    const hotGirlSum = vibes.hotGirlSummer;
    res.render("products/products", {
      userInSession: req.session.currentUser,
      vibe: hotGirlSum,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/details/:id", async (req, res, next) => {
  try {
    const wineId = req.params.id;
    const details = await Wine.findById(wineId);
    res.render("products/details", { wine: details });
  } catch (error) {
    next(error);
  }
});

router.get("/vibe-check", (req, res) => res.render("vibe-check"));

module.exports = router;
