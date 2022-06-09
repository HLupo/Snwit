import express from "express";
import { User } from "../models/User";

require('dotenv').config();
const router = express.Router();

router.get("/user", (req, res) => {
    res.send("Router user works!");
});

// Post create user


router.post("/createUser", (req, res) => {
    const user = new User({
        address: req.body.address,
        email: req.body.email,
        password: req.body.password
    })

    if (user.address && user.email && user.password) {
        user.findByAddress(user.address).then((results) => {
            console.log(results);
        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.statusCode = 400;
        res.statusMessage = "Please fill all fields"
        res.send();
    }
});

export default router;