// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public contractAddress;

    constructor(address marketplaceAddress) ERC1155("") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId, 1, "");
        _setURI(tokenURI);
        
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}