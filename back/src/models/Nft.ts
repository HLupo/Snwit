import { Schema, model } from "mongoose";

export interface INft {
    ownerAddress: string;
    tokenId: string;
    price: string;
}

const nftSchema = new Schema({
    ownerAddress: {
        type: String,
        required: true,
    },
    tokenId: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
});

export const Nft = model<INft>('Nft', nftSchema);