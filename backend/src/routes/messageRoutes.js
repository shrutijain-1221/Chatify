import express from "express"
import { getUserForSidebar,getMessages,sendMessage } from "../controllers/messageController.js"
import { protectedRoute } from "../middleware/protectedRoute.js"

const router=express.Router()
router.get("/users",protectedRoute,getUserForSidebar)
router.get("/:id",protectedRoute,getMessages)
router.post("/send/:id",protectedRoute,sendMessage)
export default router