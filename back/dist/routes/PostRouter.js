"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const Post_1 = require("../models/Post");
require('dotenv').config();
const router = express_1.default.Router();
// Create post route
router.post("/post", (req, res) => {
    const post = new Post_1.Post({
        content: req.body.content,
        authorId: new mongodb_1.ObjectId(req.body.authorId),
        authorAddress: req.body.authorAddress,
        likes: [],
        comments: [],
        retweets: [],
        isComment: req.body.isComment ? true : false,
        postCommentId: req.body.postCommentId ? new mongodb_1.ObjectId(req.body.postCommentId) : null,
    });
    post.save()
        .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
// Get all posts
router.get("/posts", (req, res) => {
    Post_1.Post.find()
        .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
// Get all posts from userid
router.get("/post/:userId", (req, res) => {
    Post_1.Post.find({ authorId: req.params.userId })
        .then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
// delete post if user is author
router.delete("/post/:postId", (req, res) => {
    Post_1.Post.findByIdAndDelete(req.params.postId)
        .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
// delete all posts
router.delete("/post", (req, res) => {
    Post_1.Post.deleteMany({})
        .then((result) => {
        console.log("Deleted all posts");
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
// Like post
router.post("/post/like/:postId", (req, res) => {
    // Check if user already liked post
    Post_1.Post.findById(req.params.postId)
        .then((result) => {
        if (result.likes.includes(req.body.userId)) {
            console.log("User already liked post");
            res.send({ err: "User already liked post" });
        }
        else {
            Post_1.Post.findByIdAndUpdate(req.params.postId, {
                $push: {
                    likes: new mongodb_1.ObjectId(req.body.userId),
                },
            }, { new: true })
                .then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        }
    });
});
// Remove user from likes
router.post("/post/unlike/:postId", (req, res) => {
    console.log("unlike");
    Post_1.Post.findByIdAndUpdate(req.params.postId)
        .then((result) => {
        result.likes.splice(result.likes.indexOf(req.body.userId), 1);
        result.save()
            .then((result) => {
            console.log("Ok removed");
            console.log(result);
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
    });
});
// Change like
router.post("/post/changeLike/:postId", (req, res) => {
    Post_1.Post.findByIdAndUpdate(req.params.postId, {
        $set: {
            likes: req.body.likes,
        },
    }, { new: true })
        .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
// Comment post 
router.post("/post/comment/:postId", (req, res) => {
    Post_1.Post.findByIdAndUpdate(req.params.postId, {
        $push: {
            comments: req.body.comment,
        },
    }, { new: true })
        .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
// Get all comments from post
router.get("/post/comments/:postId", (req, res) => {
    Post_1.Post.findById(req.params.postId)
        .then((result) => {
        res.send(result.comments);
    }).catch((err) => {
        res.send(err);
    });
});
exports.default = router;
//# sourceMappingURL=PostRouter.js.map