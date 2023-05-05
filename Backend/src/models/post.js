import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const postSchema = new mongoose.Schema(
    {   
        company: {
            type: ObjectId,
            ref: "Company",
            trim: true,
            required: [true,"please enter the company name"],
            maxLength: 50,
        },
        image: {
            type:String
        },
        
        title: {
            type: String,
            trim: true,
            required: [true,"Please enter the post title"],
            unique: true,
        },
       
        description: {
            required: [true,"please write a description for this internship"],
            minLength: 50,
            maxLength: 2000,
            type: String,
        },   
    },
    {timestamps: true}
);
const Post = mongoose.model("Post", postSchema);



export default Post;
