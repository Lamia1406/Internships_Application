import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const presenceSchema = new mongoose.Schema(
    {   
        student: {
            type: ObjectId,
            ref: "Student",
            trim: true,
            required: [true, "please enter the student information"]
        },
        supervisor: {
            type: ObjectId,
            ref: "Supervisor",
            trim: true,
            required: [true, "please enter the supervisor information"]
        },
        is_present:{
            type: Boolean,
            default: false,
            required: [true, "Please mark the student's presence"]
        },
        day :{
            type: Date,
            required :[true, "please enter the date of the meeting"],
        },
        changed :{
            type: Boolean,
            default: false
        }

        
    },
    {timestamps: true}
);
const Presence = mongoose.model("Presence", presenceSchema);



export default Presence;
