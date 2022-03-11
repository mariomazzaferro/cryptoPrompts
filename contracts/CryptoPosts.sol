// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title Crypto Posts
/// @author Mario Mazzaferro
/// @notice Manage Copyright Permissions through License Associated NFTs (LANs)
contract CryptoPosts is ERC721 {
    /// @notice Tracks number of minted tokens
    uint256 public counter;

    /// @notice Stores Post's data
    struct Post {
        string cid;
        address author;
        uint256[] comments;
        uint256[] tokens;
    }

    /// @notice Stores Auction's data
    struct Auction {
        uint256 tokenId;
        address payable seller;
        uint256 minValue;
        uint256 increment;
        uint256 endBlock;
        address topBidder;
        uint256[] bids;
    }

    /// @notice List of all Posts ordered by Post Id ascending order
    Post[] public posts;

    /// @notice List of all Auctions ordered by Auction Id ascending order
    Auction[] public auctions;

    /// @notice Relates Writer's Address to its respective Post Collection
    mapping(address => uint256[]) public collections;

    /// @notice Relates token Id to its respective Post
    mapping(uint256 => uint256) public tokenPost;

    /// @notice Relates token Id to its respective price
    mapping(uint256 => uint256) public price;

    /// @notice Relates token Ids to their historic Auction Ids
    mapping(uint256 => uint256[]) public tokenAuctions;

    /// @notice Relates Auction Id to it's mapping of bidders to funds
    mapping(uint256 => mapping(address => uint256)) public funds;

    /// @notice Checks if msg.sender owns tokenId
    modifier OnlyTokenOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "You don't own this token");
        _;
    }

    /// @notice Checks if tokenId is for sale
    modifier HasPrice(uint256 tokenId) {
        require(price[tokenId] > 0, "This token is not for sale");
        _;
    }

    /// @notice Checks if postId is an existing Post
    modifier validPostId(uint256 postId) {
        require(postId < posts.length, "Invalid Post");
        _;
    }

    /// @notice Checks if auctionId is from a valid and ended Auction
    modifier EndedAuction(uint256 auctionId) {
        require(auctionId < auctions.length);
        require(auctions[auctionId].endBlock < block.number);
        _;
    }

    /// @notice Sets initial values for the ERC-721 standard
    constructor() ERC721("CryptoPosts", "CPT") {}

    /// @notice Returns MetadataURI for that specific tokenId
    /// @param tokenId Id of the specific Token
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            string(
                abi.encodePacked(
                    "https://ipfs.io/ipfs/",
                    posts[tokenPost[tokenId]].cid
                )
            );
    }

    /// @notice Effectively publishes Post
    /// @param newCid IPFS CID of the Post that is being published
    function _publishValidPost(string calldata newCid) private {
        collections[msg.sender].push(posts.length);
        uint256[] memory comments;
        uint256[] memory tokens;
        posts.push(Post(newCid, msg.sender, comments, tokens));
    }

    /// @notice Publishes Post
    /// @param newCid IPFS CID of the Post that is being published
    function publishPost(string calldata newCid) external {
        _publishValidPost(newCid);
    }

    /// @notice Publishes Comment Post
    /// @param newCid IPFS CID of the Post that is being published
    function publishPost(string calldata newCid, uint256 rootId)
        external
        validPostId(rootId)
    {
        posts[rootId].comments.push(posts.length);
        _publishValidPost(newCid);
    }

    /// @notice Mints token (License Associated NFT)
    /// @param postId Id of target Post to be used for token minting
    function mintToken(uint256 postId) external validPostId(postId) {
        require(msg.sender == posts[postId].author);
        _safeMint(msg.sender, counter);
        tokenPost[counter] = postId;
        posts[postId].tokens.push(counter);
        counter++;
    }

    /// @notice Returns length of the posts list
    function postsLenght() external view returns (uint256) {
        return posts.length;
    }

    /// @notice Returns IPFS CID of a specific postId
    /// @param postId Id of the specific Post
    function postCid(uint256 postId)
        external
        view
        validPostId(postId)
        returns (string memory)
    {
        return posts[postId].cid;
    }

    /// @notice Returns author of a specific postId
    /// @param postId Id of the specific Post
    function postAuthor(uint256 postId)
        external
        view
        validPostId(postId)
        returns (address)
    {
        return posts[postId].author;
    }

    /// @notice Returns number of comments for that specific postId
    /// @param postId Id of the specific Post
    function postComments(uint256 postId)
        external
        view
        validPostId(postId)
        returns (uint256)
    {
        return posts[postId].comments.length;
    }

    /// @notice Returns list of comments for that specific postId
    /// @param postId Id of the specific Post
    function postCommentList(uint256 postId)
        external
        view
        validPostId(postId)
        returns (uint256[] memory)
    {
        return posts[postId].comments;
    }

    /// @notice Returns Id of a specific Comment
    /// @param postId Id of the specific Post
    /// @param commentNumber Number of the specific Comment
    function commentId(uint256 postId, uint256 commentNumber)
        external
        view
        validPostId(postId)
        returns (uint256)
    {
        return posts[postId].comments[commentNumber];
    }

    /// @notice Returns number of tokens for that specific postId
    /// @param postId Id of the specific Post
    function postTokens(uint256 postId)
        external
        view
        validPostId(postId)
        returns (uint256)
    {
        return posts[postId].tokens.length;
    }

    /// @notice Returns list of tokens for that specific postId
    /// @param postId Id of the specific Post
    function postTokenList(uint256 postId)
        external
        view
        validPostId(postId)
        returns (uint256[] memory)
    {
        return posts[postId].tokens;
    }

    /// @notice Returns list of Posts written by a specific address
    /// @param authorAddress Address of the specific author
    function authorCollection(address authorAddress)
        external
        view
        returns (uint256[] memory)
    {
        return collections[authorAddress];
    }

    /// @notice Puts token up for sale
    /// @param tokenId Id of the token
    /// @param askPrice Asking Price
    function addSale(uint256 tokenId, uint256 askPrice)
        external
        OnlyTokenOwner(tokenId)
    {
        approve(address(this), tokenId);
        price[tokenId] = askPrice;
    }

    /// @notice Removes token from sale
    /// @param tokenId Id of the token
    function removeSale(uint256 tokenId)
        external
        OnlyTokenOwner(tokenId)
        HasPrice(tokenId)
    {
        approve(address(0), tokenId);
        price[tokenId] = 0;
    }

    /// @notice Buys token
    /// @param tokenId Id of the token
    function buy(uint256 tokenId) external payable HasPrice(tokenId) {
        require(msg.value >= price[tokenId], "Not enough funds sent");
        require(msg.sender != ownerOf(tokenId), "You already own this token");
        price[tokenId] = 0;
        payable(ownerOf(tokenId)).transfer(msg.value);
        IERC721(address(this)).safeTransferFrom(
            ownerOf(tokenId),
            msg.sender,
            tokenId
        );
    }

    /// @notice Returns token's price if its up for sale
    /// @param tokenId Id of the token
    function validPrice(uint256 tokenId)
        external
        view
        HasPrice(tokenId)
        returns (uint256)
    {
        require(getApproved(tokenId) == address(this));
        return price[tokenId];
    }

    /// @notice Initiates auction
    /// @param tokenId Id of the token being auctioned
    /// @param minValue Minimal value accepted
    /// @param increment Minimal incremental value
    function startAuction(
        uint256 tokenId,
        uint256 minValue,
        uint256 increment
    ) external OnlyTokenOwner(tokenId) {
        require(price[tokenId] == 0, "Token is already for sale");
        transferFrom(msg.sender, address(this), tokenId);
        uint256[] memory bids;
        tokenAuctions[tokenId].push(auctions.length);
        auctions.push(
            Auction(
                tokenId,
                payable(msg.sender),
                minValue,
                increment,
                (block.number + 270000),
                address(0),
                bids
            )
        );
    }

    /// @notice Places a bid for a specific Auction
    /// @param auctionId Id of the specific Auction
    function placeBid(uint256 auctionId) external payable {
        require(auctions.length > auctionId);
        require(auctions[auctionId].endBlock > block.number);
        require(msg.sender != auctions[auctionId].seller);
        require(msg.sender != auctions[auctionId].topBidder);
        if (auctions[auctionId].bids.length > 0) {
            require(
                msg.value + funds[auctionId][msg.sender] >=
                    auctions[auctionId].bids[
                        auctions[auctionId].bids.length - 1
                    ] +
                        auctions[auctionId].increment
            );
        } else {
            require(msg.value >= auctions[auctionId].minValue);
        }
        funds[auctionId][msg.sender] += msg.value;
        auctions[auctionId].topBidder = msg.sender;
        auctions[auctionId].bids.push(funds[auctionId][msg.sender]);
    }

    /// @notice Withdraw Auction funds for those who are not the topBidder
    /// @param auctionId Id of the specific Auction
    function withdrawFunds(uint256 auctionId) external EndedAuction(auctionId) {
        require(msg.sender != auctions[auctionId].topBidder);
        require(funds[auctionId][msg.sender] > 0);
        uint256 fund = funds[auctionId][msg.sender];
        funds[auctionId][msg.sender] = 0;
        payable(msg.sender).transfer(fund);
    }

    /// @notice Withdraw Auction assets for the topBidder and seller
    /// @param auctionId Id of the specific Auction
    function withdrawPrize(uint256 auctionId) external EndedAuction(auctionId) {
        require(
            msg.sender == auctions[auctionId].seller ||
                msg.sender == auctions[auctionId].topBidder
        );
        if (auctions[auctionId].topBidder != address(0)) {
            require(funds[auctionId][auctions[auctionId].topBidder] != 0);
            uint256 fund = funds[auctionId][auctions[auctionId].topBidder];
            funds[auctionId][auctions[auctionId].topBidder] = 0;
            auctions[auctionId].seller.transfer(fund);
            IERC721(address(this)).safeTransferFrom(
                address(this),
                auctions[auctionId].topBidder,
                auctions[auctionId].tokenId
            );
        } else {
            IERC721(address(this)).safeTransferFrom(
                address(this),
                auctions[auctionId].seller,
                auctions[auctionId].tokenId
            );
        }
    }

    /// @notice Returns list of historic Auction Ids for that token Id
    /// @param tokenId Id of the token being queried
    function tokenAuctionCollection(uint256 tokenId)
        external
        view
        returns (uint256[] memory)
    {
        return tokenAuctions[tokenId];
    }

    /// @notice Returns length of auctions
    function auctionsLenght() external view returns (uint256) {
        return auctions.length;
    }

    /// @notice Returns token Id of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionTokenId(uint256 auctionId) external view returns (uint256) {
        return auctions[auctionId].tokenId;
    }

    /// @notice Returns seller's address of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionSeller(uint256 auctionId) external view returns (address) {
        return auctions[auctionId].seller;
    }

    /// @notice Returns minValue of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionMinValue(uint256 auctionId)
        external
        view
        returns (uint256)
    {
        return auctions[auctionId].minValue;
    }

    /// @notice Returns increment of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionIncrement(uint256 auctionId)
        external
        view
        returns (uint256)
    {
        return auctions[auctionId].increment;
    }

    /// @notice Returns blocks left (~time left) of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionTimeLeft(uint256 auctionId)
        external
        view
        returns (uint256)
    {
        if (auctions[auctionId].endBlock > block.number) {
            return (auctions[auctionId].endBlock - block.number);
        } else {
            return 0;
        }
    }

    /// @notice Returns topBidder's address of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionTopBidder(uint256 auctionId)
        external
        view
        returns (address)
    {
        return auctions[auctionId].topBidder;
    }

    /// @notice Returns list of bids of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionBids(uint256 auctionId)
        external
        view
        returns (uint256[] memory)
    {
        return auctions[auctionId].bids;
    }
}
