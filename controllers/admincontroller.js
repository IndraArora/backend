const Admin = require("../schema/Admin");
const Employeer = require("../schema/Employeer");
const User = require("../schema/User");
const jwt = require('jsonwebtoken');

async function admindetailscontroller(req, res) {
  const userdetails = req.body;
  const email = userdetails.email;
  const admincheck = await Admin.findOne({ email });
  const employeecheck = await Employeer.findOne({ email });
  const usercheck = await User.findOne({ email });
  
  if (admincheck || employeecheck || usercheck) {
    return res.json({ message: 'email already exists' });
  }
  
  const newAdmin = new Admin(userdetails);
  await newAdmin.save();
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
  const id = newAdmin._id;
  const userToken = generateToken(id);
  console.log(userToken);
  
  res.json({ message: 'admin details saved successfully', newAdmin  , userToken});
}
async function emailsendcontroller(req,res){
  const token = req.params.id;
  const verifyToken = (token) => {
    // In this route email is send to the user via a public url with binding the jwt token.
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
  const user  = await Admin.findOne({_id:id});
  if(!user)
  {
    return  res.json({message:'user does not exsist'});
  }
  console.log(user);
  console.log(user.username);
  console.log(id);
  return res.json({message:`email is send to the ${user.username}`});

}
async function setpasswordcontroller(req,res){
  const userid = req.params.id;
  const password = req.body.password;
  const user = await Admin.findOne({_id:userid});
  user.password = password;
  // await Admin.save();
  await user.save();
  return res.json({message:'password saved successfully' });

}
module.exports = {
  admindetailscontroller,emailsendcontroller, setpasswordcontroller
};
