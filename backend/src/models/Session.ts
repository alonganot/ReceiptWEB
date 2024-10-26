import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    managerId: String
})

export const SessionModel = mongoose.model("sessions", SessionSchema)