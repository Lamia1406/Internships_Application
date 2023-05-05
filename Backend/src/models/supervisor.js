import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const supervisorSchema = new mongoose.Schema(
    {   
   
        full_name: {
            type: String,
            trim: true,
            required: [true,"Please enter your full name"],
            maxLength: 50,
            minLength: 5
        },
     
        email: {
            type: String,
            trim: true,
            required: [true,"Please enter your email"],
            unique: true,
            match:[
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "unvalid email"
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
        company: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            default: 'supervisor'
        },
             
    },
    {timestamps: true}
);

supervisorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
supervisorSchema.methods.comparePassword = async function (inputPassword){
    return await bcrypt.compare(inputPassword,this.password)
}
supervisorSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id, userType:this.userType, full_name:this.full_name}, "azertyuiop",{
        expiresIn: 3600
    })
}
const Supervisor = mongoose.model("Supervisor", supervisorSchema);

export default Supervisor;
