import University from "./models/university.js";
import express from 'express'
import ErrorResponse from "./utils/errorResponse.js";
import Faculty from './models/faculty.js'
import Department from './models/department.js';
import Company from "./models/company.js";
import Student from './models/student.js';
import Responsible from './models/responsible.js'
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
    const {full_name} = req.body;
    const facultyExist = await Faculty.findOne({full_name});
    if (facultyExist){
        return next (new ErrorResponse("Faculty Already Exists", StatusCodes.BAD_REQUEST))
    }; 
    if (req.body.university == "") {
        return next (new ErrorResponse("Please choose a university", StatusCodes.BAD_REQUEST))
      }
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
    if (req.body.faculty == "") {
        return next (new ErrorResponse("Please choose a faculty", StatusCodes.BAD_REQUEST))
      }
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
router.get("/allDatabase",async (req,res)=>{
    try{
        const universities = await University.find();
        const faculties = await Faculty.find().populate('university');
        const departments = await Department.find().populate({
            path: "faculty",
            populate :{
                path: "university"
            }
        });
        const companies = await Company.find();
        res.status(StatusCodes.OK).send(
            {
                status:true,
                universities,
                faculties,
                departments,
                companies
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
        const companies = await Company.find();
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
router.get("/allDepartments",async (req,res)=>{
    try{
        const departments = await Department.find().select(
            "_id full_name"
        )
        
        const companies = await Company.find();
        res.status(StatusCodes.OK).send(
            {
                status:true,
                departments,
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allFaculties",async (req,res)=>{
    try{
        const faculties = await Faculty.find()
        
        res.status(StatusCodes.OK).send(
            {
                status:true,
                faculties,
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.delete('/deleteUniversity/:id', async(req, res,next) => {
        try{
            const { id } = req.params
           const universityFaculties = await Faculty.find({university: id})
           if(universityFaculties.length > 0){
            return next(new ErrorResponse("This university can't be deleted directly, it is related to so many faculties", StatusCodes.NOT_FOUND))
         }
            const result = await University.findOneAndDelete({ _id: id });
            if(result){
                return res.status(StatusCodes.OK).send({
                  status: true,
                  message: `University  has been deleted`
                });
              } else {
                return next(new ErrorResponse("University has not been found"),StatusCodes.NOT_FOUND)
              }
         }

        catch(err){
         next(err)
        }
       });
router.delete('/deleteFaculty/:id', async(req, res,next) => {
        try{
            const { id } = req.params
           const facultyDepartments = await Department.find({faculty: id})
           if(facultyDepartments.length > 0){
            return next(new ErrorResponse("This faculty can't be deleted directly, it is related to so many departments", StatusCodes.NOT_FOUND))
         }
            const result = await Faculty.findOneAndDelete({ _id: id });
            if(result){
                return res.status(StatusCodes.OK).send({
                  status: true,
                  message: `Faculty  has been deleted`
                });
              } else {
                return next(new ErrorResponse("Faculty has not been found"),StatusCodes.NOT_FOUND)
              }
         }

        catch(err){
         next(err)
        }
       });
router.delete('/deleteDepartment/:id', async(req, res,next) => {
        try{
            const { id } = req.params
           const departmentStudents = await Student.find({department: id})
           const departmentResponsibles = await Responsible.find({department: id})
           if(departmentStudents.length > 0 || departmentResponsibles.length>0){
            return next(new ErrorResponse("This department can't be deleted directly, it is related to so many accounts", StatusCodes.NOT_FOUND))
         }
            const result = await Department.findOneAndDelete({ _id: id });
            if(result){
                return res.status(StatusCodes.OK).send({
                  status: true,
                  message: `Department  has been deleted`
                });
              } else {
                return next(new ErrorResponse("Department has not been found"),StatusCodes.NOT_FOUND)
              }
         }

        catch(err){
         next(err)
        }
       });
router.put("/modifyUniversity/:id",async(req,res,next)=> {
        try{ 
         const userId= req.params.id;
         const university = await University.findOneAndUpdate({_id : userId}
             ,{
                 full_name: req.body.full_name,
                 address: req.body.address
             },
            
             
             )
              res.status(StatusCodes.OK).send({
                 status:true
              })
             
        }
        catch(err){
         next(err)
        }
     
             }
     )
router.put("/modifyFaculty/:id",async(req,res,next)=> {
        try{ 
         const userId= req.params.id;
         const university = await Faculty.findOneAndUpdate({_id : userId}
             ,{
                 ...req.body
             },   
             )
              res.status(StatusCodes.OK).send({
                 status:true
              })
             
        }
        catch(err){
         next(err)
        }
             }
     )
router.put("/modifyDepartment/:id",async(req,res,next)=> {
        try{ 
         const userId= req.params.id;
         const department = await Department.findOneAndUpdate({_id : userId}
             ,{
                 ...req.body
             },   
             )
              res.status(StatusCodes.OK).send({
                 status:true
              })
             
        }
        catch(err){
         next(err)
        }
             }
     )

export default router