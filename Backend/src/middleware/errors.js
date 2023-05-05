import { StatusCodes } from "http-status-codes"
import ErrorResponse from "../utils/errorResponse.js"

const errorHandler =(err,req,res,next)=>{
    let error = {...err}
    console.log(err)
    error.message = err.message
    if(err.name ==`CastError`){
        const message = "Ressource not found"
        error = new ErrorResponse(message, StatusCodes.NOT_FOUND)

    }
    if(err.code == 11000){
        const message = "Duplicate field value entered"
        error = new ErrorResponse(message, StatusCodes.BAD_REQUEST)
    }
    if(err.name == "ValidationError"){
        const message = Object.values(err.errors).map(value =>
            value.message)
        error = new ErrorResponse(message, StatusCodes.BAD_REQUEST)
    }
    res.status(error.statusCode || 500).send(
        {
            status : false,
            error: error.message || "server error"
        }
    )
}

export default errorHandler