// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title Contract for minting Prompt NFTs 
/// @author Mario Mazzaferro
/// @notice Allows users to mint Prompt NFTs and manage their IPFS CIDs and branches
contract Prompts is ERC721 {

    /// @notice Tracks number of minted Prompts
    uint256 public counter;

    /// @notice Stores auction's data
    struct Auction {
      uint256 promptId;
      address payable seller;
      uint256 minValue;
      uint256 increment;
      uint256 endBlock;
      address topBidder;
      uint256[] bids;
    }

    /// @notice List of all auctions ordered by Auction Id ascending order
    Auction[] public auctions;

    /// @notice Relates Prompt Ids to their respective IPFS CIDs
    mapping(uint256 => string) public promptCids;

    /// @notice Relates Prompt Ids to their respective branch lists
    mapping(uint256 => uint256[]) public branches;

    /// @notice Relates Writers' Addresses to their respective Prompt Collections
    mapping(address => uint256[]) public collections;

    /// @notice Relates Prompt Ids to their respective price
    mapping (uint256 => uint256) public price;

    /// @notice Relates Auction Id to it's mapping of bidders to funds
    mapping(uint256 => mapping(address => uint256)) public funds;

    /// @notice Relates Prompt Ids to their historic Auction Ids
    mapping(uint256 => uint256[]) public promptAuctions;

    /// @notice Checks if promptId is an existing Prompt
    modifier OnlyPromptOwner(uint256 promptId){
        require(ownerOf(promptId) == msg.sender, "You don't own this Prompt");
        _;
    }

    /// @notice Checks if promptId is for sale
    modifier HasPrice(uint256 promptId){
        require(price[promptId] > 0, "This Prompt is not for sale");
        _;
    }

    /// @notice Checks if rootId is an existing Prompt
    modifier validRootId(uint256 rootId) {
      require(rootId <= counter, "Invalid Root Prompt");
      _;
    }

    /// @notice Checks if auctionId is from a valid and ended Auction
    modifier EndedAuction(uint256 auctionId) {
      require(auctions.length > auctionId);
      require(auctions[auctionId].endBlock < block.number);
      _;
    }

    /// @notice Sets initial values for the ERC-721 standard
    constructor() ERC721("Prompts", "PRP") {}

    /// @notice Returns MetadataURI for that specific promptId
    /// @param promptId Id of the specific Prompt
    function tokenURI(uint256 promptId) public view override returns (string memory) {
        require(_exists(promptId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("https://ipfs.io/ipfs/", promptCids[promptId]));
    }

    /// @notice Effectively mints Prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function _mintValidPrompt(string calldata newCid) private {
      counter++;
      _safeMint(msg.sender, counter);
      promptCids[counter] = newCid;
      collections[msg.sender].push(counter);
    }

    /// @notice Mints Prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function mintPrompt(string calldata newCid) external {
      _mintValidPrompt(newCid);
    }

    /// @notice Mints branch Prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function mintPrompt(string calldata newCid, uint256 rootId) external validRootId(rootId) {
      _mintValidPrompt(newCid);
      branches[rootId].push(counter);
    }

    /// @notice Returns number of branches for that specific promptId
    /// @param promptId Id of the specific Prompt
    function promptBranches(uint promptId) external view validRootId(promptId) returns(uint256) {
      return branches[promptId].length;
    }

    /// @notice Returns list of Prompts written by a specific address
    /// @param writerAddress Address of the specific writer
    function writerCollection(address writerAddress) external view returns(uint256[] memory) {
      return collections[writerAddress];
    }

    /// @notice Puts Prompt up for sale
    /// @param promptId Id of the Prompt
    /// @param askPrice Asking Price
    function addSale(uint256 promptId, uint256 askPrice) external OnlyPromptOwner(promptId) {
      approve(address(this), promptId);
      price[promptId] = askPrice;
    }

    /// @notice Removes Prompt from sale
    /// @param promptId Id of the Prompt
    function removeSale(uint256 promptId) external OnlyPromptOwner(promptId) HasPrice(promptId) {
      approve(address(0), promptId);
      price[promptId] = 0;
    }

    /// @notice Buys Prompt
    /// @param promptId Id of the Prompt    
    function buy(uint256 promptId) payable external HasPrice(promptId) {
        require(msg.value >= price[promptId], "Not enough funds sent");
        require(msg.sender != ownerOf(promptId), "You already own this Prompt");
        price[promptId] = 0;
        payable(ownerOf(promptId)).transfer(msg.value);
        IERC721(address(this)).safeTransferFrom(ownerOf(promptId), msg.sender, promptId);
    }

    /// @notice Returns Prompt's price if its up for sale
    /// @param promptId Id of the Prompt
    function validPrice(uint256 promptId) external view HasPrice(promptId) returns (uint256) {
      require(getApproved(promptId) == address(this));
      return price[promptId];
    }

    /// @notice Initiates auction
    /// @param promptId Id of the Prompt being auctioned
    /// @param minValue Minimal value accepted
    /// @param increment Minimal incremental value
    function startAuction(uint256 promptId, uint256 minValue, uint256 increment) external OnlyPromptOwner(promptId) {
      require(price[promptId] == 0, "Prompt is already for sale");
      transferFrom(msg.sender, address(this), promptId);
      uint256[] memory bids;
      promptAuctions[promptId].push(auctions.length);
      auctions.push(Auction(promptId, payable(msg.sender), minValue, increment, (block.number+300), address(0), bids));
    }

    /// @notice Places a bid for a specific Auction
    /// @param auctionId Id of the specific Auction
    function placeBid(uint256 auctionId) external payable {
      require(auctions.length > auctionId);
      require(auctions[auctionId].endBlock > block.number);
      require(msg.sender != auctions[auctionId].seller);
      require(msg.sender != auctions[auctionId].topBidder);
      if(auctions[auctionId].bids.length > 0) {
        require(msg.value + funds[auctionId][msg.sender] >= auctions[auctionId].bids[auctions[auctionId].bids.length-1] + auctions[auctionId].increment);
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
      require(msg.sender == auctions[auctionId].seller || msg.sender == auctions[auctionId].topBidder);
      if(auctions[auctionId].topBidder != address(0)) {
        require(funds[auctionId][auctions[auctionId].topBidder] != 0);
        uint256 fund = funds[auctionId][auctions[auctionId].topBidder];
        funds[auctionId][auctions[auctionId].topBidder] = 0;
        auctions[auctionId].seller.transfer(fund);
        IERC721(address(this)).safeTransferFrom(address(this), auctions[auctionId].topBidder, auctions[auctionId].promptId);
      } else {
        IERC721(address(this)).safeTransferFrom(address(this), auctions[auctionId].seller, auctions[auctionId].promptId);
      }
    }

    /// @notice Returns list of historic Auction Ids for that Prompt Id
    /// @param promptId Id of the Prompt being queried
    function promptAuctionCollection(uint256 promptId) external view returns(uint256[] memory) {
      return promptAuctions[promptId];
    }

    /// @notice Returns length of auctions
    function auctionsLenght() external view returns(uint256) {
      return auctions.length;
    }

    /// @notice Returns Prompt Id of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionPromptId(uint256 auctionId) external view returns(uint256) {
      return auctions[auctionId].promptId;
    }

    /// @notice Returns seller's address of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionSeller(uint256 auctionId) external view returns(address) {
      return auctions[auctionId].seller;
    }

    /// @notice Returns minValue of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionMinValue(uint256 auctionId) external view returns(uint256) {
      return auctions[auctionId].minValue;
    }

    /// @notice Returns increment of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionIncrement(uint256 auctionId) external view returns(uint256) {
      return auctions[auctionId].increment;
    }

    /// @notice Returns blocks left (~time left) of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionTimeLeft(uint256 auctionId) external view returns(uint256) {
      if(auctions[auctionId].endBlock > block.number) {
        return (auctions[auctionId].endBlock - block.number);
      } else {
        return 0;
      }   
    }

    /// @notice Returns topBidder's address of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionTopBidder(uint256 auctionId) external view returns(address) {
      return auctions[auctionId].topBidder;
    }

    /// @notice Returns list of bids of the auctionId
    /// @param auctionId Id of the Auction being queried
    function auctionBids(uint256 auctionId) external view returns(uint256[] memory) {
      return auctions[auctionId].bids;
    }
}