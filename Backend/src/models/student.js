import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
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
            type: String,
            trim: true,
            required: [true,"Please add a Password"],
            minlength: [6,"password must have at least six(6) characters"],
            match:[
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character"
            ]
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
        },
        phone: {
            type: Number,
        },
        department: {
            type: String,
            required: [true,"Please Choose your department"],
        },
        userType: {
            type: String,
            default: 'student'
        },
             
    },
    {timestamps: true}
);

studentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
studentSchema.methods.comparePassword = async function (inputPassword){
return await bcrypt.compare(inputPassword,this.password)
}
studentSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id, userType:this.userType, full_name:this.full_name}, "azertyuiop",{
        expiresIn: 3600
    })
}
const Student = mongoose.model("Student", studentSchema);

export default Student;
