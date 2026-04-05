import cloudinary from "../config/cloudinary.js"
import { getReceiverSocketId, io } from "../config/socket.js"
import Message from "../models/messageModel.js"
import User from "../models/userModels.js"

export const getUserForSidebar=async(req,res)=>{
    try{
        const loggenInUserId=req.user._id
        const filtereduser=await User.find({_id:{$ne:loggenInUserId}}).select("-password")
        res.status(200).json(filtereduser)

    }catch(error){
        console.log(error)
 res.status(500).json({message:"Internal server error"})
    }
}

export const getMessages=async(req,res)=>{
    try{
         const {id:userToChatId}=req.params
         const myId=req.user._id
         const messages=await Message.find({
            $or:[
                {senderId:myId,recieverId:userToChatId},
                 {senderId:userToChatId,recieverId:myId}
            ]
         })
         res.status(200).json(messages)
    }catch(error){
        console.log(error)
 res.status(500).json({message:"Internal server error"})
    }

}

export const sendMessage=async(req,res)=>{
try{
   const {text,image}=req.body
   const {id:recieverId}=req.params
   const senderId=req.user._id
   let imageUrl;
   if(image){
    const uplaodResponse=await cloudinary.uploader.upload(image)
    imageUrl=uplaodResponse.secure_url
   }
    const newMessage=new Message({
        senderId,recieverId,text,image:imageUrl
    })
    await newMessage.save()
    const recieverSocketId=getReceiverSocketId(recieverId)
    if(recieverSocketId){
       io.to(recieverSocketId).emit("newMessage",newMessage)
    }
    res.status(201).json(newMessage)
   
}catch(error){
        console.log(error)
 res.status(500).json({message:"Internal server error"})
    }
}