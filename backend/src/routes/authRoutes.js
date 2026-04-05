import express from "express"
import { login,logout,signup,updateProfile,checkAuth } from "../controllers/authController.js"
import { protectedRoute } from "../middleware/protectedRoute.js"
const router=express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post("/update-profile",protectedRoute,updateProfile)
router.get("/check",protectedRoute,checkAuth)
export default router