import { NextFunction, Request, Response } from "express";

const express = require('express');

const app = express();
app.use(express.json());

interface User {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

app.get('/api/users/currentuser', (req: Request, res: Response, next: NextFunction) => {
    let user: User = {
        userId: 1,
        id: 1,
        title: 'dvksdvsv',
        body: "KOKO"
    };
    return res.json({user});
})

app.listen(5000, () => console.log('Auth service is running on port 5000'));