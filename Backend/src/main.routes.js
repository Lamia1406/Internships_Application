import express from "express"
import { StatusCodes } from "http-status-codes";
// import studentService from "./services/student.service.js";
// import responsibleService from "./services/responsible.service.js";
// import supervisorService from "./services/supervisor.service.js";

const router = express.Router();


router.get('/ping', (req,res)=>{
    res.status(StatusCodes.CREATED);
    res.send(" OK");
})




export default router;
