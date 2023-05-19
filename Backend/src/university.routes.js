import University from "./models/university.js";
import express from 'express'
import ErrorResponse from "./utils/errorResponse.js";
import Faculty from './models/faculty.js'
import Department from './models/department.js'
import { StatusCodes } from "http-status-codes";
const router = express.Router();
router.post("/createUniversity",async(req,res,next)=>{   
    const {full_name} = req.body;
    const universityExist = await University.findOne({full_name});
    if (universityExist){
        return next (new ErrorResponse("University Already Exists", StatusCodes.BAD_REQUEST))
    }; 
    try{
        const university = await University.create(req.body);
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


router.post("/createFaculty",async(req,res,next)=>{
    const {name} = req.body;
    const facultyExist = await Faculty.findOne({name});
    if (facultyExist){
        return next (new ErrorResponse("Faculty Already Exists", StatusCodes.BAD_REQUEST))
    }; 
    try{
        const faculty = await Faculty.create(req.body);
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

router.post("/createDepartment",async(req,res,next)=>{
    const {full_name} = req.body;
    const departmentExist = await Department.findOne({full_name});
    if (departmentExist){
        return next (new ErrorResponse("Department Already Exists", StatusCodes.BAD_REQUEST))
    }; 
    try{
        const company = await Department.create(req.body);
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


//get requests 
router.get("/allUniversities",async (req,res)=>{
    try{
        const universities = await University.find();
        res.status(StatusCodes.OK).send(
            {
                status:true,
                universities
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
                    status:true,
                    faculties
                }
                )
        }
        catch(err){
            err.message
             }
         })

router.get("/allDepartments",async (req,res)=>{
            try{
                const departments = await Department.find().populate({
                    path: "faculty",
                    populate :{
                        path: "university"
                    }
                });
                res.status(StatusCodes.OK).send(
                    {
                        status:true,
                        departments
                    }
                    )
            }
            catch(err){
                err.message
                 }
             })
export default router