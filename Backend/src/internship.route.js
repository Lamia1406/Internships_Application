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
import html_to_pdf from "html-pdf-node"
import Mark from "./models/Mark.js";
const router = express.Router();



const transporter = nodemailer.createTransport(
  sendgridTransport ({
      auth: {
          api_key : "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"
      }
  })
)
//Create Internship
router.post("/createInternship",async(req,res,next)=>{
  const student = await Student.findById(req.body.student)
  const {supervisor} = req.body
  if (student.enrolled === "yes") {
    return next (new ErrorResponse("Cannot apply for an internship while enrolled.", StatusCodes.BAD_REQUEST))
  }
  if (supervisor == "") {
    return next (new ErrorResponse("Please choose a supervisor", StatusCodes.BAD_REQUEST))
  }
  try{
    const alreadyApplied = await Internship.findOne({post : req.body.post , student : student._id})
    if(alreadyApplied && student.enrolled == "pending"){
      return next (new ErrorResponse("Your Already Applied to this internship", StatusCodes.BAD_REQUEST))
    }
      await Internship.create(req.body);
      await Student.findOneAndUpdate(  { _id: student._id },  { enrolled: "pending" } );
      const responsible = await Responsible.findOne({ department:student.department }).select("_id")
      if(responsible){
        await Notification.create({
          responsible:responsible._id , 
          message: `student ${student.full_name} has sent an internship application`,
            ...req.body
          })
          await Responsible.findOneAndUpdate(
            { department: student.department },
            {
              $inc: { pending: 1 }
            }
          );
      }
      res.status(StatusCodes.CREATED).send( {status:true ,  message: "Successfully Created"})
      }
  catch(err){
        next(err)
  } 
})


