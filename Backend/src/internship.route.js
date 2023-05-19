import express from "express"
import Student from "./models/student.js";
import { StatusCodes } from "http-status-codes";
import ErrorResponse from "./utils/errorResponse.js";
import Internship from "./models/offer.js";
import NewEstablishment from "./models/newEstablishment.js";
import Presence from "./models/studentPresence.js";
import Responsible from "./models/responsible.js";
import Notification from "./models/Notification.js";
import Supervisor from './models/supervisor.js'
import Company from './models/company.js'
import Post from "./models/post.js";
import sendgridTransport from "nodemailer-sendgrid-transport"
import nodemailer from "nodemailer"
const router = express.Router();
const transporter = nodemailer.createTransport(
  sendgridTransport ({
      auth: {
          api_key : "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"
      }
  })
)

router.post("/createInternship",async(req,res,next)=>{
  const student = await Student.findById(req.body.student);
  
  const {supervisor} = req.body
  if (student.enrolled === "yes") {
    return next (new ErrorResponse("Cannot apply for an internship while enrolled.", StatusCodes.BAD_REQUEST))
  }
  if (supervisor == "") {
    return next (new ErrorResponse("Please choose a supervisor", StatusCodes.BAD_REQUEST))
  }
  try{
      const internship = await Internship.create(req.body);
      await Student.findOneAndUpdate(
        { _id: student._id },
        { enrolled: "pending" }
      );
      const responsible = await Responsible.findOne({ department:student.department }).select("_id")
        let  message = `student ${student.full_name} has sent an internship application`


     const notification = await Notification.create({
      responsible,message,
        ...req.body
      })
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


router.post("/createNewEstablishmentInternship",async(req,res,next)=>{
  const student = await Student.findById(req.body.student);
  if (student.enrolled === "yes") {
    return res.status(StatusCodes.FORBIDDEN).send({
      status: false,
      message: "Cannot apply for an internship while enrolled."
    });
  }
  
  try{
      const internship = await NewEstablishment.create(req.body);
      await Student.findOneAndUpdate(
        { _id: student._id },
        { enrolled: "pending" }
      );
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
router.post("/markPresence",async(req,res,next)=>{
  try{
      const presence = await Presence.create(req.body);
      res.status(StatusCodes.OK).send(
          {
              status:true,
              message: "Student Presence Updated Successfully"
          }
          )
      }
      catch(err){
        next(err)
          } 
})


router.get("/allInternships/student/:idStudent",async (req,res)=>{
    try{
      const studentId = req.params.idStudent; 
      const student = await Student.findById(studentId).populate("department");
      const studentDepartment = student.department;   
      const responsible = await Responsible.findOne({ department:studentDepartment }).select("full_name email phone fax")
         
        const internships = await Internship.find({student:studentId})
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number",
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "company_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
        });
        const newEstablishments =await NewEstablishment.find({student: studentId}).populate(
          {
            path: "student",
            select: "full_name level_of_study student_card_number social_security_number",
          }
        )
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                internships,
                newEstablishments,
                responsible
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allInternships/supervisor/:idSupervisor",async (req,res)=>{
    try{
      const supervisorId = req.params.idSupervisor; 
        const internships = await Internship.find({supervisor:supervisorId, approvedByResponsible:"accepted",approvedBySupervisor:"pending"})
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number department",
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "company_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
        });
        let allResponsibles = [];
        for (const internship of internships) {
          const responsible = await Responsible.findOne({ department: internship.student.department });
          allResponsibles.push(responsible)
        }
        
      

        // const newEstablishments =await NewEstablishment.find({supervisor: studentId}).populate(
        //   {
        //     path: "student",
        //     select: "full_name level_of_study student_card_number social_security_number",
        //   }
        // )
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                internships,
                allResponsibles
              
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allInternships/responsible/:idResponsible",async (req,res)=>{
    try{
      const responsibleId = req.params.idResponsible;
      const responsible = await Responsible.findById({ _id: responsibleId })
      const responsibleDep= responsible.department
        const internships = await Internship.find({
            $or: [
              { approvedByResponsible: "pending" },
            ]
          })
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number department",
          match: { department: responsibleDep }
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "company_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
        })
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                internships,
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/rejectedInternships/responsible/:idResponsible",async (req,res)=>{
    try{
      let dateOfRejection = new Date();
      const responsibleId = req.params.idResponsible;
      const responsible = await Responsible.findById({ _id: responsibleId })
      const responsibleDep= responsible.department
        const rejectedExistingInternships = await Internship.find({
            $or: [
              { approvedByResponsible: "rejected" },
            ]
          })
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number ",
          match: { department: responsibleDep }
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "company_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
        })
        const rejectedNewInternships = await NewEstablishment.find({
            $or: [
              {dateOfRejection : dateOfRejection},
              { approvedByResponsible: "rejected" },
            ]
          })
          .populate(
            {
              path: "student",
              select: "full_name level_of_study student_card_number social_security_number department",
              match: { department: responsibleDep }
            }
          )
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                rejectedExistingInternships,
                rejectedNewInternships
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/acceptedInternships/responsible/:idResponsible",async (req,res)=>{
    try{
      const responsibleId = req.params.idResponsible;
      const responsible = await Responsible.findById({ _id: responsibleId })
      const responsibleDep= responsible.department
        const acceptedExistingInternships = await Internship.find({
            $or: [
              { approvedByResponsible: "accepted",
            approvedBySupervisor:"pending" },
            ]
          })
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number department",
          match: { department: responsibleDep }
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "company_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
        })

        const acceptedNewInternships = await NewEstablishment.find({
            $or: [
              { approvedByResponsible: "accepted" },
            ]
          })
          .populate(
            {
              path: "student",
              select: "full_name level_of_study student_card_number social_security_number department",
              match: { department: responsibleDep }
            }
          )
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                acceptedExistingInternships,
                acceptedNewInternships
            }
            )
    }
    catch(err){
        err.message
         }
     })

