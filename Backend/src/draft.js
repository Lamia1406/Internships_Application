


router.delete('/deleteStudent/:id', async(req, res) => {
    const { id } = req.params;
    const students = await Internship.find({ student: id });
    const students2 = await NewEstablishment.find({ student: id });
    if(students.length > 0 || students2.length > 0){
        return res.status(StatusCodes.NOT_FOUND).send({
            status: false,
            message: `This Student is part of an Internship Already, yoou can't delete them`
          });
     }
                       try{
                        const { id } = req.params;
                        const result = await Student.findOneAndDelete({ _id: id });
                        if(result){
                          return res.status(StatusCodes.OK).send({
                            status: true,
                            message: `Student has been deleted`
                          });
                        } else {
                          return res.status(StatusCodes.NOT_FOUND).send({
                            status: false,
                            message: `Student has not been found`
                          });
                        }
                       }
                       catch(error){
                        console.log(error)
                       }
                      });

router.delete('/deleteSupervisor/:id', async(req, res) => {
    const { id } = req.params;
    const internships = await Internship.find({ supervisor: id });
    if(internships.length > 0){
        return res.status(StatusCodes.NOT_FOUND).send({
            status: false,
            message: `This Supervisor is supervising an internship,you can't delete it`
          });
     }
                       try{
                        const { id } = req.params;
                        const result = await Supervisor.findOneAndDelete({ _id: id });
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
                       catch(error){
                        console.log(error)
                       }
                      });






// router.put("/:id",(req,res)=>{
//     const {body:student} = req;
//     const id = parseInt(req.params.id, 10);

//     const updatedStudent = studentService.updateStudent(id, student);
//     if (updatedStudent === false){
//         return res.status(StatusCodes.NOT_FOUND).send({
//             status: status.FAILURE,
//             message: `Student ${id} is not found`
//         })
//     }

//     res.status(StatusCodes.OK).send({
//         status: status.SUCCESS,
//         student : updatedStudent,
//     });
// })
// router.delete('/:id', (req, res) => {
//     const { params } = req;
//     const id = parseInt(params.id);
//     const student = studentService.getStudent(id);
  
//     if (student) {
//       studentService.deleteStudent(id);
  
//       return res.status(StatusCodes.OK).send({
//         status: status.SUCCESS,
//         message: `User ${id} has been deleted`
//       });
//     } else {
//       return res.status(StatusCodes.NOT_FOUND).send({
//         status: status.FAILURE,
//         message: `User ${id} has not been found`
//       });
//     }
//   });






export default router;



// university
import express from "express"
import { StatusCodes } from "http-status-codes";
import University from "./models/university.js";
import ErrorResponse from "./utils/errorResponse.js";
import Faculty from "./models/faculty.js";
import Responsible from "./models/responsible.js";
const router = express.Router();


   


  





