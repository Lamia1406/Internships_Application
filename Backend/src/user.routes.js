import Student from "./models/student.js";
import ErrorResponse from "./utils/errorResponse.js";
import { StatusCodes } from "http-status-codes";
import nodemailer from 'nodemailer'
import sendgridTransport from "nodemailer-sendgrid-transport"
import express from "express"
import Webmaster from "./models/webmaster.js";
import Responsible from "./models/responsible.js";
import Supervisor from "./models/supervisor.js";
import NewEstablishment from './models/newEstablishment.js'
import Internship from "./models/offer.js"
import Department from "./models/department.js";
import bcrypt from 'bcrypt'
const router = express.Router();
const transporter = nodemailer.createTransport(
    sendgridTransport ({
        auth: {
            api_key : "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"
        }
    })
)
//Create Accounts
router.post("/createStudent",async(req,res,next)=>{
    const {email,department} = req.body;
    const emailExist = await Student.findOne({email});
    if (emailExist){
        return next (new ErrorResponse("Email Already Exists", StatusCodes.BAD_REQUEST))
    }; 
    if (!department){
        return next (new ErrorResponse("Please Choose your department", StatusCodes.BAD_REQUEST))
    }; 

    try{
        let password = "";
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
        for (let i = 0; i < 10; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
          }
        
        const student = await Student.create({
            ...req.body, 
            password
        });
        res.status(StatusCodes.CREATED).send(
            {
                status:true,
                message: "Successfully Created, please check your email inbox to get your password"
            }
            )
            if(res.statusCode==StatusCodes.CREATED){
                transporter.sendMail({
                    to: email,
                    from:"lamia.hamdi@univ-constantine2.dz",
                    subject: "Your Account Password", 
                    html:` 
                    <h1> Welcome to ConnectU </h1>
                    <p>  Thank you for joining <Strong> ConnectU</strong>! We are thrilled to have you as a member of our community and we hope you enjoy your experience with us.
                    As a member of our website </p>
                    <ul>Please find below your password:
                    <li>Password: ${password}</li>
                    </ul>
                    <p> we recommend that you change it immediately after your first login.</p>
                    <p> Best Regards, </p>
                    <strong>ConnectU </strong>
                    `
                })
            }
        }
        catch(err){
          next(err)
            } 
})
router.post("/createResponsible",
                async(req,res,next)=>{
    const {email,department} = req.body;
    const emailExist = await Responsible.findOne({email});
                    if (emailExist){
                        return next (new ErrorResponse("Email Already Exists", StatusCodes.BAD_REQUEST))
                    }; 
                    
                    
                    if(req.body.department == ""){
                        return next (new ErrorResponse("Please choose a department", StatusCodes.BAD_REQUEST))
                    }
                    const departmentHasResponsible = await Responsible.findOne({department: department});
                    if (departmentHasResponsible) {
                        return next(new ErrorResponse("Department Already Has a Responsible", StatusCodes.BAD_REQUEST))
                    }
                    try{
                        let password = "";
                        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
                        for (let i = 0; i < 10; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
                            password += characters[randomIndex];
                          }
                      
                        
                        const responsible = await Responsible.create({
                            ...req.body, 
                            password
                        });
                        res.status(StatusCodes.CREATED).send(
                            {
                                status:true,
                                message: "Successfully Created,Please check your email input to get your password"
                            }
                            )
                            if(res.statusCode==StatusCodes.CREATED){
                                transporter.sendMail({
                                    to: email,
                                    from:"lamia.hamdi@univ-constantine2.dz",
                                    subject: "Your Account Password", 
                                    html:` 
                                    <h1> Welcome to ConnectU </h1>
                                    <p>  Thank you for joining <Strong> ConnectU</strong>! We are thrilled to have you as a member of our community and we hope you enjoy your experience with us.
                                    As a member of our website </p>
                                    <ul>Please find below your password:
                                    <li>Password: ${password}</li>
                                    </ul>
                                    <p> we recommend that you change it immediately after your first login.</p>
                                    <p> Best Regards, </p>
                                    <strong>ConnectU </strong>
                                    `
                                })
                            }
                        }
                        
                            
                        
                        catch(err){
                          next(err)
                            }
                        })
