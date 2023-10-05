import { Router } from "express"
import { generateOrder, generateRazorpayOrderId, getAllOrders, getMyorders, updateOrderStatus } from "../controllers/order.controller.js"
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js"
import AuthRoles from "../utils/authRoles.js"

const router = Router()
//Todo add all routes here
export default router