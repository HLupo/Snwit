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
        username: req.body.username,
        password: req.body.password
    })

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[:!@#;,\$%\^&\*\\])(?=.{8,})/;
    console.log(user);
    if (user.address && user.email && user.password && user.username) {
        if (!passwordRegex.test(user.password)) {
            res.statusCode = 400;
            res.statusMessage = "Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character";
            console.log("Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character");
            res.send("Password is not strong enough");
        }

        user.findByAddressOrEmailOrUsername(user.address, user.email, user.username).then((results) => {
            if (results) {
                res.statusCode = 400;
                res.statusMessage = "User already exists";
                console.log("User already exists /createUser");
                res.send();
            } else {
                user.save().then((results) => {
                    res.statusCode = 201;
                    res.statusMessage = "User created";
                    console.log("User created /createUser", user);
                    res.send({ "user": results });
                }).catch((err) => {
                    res.statusCode = 400;
                    res.statusMessage = "User not created";
                    console.log("User not created /createUser", err);
                    res.send({ "err": err });
                })
            }
        }).catch((err) => {
            res.statusCode = 500;
            res.statusMessage = "Internal Server Error";
            console.log("Internal Server Error /createUser", err);
            res.send({ "err": err });
        })
    }
    else {
        res.statusCode = 400;
        res.statusMessage = "Please fill all fields"
        console.log("Please fill all fields /createUser");
        res.send();
    }
});

// Get user by address
router.get("/getUserByAddress/:address", (req, res) => {
    console.log("Endpoint hit")
    const user = new User({
        address: req.params.address,
    })

    user.findByAddress(user.address).then((results) => {
        console.log("params = ", user.address);
        if (results) {
            res.statusCode = 200;
            res.statusMessage = "User found";
            console.log("User found /getUserByAddress", results);
            res.send({ "user": results });
        } else {
            res.statusCode = 404;
            res.statusMessage = "User not found";
            console.log("User not found /getUserByAddress");
            res.send();
        }
    }).catch((err) => {
        res.statusCode = 500;
        res.statusMessage = "Internal Server Error";
        console.log("Internal Server Error /getUserByAddress", err);
        res.send({ "err": err });
    })
});

export default router;