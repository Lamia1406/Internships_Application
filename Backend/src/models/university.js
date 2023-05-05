import mongoose from "mongoose";
const universitySchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            trim: true,
            required: [true,"please enter the university  name"],
            unique:true
        },
        address: {
            type: String,
            trim: true,
            required: [true,"Please enter the university address"],
        }
    },
    {timestamps: true}
);
const University = mongoose.model("University", universitySchema);



export default University;
