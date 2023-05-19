import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const postSchema = new mongoose.Schema(
    {   
        company: {
            type: ObjectId,
            ref: "Company",
            trim: true,
            required: [true,"please enter a supervisor for this offer"],
            maxLength: 50,
        },
        image: {
            type:String,
            default:""
        },
        
        title: {
            type: String,
            trim: true,
            required: [true,"Please enter the post title"],
            unique: true,
        },
       
        description: {
            required: [true,"please write a description for this internship"],
            maxLength: 2000,
            type: String,
        },   
        isOffer:{
            type:Boolean,
            default: true,
            required:true
        }
    },
    {timestamps: true}
);
const Post = mongoose.model("Post", postSchema);



export default Post;
