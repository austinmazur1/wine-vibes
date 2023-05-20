const session = require("express-session");

// ADDED: require mongostore
const MongoStore = require('connect-mongo');
 
// ADDED: require mongoose
const mongoose = require('mongoose');

module.exports = (app) => {

 // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there
 

  //create SESS_SECRET va in .env file

  app.set("trust proxy", 1);

  app.use(
    session({
      //sess_secret is defined in our .env file
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        //not fully standardized as per docs, 'lax - lax same site enforcement'
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        // maxAge: 24 * 60 * 60 * 1000 //24 hours
        // maxAge: 60000 //1 minute
        maxAge: 600000 //10 minutes
        
                // maxAge: 60000,
      },
      //make sure to use the var that holds string from .env file
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        mongooseConnection: mongoose.connection
        // ttl: 60 * 60 * 24, // 1 day
      }),
    })
  );
};

//'production' for using secure cookies in production but 
//allowing for development in testing

// saveUninitialized: false, useful for implementing login sessions