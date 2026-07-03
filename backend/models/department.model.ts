import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentName: String
});

export default mongoose.model("Department", departmentSchema);