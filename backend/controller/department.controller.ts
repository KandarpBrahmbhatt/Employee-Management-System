import departmentModel from "../models/department.model"
import { Request,Response } from "express"

export const createDepartment = async(req:Request,res:Response) =>{
    try {
        const {departmentName} = req.body

        const department = await departmentModel.create({
            departmentName
        })
        return res.status(200).json({message:"create department sucessfully",department})
    } catch (error) {
        console.log(`createDepartment error${error}`)
        return res.status(500).json({message:"createDepartment successfully"})
    }
}