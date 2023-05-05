import express from "express"
import { StatusCodes } from "http-status-codes";
 import Post from "./models/post.js";
import Supervisor from "./models/supervisor.js";
import ErrorResponse from "./utils/errorResponse.js";
import Company from "./models/company.js";
import multer from "multer";
const router = express.Router();
// const Storage = multer.diskStorage({
//     destination :"uploads",
// })
// const upload = multer({
//     storage: Storage
// }).single('testImage')
const type = {
    student : "student",
    depResponsible : "department responsible",
    supervisor : "internship supervisor",
    not_found : "not found"
}
const status = {
    success: true,
    failure: false
}
router.get("/allPosts",async (req,res)=>{
    const pageSize= 5;
    const page = Number(req.query.pageNumber) || 1
    const count = await Post.find({}).estimatedDocumentCount();
    try{
        const posts = await Post.find().populate("company")
        .skip(pageSize * (page -1)).limit(pageSize)
        res.status(StatusCodes.OK).send(
            {
                status:status.success,
                posts,
                page,
                pages: Math.ceil(count / pageSize),
                count
            }
            )
    }
    catch(err){
        err.message
         }
     })


    router.post("/createCompany",async(req,res,next)=>{
        
        try{
            const company = await Company.create(req.body);
            res.status(StatusCodes.CREATED).send(
                {
                    status:status.success,
                    message: "Successfully Created"
                }
                )
            }
            catch(err){
                console.log(`error : ${err}`)
              next(err)
                } 
    })

    router.get("/allCompanies",async (req,res)=>{
    try{
        const companies = await Company.find();
        res.status(StatusCodes.OK).send(
            {
                status:status.success,
                companies
            }
            )
    }
    catch(err){
        err.message
         }
     })
     router.post("/createPost",async(req,res,next)=>{
        try{
            const post = await Post.create(req.body);
            res.status(StatusCodes.CREATED).send(
                {
                    status:status.success,
                    message: "Successfully Created"
                }
                )
            }
            catch(err){
              next(err)
                } 
    })



export default router;
