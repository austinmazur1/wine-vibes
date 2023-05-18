const express = require('express');
const router = express.Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const { isOfAge } = require("../middleware/isOfAge");

// Show the age verification view, add middleware so user doesnt need to click age verification
//isOfAge crashed the webpage
router.get('/', isLoggedOut, isOfAge, (req, res) => {
  res.render('age-verification/age-verification', { over18: false, currentPage: '/'});
});

// Handle form submission to check age and redirect to homepage if user is over 18
router.post('/', (req, res) => {
  const age = req.body.age;
  if (age === 'yes') {
    req.session.ageVerified = true;
    res.redirect("/home")
  } else {
    req.session.ageVerified = false;

    // If user is not old enough, show the age verification view again with an error message
    res.render('age-verification/age-verification', { over18: false, error: 'You must be at least 18 years old to access this site.' });
  }
});

module.exports = router;
