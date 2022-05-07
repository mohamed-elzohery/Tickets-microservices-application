import { Router } from "express";

const router = Router();
router.get('/currentuser', (req, res) => {
    console.log("Hit");
    return res.send({currentUser: 'Admin'});
});

export {router as authRouter};