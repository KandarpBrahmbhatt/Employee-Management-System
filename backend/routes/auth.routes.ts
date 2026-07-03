import express from 'express'
import { login, signup } from '../controller/auth.controller'

const authRoutes = express.Router()

authRoutes.post("/signup",signup)
authRoutes.get("/login",login)

export default authRoutes