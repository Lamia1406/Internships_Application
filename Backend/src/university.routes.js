import express from "express"
import { StatusCodes } from "http-status-codes";
import University from "./models/university.js";
import ErrorResponse from "./utils/errorResponse.js";
import Faculty from "./models/faculty.js";
import Department from "./models/department.js";
import Responsible from "./models/responsible.js";
const router = express.Router();
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
router.post("/createUniversity",async(req,res,next)=>{
    const {name} = req.body;
    const nameExist = await University.findOne({name});
    if (nameExist){
        return next (new ErrorResponse("University Already Exists", StatusCodes.BAD_REQUEST))
    };
        try{
            
            const university = await University.create(req.body);
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
       router.post("/createFaculty",async(req,res,next)=>{
        try{
            const company = await Faculty.create(req.body);
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


    router.post("/createDepartment",async(req,res,next)=>{
        try{
            const company = await Department.create(req.body);
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
router.get("/allResponsibles",async (req,res)=>{
        try{
            const responsibles =await Responsible.find().populate({
                path: "department",
                populate :{
                    path:"faculty",
                    populate: {
                        path: "university",
                        model: "University",
                      }
                }
            })
            res.status(StatusCodes.OK).send(
                {
                    status:status.success,
                    responsibles
                }
                )
        }
        catch(err){
            err.message
             }
         })
router.get("/allFaculties",async (req,res)=>{
        try{
            const faculties = await Faculty.find().populate('university');
            res.status(StatusCodes.OK).send(
                {
                    status:status.success,
                    faculties
                }
                )
        }
        catch(err){
            err.message
             }
         })
router.get("/allUniversities",async (req,res)=>{
        try{
            const universities = await University.find();
            res.status(StatusCodes.OK).send(
                {
                    status:status.success,
                    universities
                }
                )
        }
        catch(err){
            err.message
             }
         })

export default router;
