import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const {ObjectId} = mongoose.Schema;
const responsibleSchema = new mongoose.Schema(
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
        fax: {
            type: Number,
        },
        phone: {
            type: Number,
        },
        department: {
            type: ObjectId,
            ref:"Department",
            required: true
        },
        userType: {
            type: String,
            default: 'department responsible'
        },
             
    },
    {timestamps: true}
);

responsibleSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
responsibleSchema.methods.comparePassword = async function (inputPassword){
    return await bcrypt.compare(inputPassword,this.password)
}
responsibleSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id, userType:this.userType, full_name:this.full_name}, "azertyuiop",{
        expiresIn: 3600
    })
}
const Responsible = mongoose.model("Responsible", responsibleSchema);

export default Responsible;
