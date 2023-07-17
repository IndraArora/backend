const Admin = require("../schema/Admin");
const Employeer = require("../schema/Employeer");
const User = require("../schema/User");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

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
async function emailsendcontroller(req, res) {
  const token = req.params.id;
  const verifyToken = (token) => {
    // In this route, an email is sent to the user via a public URL with the bound JWT token.
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
  const user = await Admin.findOne({ _id: id });
  if (!user) {
    return res.json({ message: 'user does not exist' });
  }
  console.log(user);
  console.log(user.username);
  console.log(id);

  // Create a transporter using the Gmail SMTP server
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'indraarora726@gmail.com', // Replace with your Gmail email address
      pass: 'ecyoguzirnydwxyp', // Replace with your Gmail password
    },
  });

  // Compose the email message
  const mailOptions = {
    from: 'indraarora726@gmail.com', // Sender's email address
    to: user.email, // Recipient's email address
    subject: 'Email Subject', // Subject line
    text: id.toString(), // Plain text body
    html: id.toString(), // HTML body (optional)
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      return res.json({ message: `Email is sent to ${user.username}` });
    }
  });
}
async function setpasswordcontroller(req,res){
  const userid = req.params.id;
  const password = req.body.password;
  async function encryptPassword(password) {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.error('Error encrypting password:', error);
      throw error;
    }
  }
  const user = await Admin.findOne({_id:userid});
  user.password = await encryptPassword(password);
  user.setpassword = true;
  // await Admin.save();
  await user.save();
  return res.json({message:'password saved successfully' , user });

}
async function showdetailscontroller(req, res) {
  const id = req.params.id;
  const password = req.body.password;

  const user = await Admin.findOne({ _id: id });

  async function comparePasswords(plainTextPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }
  }

  const isMatch = await comparePasswords(password, user.password);

  if (isMatch) {
    return res.send({ message: 'User details are:', user });
  } else {
    return res.send({ message: 'Incorrect password or other credentials' });
  }
}

module.exports = {
  admindetailscontroller,emailsendcontroller, setpasswordcontroller , showdetailscontroller
};
