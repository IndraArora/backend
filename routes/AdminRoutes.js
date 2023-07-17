const express = require('express');
const router = express.Router();

const { admindetailscontroller ,emailsendcontroller , setpasswordcontroller , showdetailscontroller  } = require('../controllers/admincontroller');
const Admin = require("../schema/Admin");
const Employeer = require("../schema/Employeer");
const User = require("../schema/User");

router.post('/admindetails', admindetailscontroller); // this is the route/url from which we get the users email id and other credentials. done
router.post('/emailsend/:id' , emailsendcontroller); //This is route/url is send to the user's email id. done
router.post('/setpassword/:id' , setpasswordcontroller); //we take the password from the user and then save it in our database.
router.post('/showdetails/:id' , showdetailscontroller )

module.exports = router;



