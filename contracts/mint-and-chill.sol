// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintAndChillNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Constructor to initialize the NFT contract
    constructor(
        string memory name, // Name of the NFT collection
        string memory symbol, // Symbol of the NFT collection
        address initialOwner // Initial owner of the contract
    ) ERC721(name, symbol) Ownable(initialOwner) {}

    // Function to mint a new NFT with a specific metadata URI
    function mintNFT(address to, string memory tokenURI) public onlyOwner {
        _tokenIdCounter.increment(); // Increment token ID
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId); // Mint the NFT to the specified address
        _setTokenURI(tokenId, tokenURI); // Set the metadata URI for the token
    }

    // Function to get the total number of minted NFTs
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
