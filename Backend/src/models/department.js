import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const departmentSchema = new mongoose.Schema(
    {   
        full_name: {
            type: String,
            trim: true,
            required: [true,"Please enter the department you belong to"],
        },
        faculty: {
            type: ObjectId,
            ref: "Faculty",
            required: [true,"please enter the faculty this department belongs to"],
        }               
    },
    {timestamps: true}
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
