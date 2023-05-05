import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
const webmasterSchema = new mongoose.Schema(
    {   
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
        
        faculty: {
            type: String,
            required: [true,"Please Choose your faculty"],
        },
        userType: {
            type: String,
            default: 'webmaster'
        },
             
    },
    {timestamps: true}
);

webmasterSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
webmasterSchema.methods.comparePassword = async function (inputPassword){
    return await bcrypt.compare(inputPassword,this.password)
    }
webmasterSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id, userType:this.userType, full_name:this.full_name}, "azertyuiop",{
        expiresIn: 3600
    })
}
const Webmaster = mongoose.model("Webmaster", webmasterSchema);

export default Webmaster;
