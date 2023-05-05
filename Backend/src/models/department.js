import mongoose from "mongoose";


const {ObjectId} = mongoose.Schema;
const departmentSchema = new mongoose.Schema(
    {   
        
        name: {
            type: String,
            trim: true,
            required: [true,"Please enter the department name"],
            unique: true,
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
