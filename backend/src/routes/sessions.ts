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
            managerId: session.managerId,
            items: session.items,
            users: session.users
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

router.patch('/:id/join', async (req: Request, res: Response) => {
    const { user } = req.body

    try {
        const session = await SessionModel.findById(req.params.id).exec();

        if (!session) {
            res.status(404).send("Session not found");
        } else {
            const userExists = session.users.some((existingUser) => existingUser.id === user.id);
            if (userExists) {
                res.status(200).send("User already exists in session");
            } else {
                session.users.push(user);
                await session.save();
        
                res.status(201).send("User added successfully");
            }
        }
    } catch (error: any) {
        res.status(500).send("Error adding user to session: " + error.message);
    }
});

router.patch('/:id/item', async (req: Request, res: Response) => {
    const { name, price, payers } = req.body.item;
    try {
        const session = await SessionModel.findById(req.params.id).exec();

        if (!session) {
            res.status(404).send("Session not found");
        } else {
            const newItem = { name, price, payers };
            
            session.items.push(newItem);
            await session.save();
            
            res.status(201).send("Item added successfully");
        }
    } catch (error: any) {
        res.status(500).send("Error adding item to session: " + error.message);
    }   
});
  


export default router