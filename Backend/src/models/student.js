import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb";
const studentSchema = new mongoose.Schema(
    {   
        full_name: {
            type: String,
            trim: true,
            required: [true,"Please enter your full name"],
            maxLength: 50,
            minLength: 5
        },
        enrolled: {
            type: String,
            default:"no"
        },
        email: {
            type: String,
            trim: true,
            required: [true,"Please enter your email"],
            unique: true,
            match:[
                /^[\w-\.]+@univ-constantine2.dz/,
                "only university emails are allowed"
            ]
        },
        password: {
            type:String,
            required:[true,"please enter your password"]
        },
        level_of_study: {
            required: [true,"Please choose your level of study"],
            type: String,
        },
        student_card_number: {
            type: Number,
            required: [true,"Please enter your student card number"],

        },
        social_security_number: {
            type: Number,
            required: [true,"Please enter your social security number"],

        },
        phone: {
            type: Number,
            required: [true,"Please enter your phone number"],

        },
        department: {
            type: ObjectId,
            ref:"Department",
            required: [true,"Please Choose your department"],
        },
        userType: {
            type: String,
            default: 'student'
        },
        image: {
            type:String,
            default: ""

        },
             
    },
    {timestamps: true}
);


studentSchema.methods.comparePassword = async function (inputPassword){
    if(inputPassword == this.password){
        return true
    }
    else {
       return false
    }
}
studentSchema.methods.jwtGenerateToken = function(){
    const payload = this.toObject();
    return jwt.sign(payload,"azertyuiop",{
        expiresIn: 3600*24*7
    })
}

const Student = mongoose.model("Student", studentSchema);

export default Student;
