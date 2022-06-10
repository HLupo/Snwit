"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
require('dotenv').config();
const router = express_1.default.Router();
router.get("/user", (req, res) => {
    res.send("Router user works!");
});
// Post create user
router.post("/createUser", (req, res) => {
    const user = new User_1.User({
        address: req.body.address,
        email: req.body.email,
        password: req.body.password
    });
    if (user.address && user.email && user.password) {
        user.findByAddressOrEmail(user.address, user.email).then((results) => {
            if (results) {
                res.statusCode = 400;
                res.statusMessage = "User already exists";
                console.log("User already exists /createUser");
                res.send();
            }
            else {
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
                });
            }
        }).catch((err) => {
            res.statusCode = 500;
            res.statusMessage = "Internal Server Error";
            console.log("Internal Server Error /createUser", err);
            res.send({ "err": err });
        });
    }
    else {
        res.statusCode = 400;
        res.statusMessage = "Please fill all fields";
        console.log("Please fill all fields /createUser");
        res.send();
    }
});
exports.default = router;
//# sourceMappingURL=UserRouter.js.map