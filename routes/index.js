var express = require('express');
var router = express.Router();
const jokes = require("give-me-a-joke");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Map App' });
});

jokes.getRandomDadJoke(function(joke) {
  console.log(joke);
});

module.exports = router;
