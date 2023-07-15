const express = require('express');
const router = express.Router();
const { adminsignupcontroller, adminsetuppasswordcontroller } = require('../controllers/admincontroller');

router.post('/signup', adminsignupcontroller);
router.post('/setpassword/:id', adminsetuppasswordcontroller);

module.exports = router;
