import { Router } from "express"
import { getProfile, logIn, logOut, signUp, forgetPassword, resetPassword } from "../controllers/auth.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
const router = Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/logout", logOut)

router.post("/password/forgot", forgetPassword)
router.post("/password/reset/:token", resetPassword)


router.get("/profile", isLoggedIn, getProfile)


export default router