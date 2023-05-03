const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
// Handle GET requests to the home page after user confirms legal age
router.get('/home', (req, res) => {
  res.render('home', {});
});

module.exports = router;
