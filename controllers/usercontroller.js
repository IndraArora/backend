const User = require('../schema/User')
const Employee = require('../schema/Employeer')
const Admin = require('../schema/Admin')
const jwt = require('jsonwebtoken')

module.exports = async function userController(req,res){
    const email = req.body.email;
    const check1 =await Admin.findOne({email});
    const check2 =await User.findOne({email});
    const check3 = await Employee.findOne({email});
    if(check1 || check2 || check3)
    {
        return res.json({message:'already exsists'});
    }
    const data =req.body;
    const newuser = new User(data);
    const generateToken = (userId) => {
        const payload = {
          userId: userId,
        };
      
        // Set expiration time (optional)
        const expiresIn = '1h';
      
        // Sign the token with a secret key
        const token = jwt.sign(payload, 'your-secret-key', { expiresIn });
      
        return token;
      };
      
      // Example usage after successful authentication
      const userId = data._id;
      const token = generateToken(userId);
      console.log('Generated token:', token);
    newuser.save();
    return res.json({message:'user signed up successfully'})
}