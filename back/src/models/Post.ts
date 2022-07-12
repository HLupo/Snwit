import { Schema, model } from "mongoose";

export interface IPost {
    content: string;
    authorId: string;
    createdAt: Date;
    likes: string[];
    comments: string[];
    retweets: string[];
    authorAddress: string;
}

const postSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        type: String,
    }],
    retweets: [{
        type: Schema.Types.ObjectId,
        ref: "Retweet",
    }],
});

export const Post = model<IPost>('Post', postSchema);