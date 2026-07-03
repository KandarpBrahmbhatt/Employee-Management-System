import express from 'express'
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from '../controller/employess.controller';
import { createDepartment } from '../controller/department.controller';
// import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from '../controller/employess.controller'

const employeessRouter = express.Router()

// employeessRouter.post("/create",createEmployee)
// employeessRouter.get("/get",getEmployee)
// employeessRouter.put("/update",updateEmployee)
// employeessRouter.delete("/deleted",deleteEmployee)

employeessRouter.post("/", createEmployee);

employeessRouter.get("/", getEmployees);

employeessRouter.get("/:id", getEmployeeById);

employeessRouter.put("/:id", updateEmployee);

employeessRouter.delete("/:id", deleteEmployee);


employeessRouter.post("/createDepartment",createDepartment)
export default employeessRouter