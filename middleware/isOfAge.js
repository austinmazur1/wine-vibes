const isOfAge = (req, res, next) => {
    const isAgeVerified = req.session.ageVerified;
console.log(isAgeVerified);
    if(isAgeVerified) {
        res.redirect('/home')
    } else {
        res.redirect('/')
    }
}

const isNotOfAge = (req, res, next) => {
    const isAgeVerified = req.session.ageVerified;
    console.log(isAgeVerified);
    if (!isAgeVerified) {
      res.redirect("/");
    }
  };

  

module.exports = {
isOfAge,
isNotOfAge
}