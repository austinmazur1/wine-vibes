const express = require('express');
const router = express.Router();

// Show the age verification view
router.get('/', (req, res) => {
  res.render('age-verification/age-verification', { over18: false });
});

// Handle form submission to check age and redirect to homepage if user is over 18
router.post('/home', (req, res) => {
  const age = req.body.age;
  if (age === 'yes') {
    res.redirect("/home")
  } else {
    // If user is not old enough, show the age verification view again with an error message
    res.render('age-verification/age-verification', { over18: false, error: 'You must be at least 18 years old to access this site.' });
  }
});

module.exports = router;
