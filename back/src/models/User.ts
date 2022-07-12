import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { Post } from "./Post";

export interface IUser {
    address: string;
    email: string;
    username: string;
    password: string;
    bio: string;
    pseudo: string;

    findByEmail(email: string): Promise<IUser>;
    findByAddress(address: string): Promise<IUser>;
    comparePassword(candidatePassword: string): Promise<boolean>;
    findByAddressOrEmail(address: string, email: string): Promise<IUser>;
    findByAddressAndEmail(address: string, email: string): Promise<IUser>;
    findByEmailAndPassword(email: string, password: string): Promise<IUser>;
    findByAddressOrEmailOrUsername(address: string, email: string, username: string): Promise<IUser>;
    populatePosts(): Promise<IUser>;
    setBio(bio: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
}

const userSchema = new Schema({
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

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        return isMatch;
    } catch (err) {
        throw new Error(err);
    }
};

// set user bio 
userSchema.methods.setBio = async function (bio: string) {
    const user = this;
    user.bio = bio;
    return user.save();
}

//find user by email
userSchema.methods.findByEmail = async function (email: string) {
    const user = await User.findOne({ email: email });
    return user;
}

// find user by address
userSchema.methods.findByAddress = async function (address: string) {
    const user = await User.findOne({ address: address });
    return user;
}

// find user by email and password
userSchema.methods.findByEmailAndPassword = async function (email: string, password: string) {
    const user = await User.findOne({ email: email, password: password });
    return user;
}

// find user by address and email
userSchema.methods.findByAddressAndEmail = async function (address: string, email: string) {
    const user = await User.findOne({ address: address, email: email });
    return user;
}

// find user by address or email
userSchema.methods.findByAddressOrEmail = async function (address: string, email: string) {
    const user = await User.findOne({ $or: [{ address: address }, { email: email }] });
    return user;
}

// find user by address or email or username
userSchema.methods.findByAddressOrEmailOrUsername = async function (address: string, email: string, username: string) {
    const user = await User.findOne({ $or: [{ address: address }, { email: email }, { username: username }] });
    return user;
}

// find by objectId
userSchema.methods.findById = async function (id: string) {
    const user = await User.findById(id);
    return user;
}

// populate user with posts
userSchema.methods.populatePosts = async function () {
    const user = this;
    const posts = await Post.find({ authorId: user._id });
    user.posts = posts;
    return user;
}

export const User = model<IUser>('User', userSchema);