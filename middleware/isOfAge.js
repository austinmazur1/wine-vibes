 const isOfAge = (req, res, next) => {
     const isAgeVerified = req.session.ageVerified;
 console.log(isAgeVerified);
     if(isAgeVerified) {
         res.redirect('/home')
     }
     next()
 }

const isNotOfAge = (req, res, next) => {
    const isAgeVerified = req.session.ageVerified;
    console.log(isAgeVerified);
    if (!isAgeVerified) {
      res.redirect("/");
    }
    next()
  };

  

module.exports = {
isOfAge,
isNotOfAge
}