router.post("/createSupervisor",
        async(req,res,next)=>{               
            const {email} = req.body;
    const emailExist = await Supervisor.findOne({email});
             if (emailExist){
                        return next (new ErrorResponse("Email Already Exists", StatusCodes.BAD_REQUEST))
                    }; 
                    if(req.body.company == ""){
                        return next (new ErrorResponse("Please choose a company", StatusCodes.BAD_REQUEST))
                    }
try{
        let password = "";
                        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
                        for (let i = 0; i < 10; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
                            password += characters[randomIndex];
                          }
                        const supervisor = await Supervisor.create({
                            ...req.body, 
                            password
                        });
                        res.status(StatusCodes.CREATED).send(
                            {
                                status:true,
                                message: "Successfully Created,Please check your email inbox to get your password"
                            }
                            )
                            if(res.statusCode==StatusCodes.CREATED){
                        
            transporter.sendMail({
                to: email,
                from:"lamia.hamdi@univ-constantine2.dz",
                subject: "Your Account Password | ConnectU app", 
                html:` 
                Dir sir/madame ,
We're writing to you to inform you that a university student has recently requested an internship in your company through our app.
<ul> <p> We have created an account for you with :</p>
<li>the email address: ${email} </li>
<li>the password: ${password}. </li>
</ul>
<p> The student's information and internship request are now available in your account dashboard.
</p>
<p>Thank you for your time and attention.
</p>
                <p> Best Regards, </p>
                <strong>ConnectU </strong>
                `
            })

                            }
                            
                        }
                       
                        catch(err){
                          next(err)
                            }
                                })

router.post("/createWebmaster",
                                async(req,res,next)=>{
                                    const {email} = req.body;
                            const emailExist = await Webmaster.findOne({email});
                            if (emailExist){
                                return next (new ErrorResponse("Email Already Exists", StatusCodes.BAD_REQUEST))
                            }; 
                            try{
                                let password = "";
                                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
                                for (let i = 0; i < 10; i++) {
                                    let randomIndex = Math.floor(Math.random() * characters.length);
                                    password += characters[randomIndex];
                                  }
                               
                                const webmaster = await Webmaster.create({
                                    ...req.body, 
                                    password
                                });
                                res.status(StatusCodes.CREATED).send(
                                    {
                                        status:true,
                                        message: "Successfully Created,Please check your email input to get your password"
                                    }
                                    )
                                if (res.statusCode == StatusCodes.CREATED) {
                                        transporter.sendMail({
                                            to: email,
                                            from:"lamia.hamdi@univ-constantine2.dz",
                                            subject: "Your Account Password", 
                                            html:` 
                                            <h1> Welcome to ConnectU </h1>
                                            <p>  Thank you for joining <Strong> ConnectU</strong>! We are thrilled to have you as a member of our community and we hope you enjoy your experience with us.
                                            As a member of our website </p>
                                            <ul>Please find below your password:
                                            <li>Password: ${password}</li>
                                            </ul>
                                            <p> we recommend that you change it immediately after your first login.</p>
                                            <p> Best Regards, </p>
                                            <strong>ConnectU </strong>
                                            `
                                        })
                                    }
                                }
                                catch(err){
                                  next(err)
                                    }
                                  
                                        })

