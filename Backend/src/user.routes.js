import express from "express"
import { StatusCodes } from "http-status-codes";
import users from "./models/data/users.data.js";
import Student from './models/student.js'
import Responsible from './models/responsible.js'
import ErrorResponse from "./utils/errorResponse.js";
import { isAuthenticated } from "./middleware/auth.js";
import Webmaster from "./models/webmaster.js";
import Supervisor from "./models/supervisor.js";
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

router.get("/allStudents",async (req,res)=>{
    try{
        const students = await Student.find();
        res.status(StatusCodes.OK).send(
            {
                status:status.success,
                students
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allDepartments",async (req,res)=>{
    try{
        const departments = await Responsible.find();
        res.status(StatusCodes.OK).send(
            {
                status:status.success,
                departments
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allSupervisors",async (req,res)=>{
    try{
        const supervisors = await Supervisor.find();
        res.status(StatusCodes.OK).send(
            {
                status:status.success,
                supervisors
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.post("/login",async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
          return  next(new ErrorResponse( "Email and password are required", StatusCodes.BAD_REQUEST))
            }
        const isResponsible = await Responsible.findOne({email})
        const isStudent = await Student.findOne({email})
        const isWebmaster = await Webmaster.findOne({email})
        var user;
        if (isResponsible){
             user = isResponsible        
        }
        else if (isStudent){
             user = isStudent
        }
        else if (isWebmaster){
             user = isWebmaster
        }
        if(!user){
            return  next(new ErrorResponse("Invalid Credentials", StatusCodes.BAD_REQUEST))
        }
        const isRightPassword = await user.comparePassword(password)
        if(!isRightPassword){
               return next(new ErrorResponse('Invalid Credentials', StatusCodes.BAD_REQUEST))
            
        } 
        generateToken(user,StatusCodes.OK,res)


    }
    catch(err){
         next(new ErrorResponse("Can't log in , check your credentials",StatusCodes.BAD_REQUEST))
    }
})
router.post("/signup",async(req,res,next)=>{
    const {email} = req.body;
    const emailExist = await Student.findOne({email});
    if (emailExist){
        return next (new ErrorResponse("Email Already Exists", StatusCodes.BAD_REQUEST))
    }; 
    try{
        const student = await Student.create(req.body);
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
const generateToken = async(user,statusCode,res) =>{
            const token = await user.jwtGenerateToken();
            const options= {
                httpOnly : true,
                expires: new Date(Date.now() + 7*24*60*60*1000)
            }
  
            res.status(statusCode).cookie("token",token,options).send(
                {
                    status: status.success,
                    token
                }
            )
        }
        router.post("/create_responsible",
        async(req,res)=>{
            const {email} = req.body;
            const emailExist = await Responsible.findOne({email});
            if (emailExist){
                return res.status(StatusCodes.BAD_REQUEST).send({
                    status: status.failure,
                    message: "Email already exist"
                })
            }; 
            try{
                const student = await Responsible.create(req.body);
                res.status(StatusCodes.CREATED).send(
                    {
                        status:status.success,
                        message: "Successfully Created"
                    }
                    )
                }
                catch(err){
                    console.log(err);
                    res.status(StatusCodes.BAD_REQUEST).send(
                        {
                            status:status.failure,
                            message: err.message
                        }
                        )
                    }
                })
        router.post("/create_supervisor",
        async(req,res)=>{
            const {email} = req.body;
            const emailExist = await Supervisor.findOne({email});
            if (emailExist){
                return res.status(StatusCodes.BAD_REQUEST).send({
                    status: status.failure,
                    message: "Email already exist"
                })
            }; 
            try{
                const student = await Supervisor.create(req.body);
                res.status(StatusCodes.CREATED).send(
                    {
                        status:status.success,
                        message: "Successfully Created"
                    }
                    )
                }
                catch(err){
                    console.log(err);
                    res.status(StatusCodes.BAD_REQUEST).send(
                        {
                            status:status.failure,
                            message: err.message
                        }
                        )
                    }
                })
   
// router.get("/:id",
//     async(req,res,next)=>{
            
//         try{
//             const isStudent = await Student.findById(req.params.id);
//             const isResponsible = await Responsible.findById(req.params.id);
//             var user; 
//             if(isStudent){
//                 user = isStudent
//             }
//             else if (isResponsible){
//                 user = isResponsible
//             }
//             res.status(StatusCodes.OK).send(
//                     {
//                         status:status.success,
//                         user
//                     }
//                     )
//                 }
//                 catch(err){
//                    next(err)
//                     }
//                 })
          
router.get("/profil",isAuthenticated, async (req,res,next)=>{
var user;

const isStudent = await Student.findById(req.user.id)
const isResponsible = await Responsible.findById(req.user.id)
const isWebmaster = await Webmaster.findById(req.user.id)
if(isStudent){
    user= isStudent
}
if(isResponsible){
    user = isResponsible
}
if(isWebmaster){
    user = isWebmaster
}
res.status(StatusCodes.OK).send(
    {
        status: status.success,
        user
    }
)
})
router.get("/logout" , (req,res,next)=>{
                    res.clearCookie("token");
                    res.status(StatusCodes.OK).send(
                        {
                            status:status.success,
                            message: "Loggout "
                        }
                        )
                    })









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
