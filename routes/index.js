var express = require('express');
var router = express.Router();
var equipRouter = require('./equipment/router');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

equipRouter.route(router);

module.exports = router;