//Login Logout
router.post("/login",async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
          return  next(new ErrorResponse( "Email and password are required", StatusCodes.BAD_REQUEST))
            }
        const isResponsible = await Responsible.findOne({email})
        const isStudent = await Student.findOne({email})
       const isWebmaster = await Webmaster.findOne({email})
       const isSupervisor = await Supervisor.findOne({email})
        var user;
        if (isResponsible){
             user = isResponsible        
        }
         if (isStudent){
             user = isStudent
        }
        else if (isWebmaster){
             user = isWebmaster
        }
        else if (isSupervisor){
             user = isSupervisor
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
const generateToken = async(user,statusCode,res) =>{
    
            const token = await user.jwtGenerateToken();
            const options= {
                httpOnly : true,
                expires: new Date(Date.now() + 7*24*60*60*1000)
            }
  
            res.status(statusCode).cookie("token",token,options).send(
                {
                    status: true,
                    token
                }
            )
        }
router.get("/logout" , (req,res,next)=>{
res.clearCookie("token");
    res.status(StatusCodes.OK).send(
                                        {
                                            status:true,
                                            message: "Loggout Successful "
                                        }
                                        )
                                    })
// get requests
router.get("/allStudents",async (req,res)=>{
    try{
        const students = await Student.find().populate({
            path: "department",
            populate:{
                path: "faculty",
                populate: "university"
            }
        })
           
        res.status(StatusCodes.OK).send(
            {
                status:true,
                students
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allWebmasters",async (req,res)=>{
    try{
        const webmasters = await Webmaster.find()
           
        res.status(StatusCodes.OK).send(
            {
                status:true,
                webmasters
            }
            )
    }
    catch(err){
        err.message
         }
     })

router.get("/allResponsibles",async (req,res)=>{
        try{
            const responsibles =await Responsible.find().populate({
                    path:"department",
                    populate: {
                        path: "faculty",
                        populate : {
                            path: "university"
                        }
                      }
            })
            const departments = await Department.find()
           
           
              
              
              
              
           
              
            res.status(StatusCodes.OK).send(
                {
                    status:true,
                    responsibles,
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
                const supervisors = await Supervisor.find().populate("company");
                const acceptedInternshipsBySupervisors = await Internship.find({
                    approvedBySupervisor: { $in: ["accepted", "rejectedByStudent"] }
                  })
                  const rejectedInternshipsBySupervisors= await Internship.find({
                    approvedBySupervisor:"rejected" 
                  })
                  const pendingInternshipsBySupervisors = await Internship.find({
                    approvedBySupervisor:"pending" 
                  })
                  for (const oneSupervisor of supervisors) {
                    let accepted = 0;
                    let rejected = 0;
                    let pending = 0;
                    for (const internship of acceptedInternshipsBySupervisors) {
                      if (internship.supervisor._id.toString() === oneSupervisor._id.toString()) {
                        console.log(internship.student._id)
                        accepted++;
                      }
                    }
                  
                    for (const internship of rejectedInternshipsBySupervisors) {
                      if (internship.supervisor._id.toString() === oneSupervisor._id.toString()) {
                        rejected++;
                      }
                    }
                  
                    for (const internship of pendingInternshipsBySupervisors) {
                      if (internship.supervisor._id.toString() === oneSupervisor._id.toString()) {
                        pending++;
                       
                      }
                    }
                  
                    
                  
                    await Supervisor.findOneAndUpdate(
                      { _id: oneSupervisor._id },
                      { 
                        accepted: accepted, 
                        rejected: rejected, 
                        pending:pending }
                    );
                  }
                res.status(StatusCodes.OK).send(
                    {
                        status:true,
                        supervisors,
                        
                    }
                    )
            }
            catch(err){
                err.message
                 }
             })

//modify profil
router.get("/profil/:userType/:id",async(req,res)=>{
    const userType=req.params.userType
    const id= req.params.id
    let profil;
    if(userType=="student"){
        profil= await Student.findById(id)
    }
    if(userType=="webmaster"){
        profil= await Webmaster.findById(id)
    }
    if(userType=="department responsible"){
        profil= await Responsible.findById(id)
    }
    if(userType=="supervisor"){
        profil= await Supervisor.findById(id)
    }
    res.status(StatusCodes.OK).send(
        {
            status:true,
            profil
        }
    )
})
router.put("/student/:id",async(req,res,next)=> {
   try{ 
    const userId= req.params.id;
    const isStudent = await Student.findOneAndUpdate({_id : userId}
        ,{
            phone: req.body.phone,
            full_name: req.body.full_name,
            password:req.body.password,
            student_card_number : req.body.student_card_number,
            social_security_number : req.body.social_security_number,
            image : req.body.image,
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
router.put("/webmaster/:id",async(req,res,next)=> {
   try{ 
    const userId= req.params.id;
    const isStudent = await Webmaster.findOneAndUpdate({_id : userId}
        ,{
            full_name: req.body.full_name,
            password:req.body.password,
            image : req.body.image,
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
router.put("/supervisor/:id",async(req,res,next)=> {
   try{ 
    const userId= req.params.id;
    const isStudent = await Supervisor.findOneAndUpdate({_id : userId}
        ,{
            full_name: req.body.full_name,
            password:req.body.password,
            image : req.body.image,
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
router.put("/responsible/:id",async(req,res,next)=> {
   try{ 
    const userId= req.params.id;

    const isStudent = await Responsible.findOneAndUpdate({_id : userId}
        ,{
            full_name: req.body.full_name,
            password:req.body.password,
            image : req.body.image,
            phone : req.body.phone,
            fax: req.body.fax
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

//delete users
router.delete('/deleteResponsible/:id', async(req, res) => {
    try{
     const { id } = req.params;
     const responsible= await Responsible.findOne({_id: id})
     const internships = await Internship.find().select("student").populate(
        {
            path: "student",
            select: "department"
        }
     )
     const newInternships = await NewEstablishment.find().select("student").populate(
        {
            path: "student",
            select: "department"
        }
     )
     for (const internship of internships){
        if(internship.student.department._id.toString() === responsible.department._id.toString()){
            return res.status(StatusCodes.OK).send({
                status: false,
                message: `Department Responsible has internships to follow up, can't delete him/her`
              });
        }
     }
     for (const internship of newInternships){
        if(internship.student.department._id.toString() === responsible.department._id.toString()){
            return res.status(StatusCodes.OK).send({
                status: false,
                message: `Department Responsible has internships to follow up, can't delete him/her`
              });
        }
     }
     const result = await Responsible.findOneAndDelete({ _id: id });
     if(result){
       return res.status(StatusCodes.OK).send({
         status: true,
         message: `Department Responsible ${responsible.full_nale} has been deleted`
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
  
export default router