router.post("/createNewEstablishmentInternship",async(req,res,next)=>{
  const student = await Student.findById(req.body.student);
  if (student.enrolled === "yes") {
    return next(new ErrorResponse("Cannot apply for an internship while enrolled.", StatusCodes.BAD_REQUEST))
  }
  try{
    const alreadyApplied = await NewEstablishment.findOne({theme : req.body.theme , student : student._id})
    if(alreadyApplied && student.enrolled == "pending"){
      return next (new ErrorResponse("Your Already Applied to this internship", StatusCodes.BAD_REQUEST))
    }
      const internship = await NewEstablishment.create(req.body);
      await Student.findOneAndUpdate(
        { _id: student._id },
        { enrolled: "pending" }
      );
      await Responsible.findOneAndUpdate(
        { department: student.department },
        {
          $inc: { pending: 1 }
        }
      );
      const responsible = await Responsible.findOne({ department:student.department }).select("_id")
      if(responsible){
        await Notification.create({
          responsible:responsible._id , 
          message: `student ${student.full_name} has sent an internship application`,
            ...req.body
          })
          await Responsible.findOneAndUpdate(
            { department: student.department },
            {
              $inc: { pending: 1 }
            }
          );
      }
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


//Modify Internship 
router.put("/modifyInternship/:idInternship",async(req,res,next)=> {
  try{ 
   const internshipId= req.params.idInternship;
   const isExisting = await Internship.findById({_id : internshipId}).populate({
    path: "student",
    select: "full_name department"
  })
   const isNew = await NewEstablishment.findById({_id : internshipId}).populate({
    path: "student",
    select: "full_name department"
  })
    let internship;
    if(isExisting){
      internship = isExisting
    }
    else if(isNew){
      internship = isNew
    }
    else {
      return res.status(StatusCodes.NOT_FOUND).send({
        status: false,
        message: "Internship not found",
      });
    }
    if((internship.approvedBySupervisor == "pending" &&internship.approvedByResponsible == "rejected") || (internship.approvedBySupervisor == "rejected" && internship.approvedByResponsible == "accepted") || (internship.approvedBySupervisor == "pending" && internship.approvedByResponsible == "pending") ){
      
      if(req.body.startingDate > req.body.startingDate || req.body.startingDate > internship.endingDate || req.body.endingDate < internship.startingDate){
       return res.status(StatusCodes.BAD_REQUEST).send({
          status:false,
          message : "bad date input , you can't choose starting date later than ending date"
       }) 
      }
      else{
      }
      if(internship == isExisting){
        await Internship.updateOne({ _id: internshipId }, { ...req.body,approvedByResponsible: "pending" }); 
      }
      if(internship == isNew){
        await NewEstablishment.updateOne({ _id: internshipId }, {...req.body,approvedByResponsible: "pending"}); 
      }
      const responsible = await Responsible.findOne({ department:internship.student.department })
       if( responsible){
        await Notification.create({
          responsible:responsible._id ,
          message: `student ${internship.student.full_name} has modified his internship`,
          ...req.body
          })
       }
         return res.status(StatusCodes.OK).send({
            status:true
         })
    }
    else{
      return next( new ErrorResponse("internship can't be updated " , StatusCodes.BAD_REQUEST))     
       
  }
  }
  catch(err){
   next(err)
  }

       }
)

//Delete Internship
router.delete("/deleteInternship/:idInternship",async(req,res,next)=> {
  try{ 
   const isExisting = await Internship.findById({_id : req.params.idInternship}).populate({
    path: "student",
    select: "full_name department"
  })
  console.log(isExisting)
  const isNew = await NewEstablishment.findById({_id : req.params.idInternship}).populate({
    path: "student",
    select: "full_name department"
  })
  console.log(isNew)
  let internship;
  if(isExisting){
    internship = isExisting
  }
  else if(isNew){
    internship = isNew
  }
  else {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: false,
      message: "Internship not found",
    });
  }
  console.log(internship)
    if(internship.approvedByResponsible == "pending" || internship.approvedByResponsible== "rejected" || internship.approvedBySupervisor == "pending" || internship.approvedBySupervisor== "rejected"){
      if(internship == isExisting){
        await Internship.deleteOne({ _id: req.params.idInternship }); 
      }
      if(internship == isNew){
        await NewEstablishment.deleteOne({ _id: req.params.idInternship }); 
      }
      const responsible = await Responsible.findOne({ department:internship.student.department })
       if(responsible){
        await Notification.create({
          responsible:responsible._id ,
          message: `student ${internship.student.full_name} has deleted his/her internship`,
          ...req.body
          })
       }
         return res.status(StatusCodes.OK).send({
            status:true
         })
    }
    else{
      return next (new ErrorResponse( "Internship can't be deleted" , StatusCodes.BAD_REQUEST))
        
       
  }
}
  catch(err){
   next(err)
  }

       }
)
router.put("/markPresence/:studentId/:internshipId",async(req,res,next)=>{
  const studentId = req.params.studentId
  const isDateChanged= await Presence.findOne({day: req.body.day, student: studentId, internship: req.params.internshipId} )
  console.log(isDateChanged)
  
 

  try{
    const studentInternship = await Presence.findOneAndUpdate(
      { day: req.body.day, student: studentId },
      { $set: { is_present: req.body.is_present ,
        changed: true} },
      { new: true }
    );
    
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
router.post("/evaluateStudent/:studentId/:internshipId",async(req,res,next)=>{
  const studentId = req.params.studentId
  try{
    if(req.body.innovation < 0 || req.body.innovation > 4 || typeof req.body.innovation == "number"){
        return next(new ErrorResponse("Inputs should be between 0 and 4 and of numerical type"))
    }
    if(req.body.knowledge < 0 || req.body.knowledge > 4 || typeof req.body.knowledge == "number"){
        return next(new ErrorResponse("Inputs should be between 0 and 4 and of numerical type"))
    }
    if(req.body.discipline < 0 || req.body.discipline > 4 || typeof req.body.discipline == "number"){
        return next(new ErrorResponse("Inputs should be between 0 and 4 and of numerical type"))
    }
    if(req.body.skills < 0 || req.body.skills > 4 || typeof req.body.skills == "number"){
        return next(new ErrorResponse("Inputs should be between 0 and 4 and of numerical type"))
    }
    if(req.body.initiative < 0 || req.body.initiative > 4 || typeof req.body.initiative == "number"){
        return next(new ErrorResponse("Inputs should be between 0 and 4 and of numerical type"))
    }
    const full_mark = (Number(req.body.skills) + Number(req.body.initiative) +Number(req.body.discipline) + Number(req.body.innovation) + Number(req.body.knowledge)).toFixed(2)
    
    const studentInternship = await Mark.create(
     {
      full_mark : full_mark,
      skills : req.body.skills,
      initiative : req.body.initiative,
      discipline : req.body.discipline,
      knowledge : req.body.knowledge,
      innovation : req.body.innovation,
      ...req.body
     }
    );
    
      res.status(StatusCodes.OK).send(
          {
              status:true,
              message: "Student Evaluation Created Successfully"
          }
          )
      }
      catch(err){
        next(err)
          } 
})
router.get("/getStudentPresence/:studentId/:internshipId",async(req,res,next)=>{
  const studentId = req.params.studentId
  
  
  try{
    const studentPresence = await Presence.find({student : studentId , internship: req.params.internshipId}).select("is_present day")
     return res.status(StatusCodes.OK).send(
          {
              status:true,
              studentPresence
          }
          )
      }
      catch(err){
        next(err)
          } 
})
router.get("/getStudentEvaluation/:studentId/:internshipId",async(req,res,next)=>{
  const studentId = req.params.studentId
  try{
    const studentEvaluation = await Mark.find({student : studentId , internship: req.params.internshipId})
     return res.status(StatusCodes.OK).send(
          {
              status:true,
              studentEvaluation
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
      const internships = await Internship.find({student:studentId, approvedByResponsible:{$ne :"rejectedByStudent"}})
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number",
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "full_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
        });
        const newEstablishments =await NewEstablishment.find({student:studentId, approvedByResponsible:{$ne :"rejectedByStudent"}}).populate(
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
        const internships = await Internship.find({supervisor:supervisorId, approvedByResponsible:"accepted"})
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number department",
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "full_name",
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
      
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                internships,
                allResponsibles,
                
            }
            )
    }
    catch(err){
        err.message
         }
     })

    
router.get("/allInternships/responsible/:idResponsible",async (req,res,next)=>{
    try{
      const responsibleId = req.params.idResponsible;
      const responsible = await Responsible.findById({ _id: responsibleId })
      const responsibleDep= responsible.department
      const internships = await Internship.find({
        approvedByResponsible: { $nin: ["ongoing", "completed"] },
        post: { $ne: null },
        supervisor: { $ne: null },
        student: { $ne: null }
      }).populate({
            path: "student",
            select: "full_name level_of_study student_card_number social_security_number department",
            match: { department: responsibleDep }
          })
          .populate({
            path: "post",
            select: "title company",
            populate: {
              path: "company",
              select: "full_name",
            },
          })
          .populate({
            path: "supervisor",
            select: "full_name email",
          })
          const newInternships = await NewEstablishment.find({
            approvedByResponsible: { $ne: "ongoing" },
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
                internships,
                newInternships
            }
            )
    }
    catch(err){
       next(err)
         }
     })

router.get("/studentProgress/responsible/:id",async (req,res)=>{
    try{
      const responsibleId = req.params.id;
      const responsible = await Responsible.findById({ _id: responsibleId })
      const responsibleDep= responsible.department
        const studentProgress = await Internship.find(
           
         { approvedBySupervisor: { $in: ["ongoing", "completed"] },
          approvedByResponsible: { $in: ["ongoing", "completed"] } }           
          )
        .populate({
          path: "student",
          select: "full_name level_of_study student_card_number social_security_number department",
        })
        .populate({
          path: "post",
          select: "title company",
          populate: {
            path: "company",
            select: "full_name",
          },
        })
        .populate({
          path: "supervisor",
          select: "full_name email",
        })
        
       
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                studentProgress,
                
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/studentProgress/supervisor/:id",async (req,res)=>{
    try{
      const id = req.params.id;

        const studentProgress = await Internship.find({
            
          approvedBySupervisor: { $in: ["ongoing", "completed"] },
  approvedByResponsible: { $in: ["ongoing", "completed"] },
  supervisor: id
            
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
            select: "full_name",
          },
        })
        let allResponsibles = [];
        for (const accepted of studentProgress) {
          const responsible = await Responsible.findOne({ department: accepted.student.department });
          allResponsibles.push(responsible)
        }
       
      
        res.status(StatusCodes.OK).send(
            {
                status:true,
                studentProgress,
                allResponsibles
            }
            )
    }
    catch(err){
        err.message
         }
     })

router.get("/acceptedByBoth/supervisor/:idSupervisor",async (req,res)=>{
    try{
      const supervisorId = req.params.idSupervisor;
      const internships = await Internship.find({
        supervisor: supervisorId,
        approvedByResponsible: "accepted",
        approvedBySupervisor: "accepted",
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
            select: "full_name",
          },
        })
        let allResponsibles = [];
        for (const accepted of internships) {
          const responsible = await Responsible.findOne({ department: accepted.student.department });
          allResponsibles.push(responsible)
        }
       
      
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


//Active Offers / offers that students are interacting with
router.get("/activeOffers", async (req, res) => {
  try {
    const posts = await Post.find({ isOffer :true});
    let count = 0;

    for (const post of posts) {
      const internshipCount = await Internship.countDocuments({ post: post._id });
      {
        if(internshipCount != 0){
          count ++;
        }
      }
    }

    const postCount = posts.length

    res.status(StatusCodes.OK).send({
      status: true,
      count,
      postCount
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: false,
      error: err.message,
    });
  }
});
//Current Interns / the ones accepted amongs all other internships(all internships are counted)
router.get("/currentInterns", async (req, res) => {
  try {
    const interns = await Student.countDocuments({enrolled: "yes"})
    const existingInternships = await Internship.countDocuments()
    const newInternships = await NewEstablishment.countDocuments()
    let allInternships;
    console.log(newInternships)
    if(newInternships == 0 && existingInternships == 0){
          allInternships = 0
    }
    else {
      allInternships = newInternships + existingInternships
    }
    res.status(StatusCodes.OK).send({
      status: true,
      allInternships,
      interns
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: false,
      error: err.message,
    });
  }
});
router.put("/rejectInternship/supervisor/:idInternship",async (req,res)=>{
  try{
    const internshipId = req.params.idInternship;
    const internship = await Internship.findById({ _id: internshipId }).populate({
      path: "student",
      select : "department full_name"
      }).populate(
       { path: "post",
        select : "title"}
      )
        await Internship.updateOne(
          {_id: internship._id},
         { $set: { approvedBySupervisor: "rejected" , rejectionMessage : req.body.rejectionMessage }}
        );
        await Supervisor.findOneAndUpdate(
          { _id: internship.supervisor._id },
          { 
            $inc: {rejected: 1 } ,
          }
        );
      
     
      const studentId= internship.student._id
      const isStudentEnrolled = await Internship.find({student:studentId})
      const isStudentEnrolled2 = await NewEstablishment.find({student:studentId})
      if (isStudentEnrolled.lengh == 0 && !isStudentEnrolled2.length == 0){
        await Student.findOneAndUpdate(
          { _id: studentId },
          { enrolled: "no" }
          );
        }
        await Notification.create({
          student:internship.student._id ,
          message: `your internship ${internship.post.title} has been rejected by the department responsible`,
          ...req.body
        })
        const responsible= await Responsible.findOne({department: internship.student.department})
        await Notification.create({
          responsible:responsible._id ,
          message: `student ${internship.student.full_name} has been rejected by the internship supervisor from getting the internship ${internship.post.title}`,
          ...req.body
        })
        await Supervisor.findOneAndUpdate(
          { _id: internship.supervisor._id },
          { 
            $inc: { rejected: 1 } ,
          }
        );
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
router.put("/rejectInternship/responsible/:idInternship",async (req,res,next)=>{
          try{
      const internshipId = req.params.idInternship;
      let internship;
      const isExisting = await Internship.findById({ _id: internshipId }).populate(
        {
          path: "student",
          select: "department"
        }
      )
      const isNew = await NewEstablishment.findById({ _id: internshipId }).populate(
        {
          path: "student",
          select: "department"
        }
      )
      if(isExisting){
        internship= isExisting
        await Internship.updateOne(
          {_id: internship._id},
         { $set: { approvedByResponsible: "rejected" , rejectionMessage : req.body.rejectionMessage }}
        );
      }
      else if(isNew){
        internship = isNew
        await NewEstablishment.updateOne(
          {_id: internship._id},
          { $set: { approvedByResponsible: "rejected" , rejectionMessage : req.body.rejectionMessage }}
        );
      }
      const studentId= internship.student._id
      
      const isStudentEnrolled = await Internship.find({student:studentId})
      const isStudentEnrolled2 = await NewEstablishment.find({student:studentId})
      if (!isStudentEnrolled && !isStudentEnrolled2){
        await Student.findOneAndUpdate(
          { _id: studentId },
          { enrolled: "no" }
        );
      }
     if(internship == isNew){
      await Notification.create({
        student:internship.student._id ,
        message: `your internship ${internship.theme} has been rejected by the department responsible`,
        ...req.body
        })
     }
     else {
      await Notification.create({
        student:internship.student._id ,
        message: `your internship ${internship.post.title} has been rejected by the department responsible`,
        ...req.body
        })
     }
     await Responsible.findOneAndUpdate(
      { department: internship.student.department },
      { 
        $inc: { rejected: 1 } ,
      }
    );
        res.status(StatusCodes.OK).send(
            {
                status:true,     
            }
            )
    }
    catch(err){
        next(err)
         }
     })
router.put("/acceptInternship/responsible/:idInternship",async (req,res, next)=>{
    try{
      const internshipId = req.params.idInternship;
      const internship = await Internship.findById({ _id: internshipId })
      .populate({ path: "student", select: "full_name _id department" })
      .populate({ path: "supervisor", select: "_id" })
      .populate({ path: "post", select: "title"})
      await internship.updateOne({ approvedByResponsible: "accepted" });
      await Responsible.findOneAndUpdate(
        { department: internship.student.department },
        { 
          $inc: { accepted: 1 , pending: -1 } ,
        }
      );
      await Supervisor.findOneAndUpdate(
        { _id: internship.supervisor._id },
        { 
          $inc: {pending: 1 } ,
        }
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
        res.status(StatusCodes.OK).send({ status:true })
    }
    catch(err){
       next(err)
         }
     })
     

router.put("/acceptNewIntership/responsible/:idInternship", async (req, res,next) => {
           try {
             const { idInternship } = req.params;
             const newInternship = await NewEstablishment.findById(idInternship).populate({ path: "student", select: "full_name department" });   
             const company = await getOrCreateCompany(newInternship.company);
             
             const supervisor = await getOrCreateSupervisor(newInternship.supervisor_email, newInternship.supervisor_name, company);
             const post = await getOrCreatePost(newInternship.theme, company);
             console.log(company)
             console.log(newInternship)
             console.log(supervisor)
             console.log(post)
         
             const createInternship = await Internship.create({
               student: newInternship.student._id,
               supervisor: supervisor._id,
               post: post._id,
               approvedByResponsible: "accepted",
               startingDate: newInternship.startingDate,
               endingDate: newInternship.endingDate,
             });
         
             const deleteNewInternship = await NewEstablishment.findByIdAndDelete(idInternship);
             await createNotification(newInternship.student._id, `Your internship ${post.title} has been accepted by the department responsible`, req.body);
             await createNotification(supervisor._id, `Student ${newInternship.student.full_name} has sent an internship application`, req.body);
             await Responsible.findOneAndUpdate(
              { department: newInternship.student.department },
              { 
                $inc: { accepted: 1 , pending: -1 } ,
              }
            );
            await Supervisor.findOneAndUpdate(
              { _id: supervisor._id },
              { 
                $inc: {pending: 1 } ,
              }
            );
             res.status(StatusCodes.OK).send({ status: true });
         
             if (res.statusCode === StatusCodes.OK) {
               await sendAccountPasswordEmail(newInternship.supervisor_email, supervisor.password);
             }
           } catch (err) {
             console.error(err);
             res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: false, error: "Server error" });
           }
         });
         
         async function getOrCreateCompany(companyName) {
           let company = await Company.findOne({ full_name: companyName });
           if (!company) {
             company = await Company.create({
               full_name: companyName,
               address: "unknown",
             });
           }
           return company;
         }
         
         async function getOrCreateSupervisor(email, name, company) {
           let supervisor = await Supervisor.findOne({ email });
           if (!supervisor) {
             const password = generateRandomPassword();
             supervisor = await Supervisor.create({
               full_name: name,
               email,
               company,
               password,
             });
           }
           return supervisor;
         }
         
         async function getOrCreatePost(title, company) {
           let post = await Post.findOne({ title });
           if (!post) {
             post = await Post.create({
               description: "empty",
               company,
               title,
               isOffer: false,
             });
           }
           return post;
         }
         
         async function createNotification(userId, message, body) {
           await Notification.create({
             student: userId,
             message,
             ...body,
           });
         }
         
         async function sendAccountPasswordEmail(email, password) {
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
         
         function generateRandomPassword() {
           let password = "";
           const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
           for (let i = 0; i < 10; i++) {
             const randomIndex = Math.floor(Math.random() * characters.length);
             password += characters[randomIndex];
           }
           return password;
         }
         
router.put("/acceptInternship/supervisor/:idInternship",async (req,res, next)=>{
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
      

      await Notification.create({
        student: internship.student._id,
        message: `your internship ${internship.post.title} has been accepted by the internship supervisor,You need to confirm your commitment in order to officially start `,
        ...req.body
      })
      await Notification.create({
        responsible: responsible._id,
        message: `student ${internship.student.full_name} has been accepted by the internship supervisor`,
        ...req.body
      })
      await Supervisor.findOneAndUpdate(
        { _id: internship.supervisor._id },
        { 
          $inc: {accepted: 1 } ,
        }
      );
        res.status(StatusCodes.OK).send(
            {
                status:true,     
            }
            )

    }
    catch(err){
       next(err)
         }
     })
router.put("/chooseInternship/student/:idInternship", async (req, res) => {
      try {
        const internshipId = req.params.idInternship;
        const chosenInternship = await Internship.findById(internshipId);
        await Student.findOneAndUpdate(
          {_id: chosenInternship.student._id},
          { enrolled: "yes" },
        );
        await Internship.findOneAndUpdate(
          {_id:internshipId},
          { approvedByResponsible: "ongoing",
        approvedBySupervisor:"ongoing" },
        );
        let startingDate= new Date(chosenInternship.startingDate)
        for (var i=0 ;i<= (new Date(chosenInternship.endingDate)- new Date(chosenInternship.startingDate))/(1000 * 60 * 60 * 24) ;i++){
          await Presence.create(
            {
              student: chosenInternship.student,
              internship : chosenInternship._id,
              day : startingDate
            }
          )
          startingDate.setDate(startingDate.getDate() + 1)
        }
        await Internship.updateMany(
          {
            student: chosenInternship.student,
            _id: { $ne: chosenInternship._id },
            approvedByResponsible: { $ne: "completed" },
            approvedBySupervisor: { $ne: "completed" },
            
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
              select: "full_name",
            },
          })
          .populate({
            path: "supervisor",
            select: "full_name email",
          });
    
          const responsible = await Responsible.find({ department: chosenInternship.student.department });
        for (const one of otherInternships) {
          await Notification.create({
            supervisor: one.supervisor._id,
            message: `Student ${one.student.full_name} has canceled his internship application in ${one.post.title}`,
          });
          await Notification.create({
            responsible: responsible._id,
            message: `Student ${one.student.full_name} has canceled his/her internship application in ${one.post.title}`,
          });
        }
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
router.put("/completeInternship/supervisor/:idInternship", async (req, res) => {
      try {
        const { idInternship } = req.params;
        const newInternship = await Internship.findById(idInternship).populate({
          path: "student",
          select: "_id department full_name"
        }).populate({
          path: "post",
          select : "title"
        })
        await Internship.findOneAndUpdate(
         { _id: idInternship },
         { 
           approvedByResponsible : "completed",
           approvedBySupervisor : "completed",
         }
       );
       await Student.findOneAndUpdate(
        {_id: newInternship.student._id},
        {
          enrolled : "no"
        }
        )
       const responsible = await Responsible.findOne({ department:newInternship.student.department }).select("_id")
      await Notification.create({
        responsible:responsible._id , 
        message: `student ${newInternship.student.full_name} has completed their internship . Marks are available`,
          ...req.body
      })
      await Notification.create({
        student:newInternship.student._id , 
        message: `you've completed your internship ${newInternship.post.title}.Marks are available. Please approach your internship supervisor as soon as possible to get your certificate `,
          ...req.body
      })

        res.status(StatusCodes.OK).send({ status: true });
    
      } catch (err) {
        next(err)
      }
    });    

    router.post('/generateCertificate/:internshipId', async (req, res, next) => {
      try {
        let options = { format: 'A4' };
        let file = { content: '<h1>Welcome to html-pdf-node</h1>' };
        const internship = await Internship.find({ internship: req.params.internshipId });
        const pdfBuffer =  html_to_pdf.generatePdf(file, options);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
        res.sendFile(pdfBuffer);
      } catch (err) {
        next(err);
      }
    });


     


export default router;
