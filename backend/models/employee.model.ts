import { Schema, model, Document, Types } from "mongoose";

export enum EmployeeRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    EMPLOYEE = "EMPLOYEE",
}

export enum EmployeeStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export interface IEmployee extends Document {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;

    role: EmployeeRole;
    status: EmployeeStatus;

    department: Types.ObjectId;

    designation: string;

    salary: number;

    joiningDate: Date;

    profileImage?: string;

    address?: string;

    isDeleted: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
        },

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: Object.values(EmployeeRole),
            default: EmployeeRole.EMPLOYEE,
        },

        status: {
            type: String,
            enum: Object.values(EmployeeStatus),
            default: EmployeeStatus.ACTIVE,
        },

        department: {
            type: Schema.Types.ObjectId,
            ref: "Departments",
            required: true,
        },

        designation: {
            type: String,
            required: true,
        },

        salary: {
            type: Number,
            default: 0,
        },

        joiningDate: {
            type: Date,
            default: Date.now,
        },

        profileImage: String,

        address: String,

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model<IEmployee>("Employee", employeeSchema);