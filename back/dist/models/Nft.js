"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const mongoose_1 = require("mongoose");
const nftSchema = new mongoose_1.Schema({
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
exports.Nft = (0, mongoose_1.model)('Nft', nftSchema);
//# sourceMappingURL=Nft.js.map