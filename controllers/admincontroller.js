const Admin = require('../schema/Admin')
const User = require('../schema/User')
const Employee = require('../schema/Employeer')
const jwt = require('jsonwebtoken')

module.exports = {
  adminsignupcontroller: async function (req, res) {
    const data = req.body;
    const email = req.body.email;
    const check1 = await Admin.findOne({ email });
    const check2 = await User.findOne({ email });
    const check3 = await Employee.findOne({ email });
    if (check1 || check2 || check3) {
      return res.json({ message: 'already exists' });
    }
    const newAdmin = new Admin(data);
    const id = newAdmin._id;
    
    const generateToken = (userId) => {
      const payload = {
        userId: id,
      };
    
      // Set expiration time (optional)
      const expiresIn = '1h';
    
      // Sign the token with a secret key
      const token = jwt.sign(payload, 'your-secret-key', { expiresIn });
      return token;
    };
    
    const userToken = generateToken(id);
    console.log(userToken);
    
    newAdmin.save();
    return res.json({ message: 'admin signed up successfully', newAdmin });
  },
  
  adminsetuppasswordcontroller: async function (req, res) {
    const token = req.params.id;
    
    const verifyToken = (token) => {
      try {
        // Verify the token with the secret key
        const decoded = jwt.verify(token, 'your-secret-key');
    
        // Extract the userId from the decoded payload
        const userId = decoded.userId;
    
        return userId;
      } catch (error) {
        // Token is invalid or has expired
        return null;
      }
    };
    
    const id = verifyToken(token);
    console.log(id);
    const loggeduser = await Admin.findOne({_id:id});
    loggeduser.password = req.body.password;
    await loggeduser.save();
    console.log(loggeduser);
    res.json({message:'this is the path for setting up password'})
  }
};
