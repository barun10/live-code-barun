import { Router } from "express"
import { getProfile, logIn, logOut, signUp } from "../controllers/auth.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
const router = Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/logout", logOut)

router.get("/profile", isLoggedIn, getProfile)


export default router