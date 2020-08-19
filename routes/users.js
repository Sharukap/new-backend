var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

var User = require('../models/students');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


router.post('/login', (req, res, next) => {

	var user1 = req.body;

    var username = user1.username;
	var password = user1.password;
  
    if(username=="Jake" && password=="Cro7"){
		
        res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({approved:true,Account_Type:"default_admin"});
		}
	else {
		    User.findOne({username: username})
			.then((students) => {
		
				  if (students === null) {
					var err = new Error('User ' + username + ' does not exist!');
					err.status = 403;
					return next(err);
				  }
	    
				  else if (students.password !== password) {
					var err = new Error('Your password is incorrect!');
					err.status = 403;
					return next(err);
				  }
	    
				  else if (students.username === username && students.password === password) {
					//req.session.students = 'authenticated';
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					const admin1 = "admin";
					if(students.accounttype === admin1) {
						res.json({approved:true,Account_Type:students.accounttype});
					}
					  
					else {
						res.json({approved:true,Account_Type:students.accounttype,record_Id:students.id});
					}
				  }
				})
		.catch((err) => next(err));
  
	}

});
router.get('/check/:userName',(req,res,next) => {
    var username1 = req.params.userName;
    User.findOne({username: username1})
    .then((students) => {
      if (students === null) {
        var err = new Error('User ' + username + ' does not exist!');
        err.status = 403;
        return next(err);
      }
	    
      else {
        res.json({Name:students.name,Password:students.password,Email:students.email,Telnum:students.telnum,Address:students.address,Account_Type:students.accounttype,record_Id:students.id});
      }
    })
    .catch((err) => next(err));
});



module.exports = router;
