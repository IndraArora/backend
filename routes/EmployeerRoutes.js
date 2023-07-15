const express = require('express')
const router = express.Router();
const employeecontroller = require('../controllers/employeecontroller');
router.post('/signup' , employeecontroller);
module.exports = router;