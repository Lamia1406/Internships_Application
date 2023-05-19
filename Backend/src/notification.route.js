import University from "./models/university.js";
import express from 'express'
import ErrorResponse from "./utils/errorResponse.js";
import Faculty from './models/faculty.js'
import Department from './models/department.js'
import Notification from "./models/Notification.js";
import { StatusCodes } from "http-status-codes";
const router = express.Router();

router.get("/allNotifications/responsible/:responsibleId",async (req,res)=>{
    const responsibleId = req.params.responsibleId;
    try{
        const notifications = await Notification.find({responsible : responsibleId});
        res.status(StatusCodes.OK).send(
            {
                status:true,
                notifications
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allNotifications/student/:studentId",async (req,res)=>{
    const studentId = req.params.studentId;
    try{
        const notifications = await Notification.find({student : studentId});
        res.status(StatusCodes.OK).send(
            {
                status:true,
                notifications
            }
            )
    }
    catch(err){
        err.message
         }
     })
router.get("/allNotifications/supervisor/:supervisorId",async (req,res)=>{
    const supervisorId = req.params.supervisorId;
    try{
        const notifications = await Notification.find({supervisor : supervisorId});
        res.status(StatusCodes.OK).send(
            {
                status:true,
                notifications
            }
            )
    }
    catch(err){
        err.message
         }
     })

export default router