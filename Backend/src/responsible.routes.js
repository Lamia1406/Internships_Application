import express from "express"
import { StatusCodes } from "http-status-codes";
import responsibleService from "./services/responsible.service.js";

const router = express.Router();
const status = {
    SUCCESS : "OK",
    FAILURE : "NO",
}

router.get("/all",(req,res)=>{
    const responsibles =responsibleService.getAllResponsibles();
    if(responsibles.length){
        return res.status(StatusCodes.OK).send(
            responsibles
        )
    }
    return res.status(StatusCodes.NOT_FOUND).send(
       { status:status.FAILURE,
        message: "no responsibles found"}
    )
})
router.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id, 10)
    const responsible =responsibleService.getResponsible(id);
    if(responsible){
        return res.status(StatusCodes.OK).send(
           {
            status:status.SUCCESS,
            responsible
           }
        )
    }
    return res.status(StatusCodes.NOT_FOUND).send(
        {
            status:status.FAILURE,
            message: "no responsible found"
        }
    )
    return res.status(StatusCodes.NOT_FOUND).send(
       { status:status.FAILURE,
        message: "no responsibles found"}
    )
})
router.post("/",(req,res)=>{
    const {body:responsible} = req;
    const addedResponsible = responsibleService.addResponsible(responsible);

    if (!responsible.full_name){
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: status.FAILURE,
            message :"Name is required"
        })
    }

    res.status(StatusCodes.CREATED).send({
        status: status.SUCCESS,
        message : addedResponsible,
    });
})

router.put("/:id",(req,res)=>{
    const {body:responsible} = req;
    const id = parseInt(req.params.id, 10);

    const updatedResponsible = responsibleService.updateResponsible(id, responsible);
    if (updatedResponsible === false){
        return res.status(StatusCodes.NOT_FOUND).send({
            status: status.FAILURE,
            message: `Responsible ${id} is not found`
        })
    }

    res.status(StatusCodes.OK).send({
        status: status.SUCCESS,
        responsible : updatedResponsible,
    });
})
router.delete('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);
    const responsible = responsibleService.getResponsible(id);
  
    if (responsible) {
      responsibleService.deleteResponsible(id);
  
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
