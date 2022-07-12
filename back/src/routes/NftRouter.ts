import express from "express";
import { ObjectId } from "mongodb";
import { Nft } from "../models/Nft";

require('dotenv').config();
const router = express.Router();

// Add nft
router.post("/nft", (req, res) => {
    const nft = new Nft({
        ownerAddress: req.body.ownerAddress,
        tokenId: req.body.tokenId,
        price: req.body.price,
    });
    console.log(nft)
    // Check if nft is already in database
    Nft.findOne({ tokenId: nft.tokenId }).then((results) => {
        if (results) {
            res.statusCode = 400;
            res.statusMessage = "Nft already exists";
            console.log("Nft already exists /nft");
            res.send();
        } else {
            nft.save()
                .then((result) => {
                    console.log("Nft created", result);
                    res.send(result);
                }).catch((err) => {
                    console.log("Nft not created", err);
                    res.send(err);
                });
        }
    });
});

// Get all nfts
router.get("/nfts", (req, res) => {
    Nft.find()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

// Remove nft
router.delete("/nft/:nftId", (req, res) => {
    // find nft by tokenid  
    Nft.deleteOne({ tokenId: req.params.nftId }).then((results) => {
        console.log("Nft deleted", results);
        res.send(results);
    }).catch((err) => {
        console.log("Nft not deleted", err);
        res.send(err);
    });
});

// get nft by owner address
router.get("/nft/:ownerAddress", (req, res) => {
    Nft.find({ ownerAddress: req.params.ownerAddress })
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

// get all nft of other owners
router.get("/nft/others/:ownerAddress", (req, res) => {
    console.log("Other owners nfts")
    Nft.find({ ownerAddress: { $ne: req.params.ownerAddress } })
        .then((result) => {
            console.log(result);
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
});

export default router;