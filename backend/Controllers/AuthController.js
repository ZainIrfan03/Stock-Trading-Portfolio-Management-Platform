const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({ 
        message: "Request body is missing",
        success: false 
      });
    }
    
    const { email, password, username, createdAt } = req.body;
    
    // Check if required fields are present
    if (!email || !password || !username) {
      return res.status(400).json({ 
        message: "All fields are required",
        success: false 
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ 
        message: "User already exists",
        success: false 
      });
    }
    
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      sameSite: "strict", // Add this for better security
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    });
    
    res.status(201).json({ 
      message: "User signed up successfully", 
      success: true, 
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Internal server error", 
      success: false,
      error: error.message 
    });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}