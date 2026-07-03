// import bcrypt from "bcryptjs"
// import employeeModel from "../models/employee.model"
// import { Request, Response } from "express"

// export const createEmployee = async (req: Request, res: Response) => {
//     try {
//         const {
//             employeeId,
//             firstName,
//             lastName,
//             email,
//             phone,
//             password,
//             department,
//             designation,
//             joiningDate,
//             address
//         } = req.body;
//         console.log(req.body)


//         if (!employeeId || !firstName || !email || !password || !department) {
//             return res.status(400).json({ message: "ALl field are required" })
//         }

//         const existingEmployee = await employeeModel.findOne({ employeeId });

//         if (existingEmployee) {
//             return res.status(409).json({
//                 message: "Employee already exists"
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)

//         const createdEmployee = await employeeModel.create({
//             employeeId,
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             department,
//             joiningDate,
//             address
//         })

//         const employee = await employeeModel
//             .findById(createdEmployee._id)
//             .select("-password");

//         return res.status(200).json({ message: "createEmployee sucessfully", success: true, data: employee })
//     } catch (error: any) {
//         return res.status(500).json({ message: "createEmployee error", success: false, error: error.message })
//     }
// }


// export const getEmployee = async (req: Request, res: Response) => {
//     try {
//         const page = Number(req.query.page) || 1
//         const limit = Number(req.query.limit) || 10
//         const skip = (page - 1) * limit
//         const employee = await employeeModel.find()
//             .skip(skip)
//             .limit(limit)
//         return res.status(200).json({ message: "gettingEmployee scessfully", employee })
//     } catch (error: any) {
//         console.log(`getEmployeess error ${error}`)
//         return res.status(500).json({ message: "gettingEmployee error", error: error.message })
//     }
// }

// export const updateEmployee = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         if (!id) {
//             return res.status(400).json({ message: "employeeId not found" })
//         }

//         const employee = await employeeModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

//         if (!employee) {
//             return res.status(400).json({ message: "employee not found" })
//         }

//         return res.status(200).json({ message: "UpadateEmployee sucessfully", employee })
//     } catch (error) {
//         console.log(`updateEmployee error ${error}`)
//         return res.status(500).json({ message: "update Employee error" })
//     }
// }

// export const deleteEmployee = async (req: Request, res: Response) => {
//     try {
//         const employeedId = req.params.id

//         if (!employeedId) {
//             return res.status(400).json({ message: "employe deleted sucssfully" })
//         }

//         const employee = await employeeModel.findByIdAndDelete(employeedId)

//         return res.status(200).json({ message: "employee delted sucessfully", employee })

//     } catch (error: any) {
//         console.log(`deltedEmployee error ${error}`)
//         return res.status(500).json({ message: "deltedEmployee sucessfully", error: error.message })
//     }
// }


import { Request, Response } from "express";
import { createEmployeeSchema } from "../validator/employe.validator";
import { gettingEmployeeService,getEmployeeByIdService,updateEmployeeService,deleteEmployeeService,createEmployeeService} from "../service/employee.service";
export const createEmployee = async (req: Request, res: Response) => {

    try {
        const validatedData = createEmployeeSchema.parse(req.body);

        const employee = await createEmployeeService(validatedData);

        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const getEmployees = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string;

        const employees = await gettingEmployeeService(page, limit, search);

        return res.status(200).json({

            success: true,

            data: employees

        });

    } catch (error: any) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getEmployeeById = async (
    req: Request,
    res: Response
) => {

    try {

        const employee = await getEmployeeByIdService(
            req.params.id as string
        );

        return res.status(200).json({

            success: true,

            data: employee

        });

    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message
        });

    }

};

export const updateEmployee = async (
    req: Request,
    res: Response
) => {

    try {

        const employee = await updateEmployeeService(
            req.params.id as string,
            req.body
        );

        return res.status(200).json({

            success: true,

            message: "Employee updated successfully",

            data: employee

        });

    } catch (error: any) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const deleteEmployee = async (
    req: Request,
    res: Response
) => {

    try {

        await deleteEmployeeService(
            req.params.id as string
        );

        return res.status(200).json({

            success: true,

            message: "Employee deleted successfully"

        });

    } catch (error: any) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};