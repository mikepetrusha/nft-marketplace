// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract NFTMarket is
    ReentrancyGuard,
    AccessControlEnumerable,
    IERC721Receiver,
    IERC1155Receiver
{
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    enum TokenType {
        ERC1155,
        ERC721
    }

    struct MarketItem {
        uint itemId;
        address assetContract;
        uint256 tokenId;
        address seller;
        address owner;
        uint price;
        bool sold;
        TokenType tokenType;
        uint amount;
    }

    mapping(uint => MarketItem) private idToMarketItem;

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(AccessControlEnumerable, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC1155Receiver).interfaceId ||
            interfaceId == type(IERC721Receiver).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function createItem(
        address nftContract,
        uint tokenId,
        uint price,
        uint amount
    ) public {
        TokenType tokenType = getTokenType(nftContract);

        require(price > 0, "Price must be greater than 0");
        require(nftContract != address(0), "Invalid NFT contract address");
        require(tokenId > 0, "Invalid token ID");
        require(amount > 0, "Amount must be greater than 0");

        _itemIds.increment();
        uint itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            msg.sender,
            price,
            true,
            tokenType,
            amount
        );
        _itemsSold.increment();
    }

    function listItem(uint itemId, uint price, uint amount) public {
        require(price > 0, "Price must be greater than 0");
        require(itemId > 0, "Invalid token ID");
        require(amount > 0, "Amount must be greater than 0");

        idToMarketItem[itemId].sold = false;
        idToMarketItem[itemId].seller = msg.sender;
        idToMarketItem[itemId].price = price;
        idToMarketItem[itemId].amount = amount;

        if (idToMarketItem[itemId].tokenType == TokenType.ERC1155) {
            createItem(
                idToMarketItem[itemId].assetContract,
                idToMarketItem[itemId].tokenId,
                idToMarketItem[itemId].price,
                idToMarketItem[itemId].amount
            );
        }

        _itemsSold.decrement();
    }

    function buyItem(uint itemId, uint amount) public payable nonReentrant {
        require(
            msg.value >= idToMarketItem[itemId].price,
            "Error in contract: Incorrect price"
        );

        payable(idToMarketItem[itemId].seller).transfer(msg.value);
        transferListingTokens(
            idToMarketItem[itemId].seller,
            msg.sender,
            amount,
            idToMarketItem[itemId]
        );
        idToMarketItem[itemId].owner = msg.sender;
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
    }

    function getTokenType(
        address _assetContract
    ) internal view returns (TokenType tokenType) {
        if (
            IERC165(_assetContract).supportsInterface(
                type(IERC1155).interfaceId
            )
        ) {
            tokenType = TokenType.ERC1155;
        } else if (
            IERC165(_assetContract).supportsInterface(type(IERC721).interfaceId)
        ) {
            tokenType = TokenType.ERC721;
        } else {
            revert("token must be ERC1155 or ERC721.");
        }
    }

    function transferListingTokens(
        address _from,
        address _to,
        uint256 _quantity,
        MarketItem memory _listing
    ) internal {
        if (_listing.tokenType == TokenType.ERC1155) {
            IERC1155(_listing.assetContract).safeTransferFrom(
                _from,
                _to,
                _listing.tokenId,
                _quantity,
                ""
            );
        } else if (_listing.tokenType == TokenType.ERC721) {
            IERC721(_listing.assetContract).safeTransferFrom(
                _from,
                _to,
                _listing.tokenId
            );
        }
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = itemCount - _itemsSold.current();

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        uint currentIndex = 0;

        for (uint i = 1; i <= itemCount; i++) {
            if (!idToMarketItem[i].sold) {
                items[currentIndex] = idToMarketItem[i];
                currentIndex++;
            }
        }

        return items;
    }

    function fetchMyItems() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        MarketItem[] memory items = new MarketItem[](totalItemCount);
        uint itemCount = 0;

        for (uint i = 1; i <= totalItemCount; i++) {
            MarketItem storage currentItem = idToMarketItem[i];
            if (currentItem.owner == msg.sender) {
                items[itemCount] = currentItem;
                itemCount++;
            }
        }

        assembly {
            mstore(items, itemCount)
        }

        return items;
    }
}
