import { z } from "zod";

export const createEmployeeSchema = z.object({

    employeeId: z.string().min(1, "Employee Id is required"),

    firstName: z.string().min(2),

    lastName: z.string().min(2),

    email: z.email(),

    phone: z.string().min(10),

    password: z.string().min(6),

    department: z.string(),

    designation: z.string(),

    joiningDate: z.string().optional(),

    address: z.string().optional()

});