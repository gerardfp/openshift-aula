var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('localhost:27017/apprenent'); 


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.send({});
});

module.exports = router;