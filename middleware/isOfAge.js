module.exports = (req, res, next) => {
    if (req.body.age === "yes") {
        res.redirect("/home");
    } else res.redirect('/');
}