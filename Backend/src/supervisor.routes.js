import express from "express"
import { StatusCodes } from "http-status-codes";
import supervisorService from "./services/supervisor.service.js";

const router = express.Router();
const status = {
    SUCCESS : "OK",
    FAILURE : "NO",
}

router.get("/all",(req,res)=>{
    const supervisors =supervisorService.getAllSupervisors();
    if(supervisors.length){
        return res.status(StatusCodes.OK).send(
            supervisors
        )
    }
    return res.status(StatusCodes.NOT_FOUND).send(
       { status:status.FAILURE,
        message: "no supervisors found"}
    )
})
router.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id, 10)
    const supervisor =supervisorService.getSupervisor(id);
    if(supervisor){
        return res.status(StatusCodes.OK).send(
           {
            status:status.SUCCESS,
            supervisor
           }
        )
    }
    return res.status(StatusCodes.NOT_FOUND).send(
        {
            status:status.FAILURE,
            message: "no supervisor found"
        }
    )
    return res.status(StatusCodes.NOT_FOUND).send(
       { status:status.FAILURE,
        message: "no supervisors found"}
    )
})
router.post("/",(req,res)=>{
    const {body:supervisor} = req;
    const addedSupervisor = supervisorService.addSupervisor(supervisor);

    if (!supervisor.full_name){
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: status.FAILURE,
            message :"Name is required"
        })
    }

    res.status(StatusCodes.CREATED).send({
        status: status.SUCCESS,
        message : addedSupervisor,
    });
})

router.put("/:id",(req,res)=>{
    const {body:supervisor} = req;
    const id = parseInt(req.params.id, 10);

    const updatedSupervisor = supervisorService.updateSupervisor(id, supervisor);
    if (updatedSupervisor === false){
        return res.status(StatusCodes.NOT_FOUND).send({
            status: status.FAILURE,
            message: `supervisor ${id} is not found`
        })
    }

    res.status(StatusCodes.OK).send({
        status: status.SUCCESS,
        supervisor : updatedSupervisor,
    });
})
router.delete('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);
    const supervisor = supervisorService.getSupervisor(id);
  
    if (supervisor) {
      supervisorService.deleteSupervisor(id);
  
      return res.status(StatusCodes.OK).send({
        status: status.SUCCESS,
        message: `User ${id} has been deleted`
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({
        status: status.FAILURE,
        message: `User ${id} has not been found`
      });
    }
  });






export default router;
