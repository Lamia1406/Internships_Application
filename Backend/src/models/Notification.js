import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {   
        student: {
            type: ObjectId,
            ref:"Student"
        },
        supervisor: {
            type: ObjectId,
            ref:"supervisor"
        },
        responsible: {
            type: ObjectId,
            ref:"responsible"
        },
        date: {
            type: Date,
            default: new Date()
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
