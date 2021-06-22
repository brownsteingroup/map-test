var express = require('express');
var router = express.Router();
const jokes = require("give-me-a-joke");
var db = firebase.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Map App'
  });
  db.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

jokes.getRandomDadJoke(function(joke) {
  console.log(joke);
});

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

module.exports = router;
