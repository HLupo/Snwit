import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    address: string;
    email: string;
    password: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
    findByEmail(email: string): Promise<IUser>;
    findByAddress(address: string): Promise<IUser>;
    findByEmailAndPassword(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
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

//find user by email
userSchema.methods.findByEmail = async function (email: string) {
    const user = await this.findOne({ email: email });
    return user;
}

// find user by email and password
userSchema.methods.findByEmailAndPassword = async function (email: string, password: string) {
    const user = await this.findOne({ email: email, password: password });
    return user;
}

// find user by address
userSchema.methods.findByAddress = async function (address: string) {
    const user = await User.findOne({ address: address });
    return user;
}

export const User = model<IUser>('User', userSchema);