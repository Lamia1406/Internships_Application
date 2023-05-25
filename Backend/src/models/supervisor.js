import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const {ObjectId} = mongoose.Schema;

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
            required: [true,"Please add a Password"],
        },
        company: {
            type: ObjectId,
            ref:"Company",
            required: true
        },
        userType: {
            type: String,
            default: 'supervisor'
        },
        image: {
            type:String,
            default:""
        },
        accepted : {
            type: Number,
            default : 0
        },
        rejected : {
            type: Number,
            default : 0
        },
        pending : {
            type: Number,
            default : 0
        },
             
    },
    {timestamps: true}
);
supervisorSchema.methods.comparePassword = async function (inputPassword){
    
    if(inputPassword == this.password){
        return true
    }
    else {
       return false
    }
}
supervisorSchema.methods.jwtGenerateToken = function(){
    const payload = this.toObject();
    return jwt.sign(payload,"azertyuiop",{
        expiresIn: 3600*24*7
    })
}
const Supervisor = mongoose.model("Supervisor", supervisorSchema);

export default Supervisor;
