import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const markSchema = new mongoose.Schema(
    {   
        student: {
            type: ObjectId,
            ref: "Student",
            trim: true,
            required: [true, "please enter the student information"]
        },
        internship: {
            unique: true,
            type: ObjectId,
            ref: "Internship",
            trim: true,
            required: [true, "please enter the internship information"]
        },
        innovation : {
            type : Number,
            required: [true , "please fill the innovation field"]
        },
        knowledge : {
            type : Number,
            required: [true , "please fill the knowledge field"]
        },
        discipline : {
            type : Number,
            required: [true , "please fill the discipline field"]
        },
        skills : {
            type : Number,
            required: [true , "please fill the skills field"]
        },
        initiative : {
            type : Number,
            required: [true , "please fill the initiative field"]
        },
        feedback : {
            type : String,
        },
        full_mark : {
            type : Number,
        },

    },
    {timestamps: true}
);
const Mark = mongoose.model("Mark", markSchema);



export default Mark;
