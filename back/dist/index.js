"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const app = (0, express_1.default)();
const port = 8080; // default port to listen
require('dotenv').config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", UserRouter_1.default);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
mongoose_1.default.connect(process.env.MONGO_URI)
    .then((res) => app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
}))
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map