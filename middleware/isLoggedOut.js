module.exports = (req, res, next) => {
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  if (req.session.currentUser) {
    console.log("FROM THE MIDDLE WAre",req.session);
    console.log("hi");
    return res.redirect("/home");
  }
  next();
};
