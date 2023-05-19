import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const webmasterSchema = new mongoose.Schema(
    {   
        full_name:{
            type:String,
            required: [true,"Please enter your full name"],            
        },
        email: {
            type: String,
            trim: true,
            required: [true,"Please enter your email"],
            unique: true,
            match:[
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "only university emails are allowed"
            ]
        },
        password: {
            type: String,
            required:[true, "please enter your password"]
        },
        image:{
            type: String,
            default: ""
        },
        userType: {
            type: String,
            default: 'webmaster'
        },
             
    },
    {timestamps: true}
);

webmasterSchema.methods.comparePassword = async function (inputPassword){
    if(inputPassword == this.password){
        return true
    }
    else {
       return false
    }
}
webmasterSchema.methods.jwtGenerateToken = function(){
    const payload = this.toObject();
    return jwt.sign(payload,"azertyuiop",{
        expiresIn: 3600*24*7
    })
}
const Webmaster = mongoose.model("Webmaster", webmasterSchema);

export default Webmaster;
