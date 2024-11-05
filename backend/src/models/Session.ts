import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    nickname: { type: String, required: true },
    picture: { type: String, required: true }
}, {_id: false});

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    payers: [UserSchema]
});

const SessionSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    managerId: { type: String, required: true },
    users: { type: [UserSchema], required: true, minLength: 1},
    items: { type: [ItemSchema], default: []}
})

export const SessionModel = mongoose.model("sessions", SessionSchema)