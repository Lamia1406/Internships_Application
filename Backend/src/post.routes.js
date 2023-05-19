import express from "express"
import { StatusCodes } from "http-status-codes";
 import Post from "./models/post.js";
import Supervisor from "./models/supervisor.js";
import ErrorResponse from "./utils/errorResponse.js";
import Company from "./models/company.js";
const router = express.Router();

router.post("/createCompany",async(req,res,next)=>{
    const {company_name}= req.body
    const companyExist = await Company.findOne({company_name})
    if(companyExist){
        return next (new ErrorResponse("Company Already Exists", StatusCodes.BAD_REQUEST))
    }
    try{
        const company = await Company.create(req.body);
        res.status(StatusCodes.CREATED).send(
            {
                status:true,
                message: "Successfully Created"
            }
            )
        }
        catch(err){
            console.log(`error : ${err}`)
          next(err)
            } 
})

router.post("/createPost",async(req,res,next)=>{
  const company = req.body.company;
    const supervisorsCount = await Supervisor.countDocuments({ company });
    if (supervisorsCount === 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: false,
        message: "The company does not have any supervisors",
      });
    }
  try{
      const post = await Post.create(req.body);
      res.status(StatusCodes.CREATED).send(
          {
              status:true,
              message: "Successfully Created"
          }
          )
      }
      catch(err){
        next(err)
          } 
})
router.delete('/deleteCompany/:id', async(req, res) => {
    try{
     const { id } = req.params;
     const companyPosts = await Post.find({ company: id });
     const companySupervisors = await Supervisor.find({company:id})
     if(companyPosts.length > 0){
        return res.status(StatusCodes.NOT_FOUND).send({
            status: false,
            message: `This company can't be deleted directly, it is related to so many posts`
          });
     }
    else if(companySupervisors.length > 0){
        return res.status(StatusCodes.NOT_FOUND).send({
            status: false,
            message: `This company can't be deleted directly, it is related to so many supervisors`
          });
     }
     else{
        const result = await Company.findOneAndDelete({ _id: id });
        if(result){
            return res.status(StatusCodes.OK).send({
              status: true,
              message: `User ${id} has been deleted`
            });
          } else {
            return res.status(StatusCodes.NOT_FOUND).send({
              status: false,
              message: `User ${id} has not been found`
            });
          }
     }
     
    }
    catch(error){
     console.log(error)
    }
   });
router.get("/allPosts",async (req,res,next)=>{
    const pageSize= 5;
    const page = Number(req.query.pageNumber) || 1
    const count = await Post.find({}).estimatedDocumentCount();
    try{
        const posts = await Post.find().populate("company")
        .skip(pageSize * (page -1)).limit(pageSize)
        res.status(StatusCodes.OK).send(
            {
                status:true,
                posts,
                page,
                pages: Math.ceil(count / pageSize),
                count
            }
            )
    }
    catch(err){
        next(err)
         }
     })


  

    router.get("/allCompanies",async (req,res)=>{
    try{
        const companies = await Company.find();
        res.status(StatusCodes.OK).send(
            {
                status:true,
                companies
            }
            )
    }
    catch(err){
        err.message
         }
     })
 
    router.delete('/deletePost/:id', async(req, res) => {
        try{
            const { id } = req.params
            const result = await Post.findOneAndDelete({ _id: id });
            if(result){
                return res.status(StatusCodes.OK).send({
                  status: true,
                  message: `Post ${id} has been deleted`
                });
              } else {
                return res.status(StatusCodes.NOT_FOUND).send({
                  status: false,
                  message: `Post ${id} has not been found`
                });
              }
         }
         
        catch(error){
         console.log(error)
        }
       });
   

export default router;
