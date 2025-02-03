// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintAndChillNFT is ERC721Enumerable, ERC721URIStorage, Ownable {

    // Constructor to initialize the NFT contract
    constructor(
        string memory name, // Name of the NFT collection
        string memory symbol, // Symbol of the NFT collection
        address initialOwner // Initial owner of the contract
    ) ERC721(name, symbol) Ownable(initialOwner) {}

    // Function to mint a new NFT with a specific metadata URI
    function mintNFT(address to, string memory uri) public onlyOwner {
        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Override supportsInterface to resolve conflict
    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Override _increaseBalance to resolve conflict
    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    // Override _update to resolve conflict
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    // Override tokenURI to resolve conflict
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // Function to get the list of token IDs owned by a specific address
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner); // Get the number of tokens owned
        uint256[] memory tokenIds = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i); // Get token ID by index
        }
        return tokenIds;
    }
}