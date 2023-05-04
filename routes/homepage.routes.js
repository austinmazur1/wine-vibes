const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

// Define a route for the homepage
router.get('/', (req, res) => {
  // Connect to the MongoDB database
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error connecting to database');
    }
    // Get a reference to the collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    // Find all documents in the collection and return them as an array
    collection.find({}).toArray((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching data from database');
      }
      // Close the database connection
      client.close();
      // Render the homepage template with the retrieved data
      res.render('homepage', { products: docs });
    });
  });
});



module.exports = router;
