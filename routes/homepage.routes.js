const express = require("express");
const router = express.Router();
const Wine = require("../models/Wine.model");
const { vibeArrays } = require("../utils/vibes");

//Got products from db, did a loop to send the vibes to the homepage
router.get("/home", async (req, res) => {
  try {
    const vibe = await Wine.find();
   

    
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
  // console.log(vibes);
    const summerVibe = vibes.summerParty;
   //console.log(summerVibe)
    res.render("products/products", {userInSession: req.session.currentUser, vibe: summerVibe})
})
router.get("/home-alone", async (req, res, next) => {
  const vibes = await vibeArrays();   
  const homeAlone = vibes.homeAlone;  
  res.render("products/products", {userInSession: req.session.currentUser, vibe: homeAlone})
})

router.get("/me-and-friends", async (req, res, next) => {
  const vibes = await vibeArrays();   
    const meAndFriends = vibes.meAndFriends;
    //console.log(homeAlone)
    res.render("products/products", {userInSession: req.session.currentUser, vibe: meAndFriends})
})
router.get("/hot-girl-summer", async (req, res, next) => {
  const vibes = await vibeArrays();   
    const hotGirlSum = vibes.hotGirlSum;
    //console.log(homeAlone)
    res.render("products/products", {userInSession: req.session.currentUser, vibe: hotGirlSum})
})

//wine vibes rout
// router.get('/vibes/:vibe', (req, res, next) => {
//   const vibe = req.params.vibe;
//   Wine.find({ product_vibe: vibe })
//     .then((wine) => {
//       console.log(wine);
//       res.render('products/products', { wine, vibe });
//     })
//     .catch((err) => {
//       console.error("Error retrieving products: ", err);
//       next(err);
//     });
// })

module.exports = router;
