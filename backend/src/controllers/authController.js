
import { genrateToken } from "../config/utils.js"
import User from "../models/userModels.js"
import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.js"
export const login=async(req,res)=>{
    const {email,password}=req.body
try{
if(!email || !password){
    return res.status(400).json({ message: "All fields are required" });
}
const user=await User.findOne({email})
if(!user){
    res.status(400).json({message:"User doesn't exists"})
}
const checkPassowrd=await bcrypt.compare(password,user?.password)
if(!checkPassowrd){
 return res.status(400).json({ message: "Invalid Creditionals" });
}
genrateToken(user?._id,res)
 res.status(200).json({
        _id:user?._id,
        fullName:user?.fullName,
        email:user?.email,
        prodilePic:user?.profilePic,
        createdAt: user?.createdAt,
  updatedAt: user?.updatedAt

    })

}catch(error){
          console.log(error)
 res.status(500).json({message:"Internal server error"})
}
}
export const logout=async(req,res)=>{
      try{
   res.cookie("jwt","",{maxAge:0})
   res.status(200).json({message:"Log out successfully"})
      }catch(error){
          console.log(error)
 res.status(500).json({message:"Internal server error"})
}
}
export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body
    try{
        if (!fullName || !email || !password) {
  return res.status(400).json({ message: "All fields are required" });
}
        if(password.length<6){
            return res.status(400).json({message:"Password length must be atleast 6 characters"})
        }
const user=await User.findOne({email})
if(user) return res.status(400).json({message:"User already exists"})
    const salt=await bcrypt.genSalt(10)
const hashedpaswword=await bcrypt.hash(password,salt)
const newuser=new User({
fullName,email,password:hashedpaswword
})
if(newuser){
    genrateToken(newuser?._id,res)
    await newuser.save();
    res.status(201).json({
        _id:newuser?._id,
        fullName:newuser?.fullName,
        email:newuser?.email,
        prodilePic:newuser?.profilePic

    })
}else{
    res.status(400).json({message:"Invalid user data"})
}
    }catch(error){
        console.log(error)
 res.status(500).json({message:"Internal server error"})
    }

}

export const updateProfile=async(req,res)=>{
  try{
    const {profilePic}=req.body
   const userId= req.user._id
   if(!profilePic){
    return res.status(400).json({message:"Profile Pic not provided"})
   }
  const uploadResponse=await cloudinary.uploader.upload(profilePic)
  const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
  res.status(200).json(updatedUser)
  }catch(error){
        console.log(error)
 res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth=async(req,res)=>{
    try{
        res.status(200).json(req.user)
}catch(error){
        console.log(error)
 res.status(500).json({message:"Internal server error"})
    }
}