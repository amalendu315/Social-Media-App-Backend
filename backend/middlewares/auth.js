const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


exports.isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
          return res.status(401).json({
            message: "Please Login First",
          });
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(mongoose.Types.ObjectId(decoded._id));
        // res.status(201).json({
        //   success:true,
        //   user:req.user,
        // });
        next(); 
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}