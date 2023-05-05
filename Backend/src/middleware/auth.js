import Student from "../models/student.js";
import Responsible from "../models/responsible.js";
import ErrorResponse from "../utils/errorResponse.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Webmaster from "../models/webmaster.js";

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorResponse(
          "You must log in to access this resource",
          StatusCodes.BAD_REQUEST
        )
      );
    }
    try {
      const decoded = jwt.verify(token, "azertyuiop");
      let user;
      if (decoded.userType === "student") {
        user = await Student.findById(decoded.id);
      } else if (decoded.userType === "department responsible") {
        user = await Responsible.findById(decoded.id);
      }
       
      else if (decoded.userType === "webmaster") {
        user = await Webmaster.findById(decoded.id);
      }
      req.user = user;
      next();
    } catch (error) {
      return next(
        new ErrorResponse(
          "You must log in to access this resource",
          StatusCodes.BAD_REQUEST
        )
      );
    }
  };
export {isAuthenticated}
