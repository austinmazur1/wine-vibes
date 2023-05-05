const express = require('express');
const router = express.Router();
const Wine = require('./models/Wine.model');

router.get('/', async (req, res) => {
  try {
    const wines = await Wine.find({}, 'product_vibe product_name product_price');
    res.render('homepage', { wines });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving wines');
  }
});

module.exports = router;

