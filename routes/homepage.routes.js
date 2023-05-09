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

module.exports = router;
