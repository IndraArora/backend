const Employee = require('../schema/Employeer')
const Admin = require('../schema/Admin')
const User = require('../schema/User')
const jwt = require('jsonwebtoken')

module.exports = async function employeecontroller(req, res){
    const data = req.body;
    const email = data.email
    const check1 =await Admin.findOne({email});
    const check2 =await User.findOne({email});
    const check3 = await Employee.findOne({email});
    if(check1 || check2 || check3)
    {
        return res.json({message:'already exsists'});
    }
    
    const newemployee = new Employee(data);
    const id = newemployee._id
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
      const userId = newemployee._id;
      const token = generateToken(userId);
      console.log('Generated token:', token);
    newemployee.save();
    return res.json({message:'employee signed up successfully'})
}