router.get("/studentProgress/supervisor/:idSupervisor",async (req,res)=>{
    try{
      const supervisorId = req.params.idSupervisor;
        const acceptedExistingInternships = await Internship.find({
            $or: [
              { approvedBySupervisor: "accepted" },
            ]
          })
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number department",
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "company_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
          match: {_id: supervisorId}
        })
        let allResponsibles = [];
        for (const accepted of acceptedExistingInternships) {
          const responsible = await Responsible.findOne({ department: accepted.student.department });
          allResponsibles.push(responsible)
        }
        // const acceptedNewInternships = await NewEstablishment.find({
        //     $or: [
        //       { approvedByResponsible: "accepted" },
        //     ]
        //   })
        //   .populate(
        //     {
        //       path: "student",
        //       select: "full_name level_of_study student_card_number social_security_number department",
        //       match: { department: responsibleDep }
        //     }
        //   )
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                acceptedExistingInternships,
                allResponsibles
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allNewEstablishment/responsible/:idResponsible",async (req,res)=>{
    try{
      const responsibleId = req.params.idResponsible;
      const responsible = await Responsible.findById({ _id: responsibleId })
      const responsibleDep= responsible.department
        const newInternships = await NewEstablishment.find({
          $or: [
            { approvedByResponsible: "pending" },
          ]
        }).populate(
          {
            path: "student",
            select: "full_name level_of_study student_card_number social_security_number department",
            match: { department: responsibleDep }
          }
        )
        res.status(StatusCodes.OK).send(
            {
                status:true,
                newInternships
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.put("/rejectInternship/responsible/:idInternship",async (req,res)=>{
    try{
      const {rejectionMessage} = req.body
      const internshipId = req.params.idInternship;

      const internship = await Internship.findById({ _id: internshipId })
      const studentId= internship.student._id
      await internship.updateOne(
        { approvedByResponsible: "rejected" },
        { rejectionMessage : rejectionMessage }
      );
      const isStudentEnrolled = await Internship.find({student:studentId})
      const isStudentEnrolled2 = await NewEstablishment.find({student:studentId})
      if (!isStudentEnrolled && !isStudentEnrolled2){
        await Student.findOneAndUpdate(
          { _id: studentId },
          { enrolled: "no" }
        );
      }
      console.log(internship)
        res.status(StatusCodes.OK).send(
            {
                status:true,
                
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.put("/acceptInternship/responsible/:idInternship",async (req,res)=>{
    try{
      const internshipId = req.params.idInternship;
      const internship = await Internship.findById({ _id: internshipId }).populate({
        path: "student", select: "full_name _id"
      }).populate({
        path: "supervisor",
        select: "_id"
      }).populate({
        path: "post",
        select: "title"
      })
      await internship.updateOne(
        { approvedByResponsible: "accepted" },
      );
      await Notification.create({
        student: internship.student._id,
        message: `your internship ${internship.post.title} has been accepted by the department responsible`,
        ...req.body
      })
      await Notification.create({
        supervisor: internship.supervisor._id,
        message: `student ${internship.student.full_name} has sent an internship application`,
        ...req.body
      })
        res.status(StatusCodes.OK).send(
            {
                status:true,     
            }
            )

    }
    catch(err){
        err.message
         }
     })
router.put("/acceptNewIntership/responsible/:idInternship",async (req,res)=>{
  const internshipId = req.params.idInternship;
  let company;
  let supervisor;
  let post;
      const newInternship = await NewEstablishment.findById({ _id: internshipId }).populate({
        path:"student",
        select:"full_name"
      })

    const companyExist = await Company.findOne({company_name : newInternship.company})
    if(companyExist){
        company = companyExist
    }
    else{
       company= await Company.create({
        company_name : newInternship.company,
        address : "uknown"
      })
    }
      const supervisorEmailExist = await Supervisor.findOne({email: newInternship.supervisor_email});
      if (supervisorEmailExist){
                 supervisor=supervisorEmailExist
             }
      else  {
        let password = "";
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
        for (let i = 0; i < 10; i++) {
let randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
          }
        transporter.sendMail({
            to: newInternship.supervisor_email,
            from:"lamia.hamdi@univ-constantine2.dz",
            subject: "Your Account Password | ConnectU app", 
            html:` 
            Dir sir/madame ,
We're writing to you to inform you that a university student has recently requested an internship in your company through our app.
<ul> <p> We have created an account for you with :</p>
<li>the email address: ${newInternship.supervisor_email} </li>
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
         supervisor =await Supervisor.create({
          full_name: newInternship.supervisor_name,
          email: newInternship.supervisor_email,
          company: company,
          password: password
      })
      }
      const postExist=await Post.findOne({title: newInternship.theme})
      if(postExist){
        post = postExist
      }
      else{
        post = await Post.create({
          description: "empty",
          company:company,
          title:newInternship.theme,
          isOffer:false
        })
      }
       const createInternship = await Internship.create(
        {
          student:newInternship.student._id,
          supervisor:supervisor._id,
          post:post._id,
          approvedByResponsible:"accepted",
          startingDate: newInternship.startingDate,
          endingDate: newInternship.endingDate,
          cv: newInternship.cv
        },
      )
      console.log(createInternship)
        

    
    try{     
      const deleteNewInternship = await NewEstablishment.findByIdAndDelete({ _id: internshipId })
      await Notification.create({
        student: newInternship.student._id,
        message: `your internship ${post.title} has been accepted by the department responsible`,
        ...req.body
      })
      await Notification.create({
        supervisor: supervisor._id,
        message: `student ${newInternship.student.full_name} has sent an internship application`,
        ...req.body
      })
        res.status(StatusCodes.OK).send(
            {
                status:true,     
            }
            )

    }
    catch(err){
        err.message
         }
     })
router.put("/acceptInternship/supervisor/:idInternship",async (req,res)=>{
    try{
      const internshipId = req.params.idInternship;
      const internship = await Internship.findById({ _id: internshipId }).populate({
        path: "student", select: "full_name _id department"
      }).populate({
        path: "post",
        select: "title"
      })
       const responsible= await Responsible.find({department : internship.student.department})
       await internship.updateOne(
        { approvedBySupervisor: "accepted" },
      );
      await Student.findOneAndUpdate(
        {_id: internship.student._id},
        { enrolled: "yes" },
      );

      await Notification.create({
        student: internship.student._id,
        message: `your internship ${internship.post.title} has been accepted by the internship supervisor,Congrats! you're now an intern`,
        ...req.body
      })
      await Notification.create({
        responsible: responsible._id,
        message: `student ${internship.student.full_name} has been accepted by the internship supervisor`,
        ...req.body
      })

        res.status(StatusCodes.OK).send(
            {
                status:true,     
            }
            )

    }
    catch(err){
        err.message
         }
     })
     router.put("/chooseInternship/student/:idInternship", async (req, res) => {
      try {
        const internshipId = req.params.idInternship;
        let chosenInternship;
        const internship = await Internship.findById(internshipId);
        const newEstablishment = await Internship.findById(internshipId);
        if(internship){
          chosenInternship=internship
        }
        else{
          chosenInternship= newEstablishment
        }
        // Update other internships for the same student
        await Internship.updateMany(
          {
            student: chosenInternship.student,
            _id: { $ne: chosenInternship._id }
          },
          {
            $set: {
              approvedByResponsible: "rejectedByStudent",
              approvedBySupervisor: "rejectedByStudent"
            }
          }
        );
        await NewEstablishment.updateMany(
          {
            student: chosenInternship.student,
            _id: { $ne: chosenInternship._id }
          },
          {
            $set: {
              approvedByResponsible: "rejectedByStudent",
              approvedBySupervisor: "rejectedByStudent"
            }
          }
        );
    
        // Find other internships for the same student
        const otherInternships = await Internship.find({ student: chosenInternship.student })
          .populate({
            path: "student",
            select: "full_name department",
          })
          .populate({
            path: "post",
            select: "title",
            populate: {
              path: "company",
              select: "company_name",
            },
          })
          .populate({
            path: "supervisor",
            select: "full_name email",
          });
    
        // Create notifications for each other internship
        for (const one of otherInternships) {
          await Notification.create({
            supervisor: one.supervisor._id,
            message: `Student ${one.student.full_name} has rejected to be an intern in ${one.post.title}`,
          });
        }
    
        // Find responsible for the student's department
        const responsible = await Responsible.find({ department: chosenInternship.student.department });
    
        // Create notification for the responsible
        await Notification.create({
          responsible: responsible._id,
          message: `Student ${one.student.full_name} has rejected to be an intern in ${one.post.title}`,
        });
    
        res.status(StatusCodes.OK).send({
          status: true,
        });
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          status: false,
          error: err.message,
        });
      }
    });
    


    


     


export default router;
