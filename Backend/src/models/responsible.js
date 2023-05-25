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
            required: [true,"Please add a Password"]
        },
        fax: {
            type: Number,
        },
        phone: {
            type: Number,
        },
        userType: {
            type: String,
            default: 'department responsible'
        },
        department: {
            type: ObjectId,
            ref: "Department",
            required: [true,"please enter the department you belong to"],
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

responsibleSchema.methods.comparePassword = async function (inputPassword){
    
    if(inputPassword == this.password){
        return true
    }
    else {
       return false
    }
}
responsibleSchema.methods.jwtGenerateToken = function(){
    const payload = this.toObject();
    return jwt.sign(payload,"azertyuiop",{
        expiresIn: 3600*24*7
    })
}

responsibleSchema.statics.hasDepartmentResponsible = async function(department) {
    const responsible = await this.findOne({ department: department });
    return !!responsible;
  }
  
const Responsible = mongoose.model("Responsible", responsibleSchema);

export default Responsible;
