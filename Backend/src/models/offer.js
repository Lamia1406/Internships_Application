import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const internshipSchema = new mongoose.Schema(
    {   
        student: {
            immutable:[true,"You can't update this field"],
            type: ObjectId,
            ref: "Student",
            trim: true,
            required: [true,"please enter the student information"]
        },
        post: {
            immutable:[true,"You can't update this field"],
            type: ObjectId,
            ref: "Post",
            required: [true,"please enter the offer details"]
        },
        supervisor: {
            type: ObjectId,
            ref:"Supervisor",
            trim: true,
            required: [true,"please enter the supervisor details"]
        },
        startingDate:{
            type: Date,
            required: [true,"please select a starting day"],
        },
        endingDate:{
            type: Date,
            required: [true,"please select a an ending day"],
        },
       
        approvedByResponsible:{
            type: String,
            default: "pending"
        },
        approvedBySupervisor:{
            type: String,
            default: "pending"
        },
        cv: {
            type:String,
            default:""
        },
        rejectionMessage: {
            type: String,
            default : ""
        },
        
    },
    {timestamps: true}
);
const Internship = mongoose.model("Internship", internshipSchema);



export default Internship;
