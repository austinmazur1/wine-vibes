 const isOfAge = (req, res, next) => {
     const isAgeVerified = req.session.ageVerified;
 console.log(isAgeVerified);
     if(isAgeVerified) {
        return res.redirect('/home')
     }
     next()
 }

const isNotOfAge = (req, res, next) => {
    const isAgeVerified = req.session.ageVerified;
    console.log(isAgeVerified);
    if (!isAgeVerified) {
      return res.redirect("/");
    }
    next()
  };

  

module.exports = {
isOfAge,
isNotOfAge
}