import express, { Request, Response }  from 'express'
import { SessionModel } from '../models/Session';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const session = await SessionModel.findById(req.params.id).exec();
        if (session) {
            res.send(session);
        } else {
            res.status(404).send("Session not found");
        }
    } catch (error: any) {
        res.status(500).send("Error retrieving session: " + error.message);
    }
});

router.get('/title/:title', async (req: Request, res: Response) => {
    try {
        const sessions = await SessionModel.find({
            title: { $regex: req.params.title, $options: "i" }
        }).exec();
        res.send(sessions);
    } catch (error: any) {
        res.status(500).send("Error retrieving sessions by title: " + error.message);
    }
});

router.get('/managerId/:managerId', async (req: Request, res: Response) => {
    try {
        const sessions = await SessionModel.find({
            managerId: { $regex: req.params.managerId, $options: "i" }
        }).exec();
        res.send(sessions);
    } catch (error: any) {
        res.status(500).send("Error retrieving sessions by manager ID: " + error.message);
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { session } = req.body

    try {
        const newSession = new SessionModel({
            title: session.title,
            managerId: session.managerId
        });

        await newSession.save();
        res.status(201).send(newSession._id);
    } catch (error: any) {
        res.status(500).send("Error creating session: " + error.message);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedSession = await SessionModel.findByIdAndDelete(req.params.id).exec();
        if (deletedSession) {
            res.status(200).send("Session deleted successfully");
        } else {
            res.status(404).send("Session not found");
        }
    } catch (error) {
        res.status(500).send("Error deleting session");
    }
});
export default router