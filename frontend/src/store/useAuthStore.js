import {create} from "zustand"
import api from "../lib/axios"
import toast from "react-hot-toast"
import {io} from 'socket.io-client'
const BASE_URL=import.meta.env.NODE==="development"?'http://localhost:5000/api/':'/'
export const useAuthStore=create((set,get)=>({
   authUser:null,
   isSignInUp:false,
   isLoggingIn:false,
   isUpdatingProfile:false,
   isCheckingAuth:true, //when we refresh the page
    onlineUsers:[],
    socket:null,

   checkAuth:async()=>{
      try{
                    const res=await api.get('/auth/check')
                    set({authUser:res.data});
                    get().connectSocket();
      }catch(error){
console.log(error)
set({authUser:null})
      }finally{
         set({isCheckingAuth:false})
      }
   }
,
   signup:async(data)=>{
      try{
const res=await api.post('/auth/signup',data)
set({authUser:res.data})
toast.success("Account created successfully")
      }catch(error){
console.log(error)
toast.error(error.response.data.message)
      }finally{
         set({isSignInUp:false})
      }
   },
   login:async(data)=>{
      set({isLoggingIn:true})
try{
   const res=await api.post("/auth/login",data)
   set({authUser:res.data})
   toast.success("Logged In Successfully");
 get()?.connectSocket();
}catch(error){
toast.error(error.response.data.message)
}finally{
   set({isLoggingIn:false})
}
   },
   logout:async(data)=>{
      try{
         await api.post("/auth/logout")
         set({authUser:null})
         toast.success("Log out successfully");
         get().disconnectSocket ();
      }catch(error){
         toast.error(error.response.data.message)
      }
      },
      updateProfile:async(data)=>{
         set({isUpdatingProfile:true})
try{
   const res=await api.post("/auth/update-profile",data)
   set({authUser:res.data})
   toast.success("profile Updated Successfully")
}catch(error){
   console.log('error.response.data.message')
toast.error(error.response.data.message)
}finally{
   set({isUpdatingProfile:false})
}
      },
      connectSocket:async()=>{
         const {authUser}=get()
         console.log(authUser)
         if(!authUser || get()?.socket?.connected) return;
         const socket=io(BASE_URL,{
            query:{ 
               userId:authUser?._id
            }
         })
         socket.connect()
         set({socket:socket})
         socket.on("getOnlineUsers",(userIds)=>{
     set({onlineUsers:userIds})
         })

      },
       disconnectSocket:async()=>{
           if(get().socket?.connected) get.socket.disconnect()
      }
}))