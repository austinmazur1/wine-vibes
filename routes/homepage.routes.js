const express = require('express');
const router = express.Router();
const Wine = require('../models/Wine.model');


//Got products from db, did a loop to send the vibes to the homepage
router.get('/', async (req, res) => {
  try {
    
    const product = await Wine.find();

    let vibes = []
    product.forEach((product) => {
      if(product.product_vibe && !vibes.includes(product.product_vibe)) {
        vibes.push(product.product_vibe);
      }
    })
    console.log(vibes);
    
    res.render('homepage/homepage', { product, vibes });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving wines');
  }
});

module.exports = router;


