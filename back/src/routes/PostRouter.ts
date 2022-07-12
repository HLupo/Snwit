import express from "express";
import { ObjectId } from "mongodb";
import { Post } from "../models/Post";

require('dotenv').config();
const router = express.Router();


// Create post route
router.post("/post", (req, res) => {
    const post = new Post({
        content: req.body.content,
        authorId: new ObjectId(req.body.authorId),
        authorAddress: req.body.authorAddress,
        likes: [],
        comments: [],
        retweets: [],
        isComment: req.body.isComment ? true : false,
        postCommentId: req.body.postCommentId ? new ObjectId(req.body.postCommentId) : null,
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
    Post.find()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

// Get all posts from userid
router.get("/post/:userId", (req, res) => {
    Post.find({ authorId: req.params.userId })
        .then((result) => {
            console.log(result)
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

// delete post if user is author
router.delete("/post/:postId", (req, res) => {
    Post.findByIdAndDelete(req.params.postId)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

// delete all posts
router.delete("/post", (req, res) => {
    Post.deleteMany({})
        .then((result) => {
            console.log("Deleted all posts")
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

// Like post
router.post("/post/like/:postId", (req, res) => {
    // Check if user already liked post
    Post.findById(req.params.postId)
        .then((result) => {
            if (result.likes.includes(req.body.userId)) {
                console.log("User already liked post")
                res.send({ err: "User already liked post" });
            } else {
                Post.findByIdAndUpdate(req.params.postId, {
                    $push: {
                        likes: new ObjectId(req.body.userId),
                    },
                }, { new: true })
                    .then((result) => {
                        res.send(result);
                    }).catch((err) => {
                        res.send(err);
                    });
            }
        })
});

// Remove user from likes
router.post("/post/unlike/:postId", (req, res) => {
    console.log("unlike")
    Post.findByIdAndUpdate(req.params.postId)
        .then((result) => {
            result.likes.splice(result.likes.indexOf(req.body.userId), 1);
            result.save()
                .then((result) => {
                    console.log("Ok removed")
                    console.log(result)
                    res.send(result);
                }
                ).catch((err) => {
                    res.send(err);
                }
                )
        });
})

// Change like
router.post("/post/changeLike/:postId", (req, res) => {
    Post.findByIdAndUpdate(req.params.postId, {
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
    Post.findByIdAndUpdate(req.params.postId, {
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
    Post.findById(req.params.postId)
        .then((result) => {
            res.send(result.comments);
        }).catch((err) => {
            res.send(err);
        });
});

export default router;