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
        user.findByAddress(user.address).then((results) => {
            console.log(results);
        }).catch((err) => {
            console.log(err);
        });
    }
    else {
        res.statusCode = 400;
        res.statusMessage = "Please fill all fields";
        res.send();
    }
});
exports.default = router;
//# sourceMappingURL=UserRouter.js.map