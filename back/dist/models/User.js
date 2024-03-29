"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Post_1 = require("./Post");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    address: {
        type: String,
        required: true,
    },
    pseudo: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: null
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password")) {
            return next();
        }
        try {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
            user.password = hashedPassword;
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        try {
            const isMatch = yield bcryptjs_1.default.compare(candidatePassword, user.password);
            return isMatch;
        }
        catch (err) {
            throw new Error(err);
        }
    });
};
// set user bio 
userSchema.methods.setBio = function (bio) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.bio = bio;
        return user.save();
    });
};
//find user by email
userSchema.methods.findByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email: email });
        return user;
    });
};
// find user by address
userSchema.methods.findByAddress = function (address) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ address: address });
        return user;
    });
};
// find user by email and password
userSchema.methods.findByEmailAndPassword = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email: email, password: password });
        return user;
    });
};
// find user by address and email
userSchema.methods.findByAddressAndEmail = function (address, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ address: address, email: email });
        return user;
    });
};
// find user by address or email
userSchema.methods.findByAddressOrEmail = function (address, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ $or: [{ address: address }, { email: email }] });
        return user;
    });
};
// find user by address or email or username
userSchema.methods.findByAddressOrEmailOrUsername = function (address, email, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ $or: [{ address: address }, { email: email }, { username: username }] });
        return user;
    });
};
// find by objectId
userSchema.methods.findById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findById(id);
        return user;
    });
};
// populate user with posts
userSchema.methods.populatePosts = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const posts = yield Post_1.Post.find({ authorId: user._id });
        user.posts = posts;
        return user;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map