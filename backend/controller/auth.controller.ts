import {Request,Response} from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'
export const signup = async(req:Request,res:Response)=>{
    try {
        const {name,email,password}  = req.body

        if (!name ||!email ||!password) {
            return res.status(400).json({message:"all filed are required"})
        }

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({message:"email already existing on db"})
        }

        const hashpassword = await bcrypt.hash(password,10)

        const user  = await User.create({
            name,
            email,
            password:hashpassword
        })

        return res.status(200).json({message:"signup sucessfully",user})
    } catch (error:any) {
        console.log(`signup error`)
        return res.status(500).json({message:"signup sucessfully",error:error.message})
    }
}



export const login = async(req:Request,res:Response)=>{
    try {
        const {email,password}  = req.body

        if (!email ||!password) {
            return res.status(400).json({message:"all filed are required"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message:"email not exist please signup first"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.status(400).json({message:"password are not match wrong password"})
        }
        return res.status(200).json({message:"login sucessfully",user})

    } catch (error:any) {
        console.log(`signup error`)
        return res.status(500).json({message:"login error",error:error.message})
    }
}