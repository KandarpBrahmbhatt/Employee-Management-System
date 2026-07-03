import bcrypt from "bcryptjs";
import employeeModel from "../models/employee.model";

export const createEmployeeService = async (data: any) => {

    const { employeeId, firstName, lastName, email, phone, password, department, designation, joiningDate, address } = data;

    const existingEmployee = await employeeModel.findOne({ employeeId });

    if (existingEmployee) {
        throw new Error("Employee ID already exists");
    }

    const existingEmail = await employeeModel.findOne({
        email
    });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await employeeModel.create({
        employeeId,
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        department,
        designation,
        joiningDate,
        address
    });

    return await employeeModel.findById(employee._id);

};

export const gettingEmployeeService = async (page: number, limit: number, search?: string) => {
    try {
        const skip = (page - 1) * limit
        const filter: any = {
            isDeleted: false
        }

        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }

        const total = await employeeModel.countDocuments(filter)

        const employees = await employeeModel.find(filter)
            .populate("department", "departmentName")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        return { total, page, totalPages: Math.ceil(total / limit), employees }
    } catch (error) {
        console.log(`gettingEmployee error ${error}`)
        throw error;
    }
}


export const getEmployeeByIdService = async (id: string) => {

    const employee = await employeeModel.findOne({ _id: id, isDeleted: false })
        .populate("department");

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee;

};


export const updateEmployeeService = async (id: string,body: any) => {

    const employee = await employeeModel.findOneAndUpdate(

        {
            _id: id,
            isDeleted: false
        },

        body,

        {
            new: true,
            runValidators: true
        }

    );

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee;

};

export const deleteEmployeeService = async (id: string) => {
    const employee = await employeeModel.findOneAndUpdate(
        {
            _id: id
        },
        {
            isDeleted: true
        },
        {
            new: true
        }

    );

    if (!employee) {
        throw new Error("Employee not found");
    }

    return employee;

};