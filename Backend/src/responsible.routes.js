import express from "express"
import { StatusCodes } from "http-status-codes";
import responsibleService from "./services/responsible.service.js";

const router = express.Router();





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







export default router;
