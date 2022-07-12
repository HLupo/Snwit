// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => uint256[]) public userOwnedTokens;
    mapping(uint256 => uint256) public tokenIsAtIndex;

    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        console.log("Minting, current count:", _tokenIds.current());
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        userOwnedTokens[recipient].push(newItemId);
        uint256 arrayLength = userOwnedTokens[msg.sender].length;
        tokenIsAtIndex[newItemId] = arrayLength;
        console.log("Minted:", _tokenIds.current());

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // Get owner address of the token
    function getOwner(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    // Get token owned by the caller
    // function getTokens() public view returns (uint256[]) {
    //     return getTokensByOwner(msg.sender);
    // }

    // Check if a token is owned by the caller.
    function isOwner(uint256 tokenId) public view returns (bool) {
        return msg.sender == getOwner(tokenId);
    }

    // Get token owned by the caller
    function getTokensByOwner(address owner)
        public
        view
        returns (uint256[] memory)
    {
        return userOwnedTokens[owner];
    }
}
