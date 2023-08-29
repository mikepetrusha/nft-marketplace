// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract ERC1155NFT is ERC1155URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public contractAddress;

    event tokenCreated (
        uint indexed itemId
    );

    constructor(address marketplaceAddress) ERC1155("") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId, 1, "");
        _setURI(newItemId, tokenURI);
        emit tokenCreated(newItemId);
    }

    function approveForMarketplace(uint256 tokenId) public {
        require(balanceOf(msg.sender, tokenId) > 0, "Not owner of the token");

        setApprovalForAll(contractAddress, true);
    }
}