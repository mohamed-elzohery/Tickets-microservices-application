import { Router } from "express";

const router = Router();
router.get('/currentuser', (req, res) => {
    return res.send({currentUser: 'Admins'});
});

export {router as authRouter};