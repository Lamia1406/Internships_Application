import mongoose from "mongoose";


const {ObjectId} = mongoose.Schema;
const facultSchema = new mongoose.Schema(
    {   
        
        name: {
            type: String,
            trim: true,
            required: [true,"Please enter the faculty name"],
            unique: true,
        },
        university: {
            type: ObjectId,
            ref: "University",
            required: [true,"please enter the university this faculty belongs to"],
        },
       
        address: {
            type: String,
            trim: true,
            required: [true,"Please enter the faculty address"],
        }   
    },
    {timestamps: true}
);
const Faculty = mongoose.model("Faculty", facultSchema);



export default Faculty;
