const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

////ROUTES////

// GET /auth/signup WORKING
//TODO Create the HBS views for the routes
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /auth/signup WORKING
router.post("/signup", isLoggedOut, async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);
  try {
    // Check that username, email, and password are provided
    if (username === "" || email === "" || password === "") {
      res.status(400).render("auth/signup", {
        errorMessage:
          "All fields are mandatory. Please provide your username, email and password.",
      });

      return;
    }

    if (password.length < 6) {
      res.status(400).render("auth/signup", {
        errorMessage: "Your password needs to be at least 6 characters long.",
      });

      return;
    }

    //   ! This regular expression checks password for special characters and minimum length
    /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

    //create user with hashed password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userFromDB = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    //redirect to the homepage or their profile?
    res.redirect("/");
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render("auth/signup", { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage:
          "Username and email need to be unique. Provide a valid username or email.",
      });
    } else {
      next(error);
    }
  }
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST /auth/login
//login in with email and password only?
router.post("/login", isLoggedOut, async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check that username, email, and password are provided
    if (username === "" || email === "" || password === "") {
      res.status(400).render("auth/login", {
        errorMessage:
          "All fields are mandatory. Please provide username, email and password.",
      });

      return;
    }

    // Here we use the same logic as above
    // - either length based parameters or we check the strength of a password
    if (password.length < 6) {
      return res.status(400).render("auth/login", {
        errorMessage: "Your password needs to be at least 6 characters long.",
      });
    }

    //checks mongoDB for user
    const user = await User.findOne({ email });
    // If the user isn't found, send an error message that user provided wrong credentials
    if (!user) {
      res
        .status(400)
        .render("auth/login", { errorMessage: "Wrong credentials." });
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user.toObject(); //.toObject from ironlauncher unsure if necessary
      delete req.session.currentUser.password; //from ironlauncher, usure if necessary
      res.redirect("/"); //redirect homepage or profile after login?
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
});

// GET /auth/logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }
    //redirected to homepage after logout
    res.redirect("/");
  });
});

// GET /auth/profile/:id   WORKING
//id is the req.session.currentUser.id
router.get("/profile/:id", isLoggedOut, async (req, res, next) => {
  res.send("user page");
});
module.exports = router;
