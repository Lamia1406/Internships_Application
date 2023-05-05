import mongoose from "mongoose";


const companySchema = new mongoose.Schema(
    {   
        company_name: {
            type: String,
            trim: true,
            required: [true,"Please enter the company name"],
        },
       
        address: {
            required: [true,"please enter the address of the company"],
            type: String,
        },   
    },
    {timestamps: true}
);
const Company = mongoose.model("Company", companySchema);



export default Company;
