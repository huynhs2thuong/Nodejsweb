// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('./../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Postuser.find((err, data) => {
    if(!err){
      res.send('user', {data})
    }
    else{
      res.send("error: ", err)
    }
  })
});

router.post('/', function(req, res, next) {
  let user = new User({
    fullname 		: req.body.fullname,
    img 			  : req.body.img,
    email 			: req.body.email,
    password 		: req.body.password,
  })

  user.save()
  .then(data => res.send(data))
});

module.exports = router;