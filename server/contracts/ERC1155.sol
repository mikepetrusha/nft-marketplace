// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract ERC1155NFT is ERC1155URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event TokenCreated(uint indexed itemId);

    constructor() ERC1155("") {}

    function createToken(string memory tokenURI, uint amount) public {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId, amount, "");
        _setURI(newItemId, tokenURI);
        emit TokenCreated(newItemId);
    }
}
