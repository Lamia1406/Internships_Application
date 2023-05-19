import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const newEstablishmentSchema = new mongoose.Schema(
    {   
        student: {
            type: ObjectId,
            ref: "Student",
            trim: true,
            required: [true, "please enter the student information"]
        },
        theme: {
            type: String,
            required: [true, "Please enter the internship theme"]
        },
        company:{
            type: String,
            required:[true, "Please enter the company's name"]
        },
        supervisor_name: {
            type: String,
            required: [true,"Please enter the supervisor's name"]
        },
        supervisor_email:{
            type: String,
            required: [true, "Please enter the supervisor's email"]
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
    },
    {timestamps: true}
);
const NewEstablishment = mongoose.model("NewEstablishment", newEstablishmentSchema);



export default NewEstablishment;
