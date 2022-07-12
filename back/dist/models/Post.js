"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    authorAddress: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    likes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        }],
    comments: [{
            type: String,
        }],
    retweets: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Retweet",
        }],
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
//# sourceMappingURL=Post.js.map