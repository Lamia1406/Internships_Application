import express from "express"
import { StatusCodes } from "http-status-codes";
 import Post from "./models/post.js";
import Supervisor from "./models/supervisor.js";
import ErrorResponse from "./utils/errorResponse.js";
import Company from "./models/company.js";
import Internship from "./models/offer.js";
const router = express.Router();

router.post("/createCompany",async(req,res,next)=>{
    const {full_name}= req.body
    const companyExist = await Company.findOne({full_name})
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
  if(req.body.company == ""){
    return next (new ErrorResponse("Please select a company", StatusCodes.BAD_REQUEST))
  }
    const supervisorsCount = await Supervisor.countDocuments({ company });
    if (supervisorsCount === 0) {
     return next (new ErrorResponse("The company does not have any supervisors", StatusCodes.BAD_REQUEST))

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
router.delete('/deleteCompany/:id', async(req, res, next) => {
    try{
     const { id } = req.params;
     const companyPosts = await Post.find({ company: id });
     const companySupervisors = await Supervisor.find({company:id})
     if(companyPosts.length > 0){
        return next(new ErrorResponse("This company can't be deleted directly, it is related to so many posts", StatusCodes.NOT_FOUND))
     }
    else if(companySupervisors.length > 0){
      console.log(companySupervisors)
        return next(new ErrorResponse(`This company can't be deleted directly, it is related to so many supervisors`, StatusCodes.NOT_FOUND))
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
    catch(err){
     next(err)
    }
   });
   router.get("/allPosts", async (req, res, next) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
  
    try {
      const count = await Post.countDocuments({ isOffer: true }); // Count only the documents with isOffer true
      const pages = Math.ceil(count / pageSize);
  
      const posts = await Post.find({ isOffer: true }) // Fetch only the documents with isOffer true
        .populate("company")
        .skip(pageSize * (page - 1))
        .limit(pageSize);
  
      res.status(StatusCodes.OK).send({
        status: true,
        posts,
        page,
        pages,
        count,
      });
    } catch (err) {
      next(err);
    }
  });
  
router.get("/allCompanies",async (req,res,next)=>{
    try{
        const companies = await Company.find()
        res.status(StatusCodes.OK).send(
            {
                status:true,
              companies
            }
            )
    }
    catch(err){
        next(err)
         }
     })






    router.delete('/deletePost/:id', async(req, res,next) => {
        try{
            const { id } = req.params
     const internships = await Internship.find({ post: id });
     if(internships.length > 0){
        return next(new ErrorResponse("This post can't be deleted directly, it is related to so many internships", StatusCodes.NOT_FOUND))
     }
            const result = await Post.findOneAndDelete({ _id: id });
            if(result){
                return res.status(StatusCodes.OK).send({
                  status: true,
                  message: `Post has been deleted`
                });
              } else {
                return next(new ErrorResponse( `Post has not been found`, StatusCodes.NOT_FOUND))
              }
         }

        catch(err){
        next(err)
        }
       });

       router.put("/modifyPost/:idPost",async(req,res,next)=> {
        try{ 
         const postId= req.params.idPost;
         const post = await Post.findById({_id : postId})
        
          if(!post) {
            return next(new ErrorResponse("Post not found", StatusCodes.NOT_FOUND))
          }
          await Post.updateOne({ _id: postId }, { ...req.body}); 
      
               return res.status(StatusCodes.OK).send({
                  status:true
               })    
        }
        catch(err){
         next(err)
        }
      
             }
      )
       router.put("/modifyCompany/:idCompany",async(req,res,next)=> {
        try{ 
         const companyId= req.params.idCompany;
        
          await Company.findOneAndUpdate({ _id: companyId }, { ...req.body}); 
      
               return res.status(StatusCodes.OK).send({
                  status:true
               })    
        }
        catch(err){
         next(err)
        }
      
             }
      )
export default router;
