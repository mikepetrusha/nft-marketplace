// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract ERC721NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public contractAddress;

    event tokenCreated (
        uint indexed itemId
    );

    constructor(address marketplaceAddress) ERC721("MyNFT", "MNFT") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit tokenCreated(newItemId);
    }

    function approveForMarketplace(uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");

        approve(contractAddress, tokenId);
    }
}

