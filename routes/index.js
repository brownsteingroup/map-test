var express = require('express');
var router = express.Router();
const jokes = require("give-me-a-joke");
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBdKZH2sQFXvhugKTYV-wmrQAi3kRDFvFc",
  authDomain: "map-test-5b13d.firebaseapp.com",
  projectId: "map-test-5b13d",
  storageBucket: "map-test-5b13d.appspot.com",
  messagingSenderId: "857681227244",
  appId: "1:857681227244:web:cd70fdfb4bd4d9265964c9",
  measurementId: "G-2L9XBBXMFT"
});
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

module.exports = router;
