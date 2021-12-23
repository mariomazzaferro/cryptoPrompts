// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title Contract for minting Prompt NFTs 
/// @author Mario Mazzaferro
/// @notice Allows users to mint Prompt NFTs and manage their IPFS CIDs and branches
contract Prompts is ERC721 {

    /// @notice Tracks number of minted Prompts
    uint256 public counter;

    /// @notice Relates Prompt Ids to their respective IPFS CIDs
    mapping(uint256 => string) public promptCids;

    /// @dev Relates Prompt Ids to their respective branch lists
    mapping(uint256 => uint256[]) public branches;

    /// @dev Relates Writers' Addresses to their respective Prompt Collections
    mapping(address => uint256[]) public collections;


    mapping (uint256 => uint256) public price;

    modifier OnlyPromptOwner(uint256 tokenId){
        require(ownerOf(tokenId) == msg.sender);
        _;
    }

    modifier IsForSale(uint256 tokenId){
        require(price[tokenId] > 0, "Item is not for sale");
        _;
    }

    /// @notice Checks if oldId is an existing prompt
    /// @param oldId Id of the Prompt that is being branched
    modifier validOldId(uint256 oldId) {
      require(oldId <= counter);
      _;
    }

    /// @dev Sets initial values for the ERC-721 standard
    constructor() ERC721("Prompts", "PRP") {}

    /// @dev Effectively mints prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function _mintValidPrompt(string calldata newCid) private {
      counter++;
      _safeMint(msg.sender, counter);
      promptCids[counter] = newCid;
      collections[msg.sender].push(counter);
    }

    /// @notice Mints prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function mintPrompt(string calldata newCid) external {
      _mintValidPrompt(newCid);
    }

    /// @notice Mints branch prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function mintPrompt(string calldata newCid, uint256 oldId) external validOldId(oldId) {
      _mintValidPrompt(newCid);
      branches[oldId].push(counter);
    }

    /// @notice Returns number of branches for that specific promptId
    /// @param promptId Id of the specific Prompt
    function promptBranches(uint promptId) external view validOldId(promptId) returns(uint256) {
      return branches[promptId].length;
    }

    /// @notice Returns list of prompts written by a specific address
    /// @param writerAddress Address of the specific writer
    function writerCollection(address writerAddress) external view returns(uint256[] memory) {
      return collections[writerAddress];
    }

    function addSale(uint256 tokenId, uint256 askPrice) OnlyPromptOwner(tokenId) external {
      require(price[tokenId] == 0);
      approve(address(this), tokenId);
      price[tokenId] = askPrice;
    }

    function removeSale(uint256 tokenId) OnlyPromptOwner(tokenId) IsForSale(tokenId) external {
      price[tokenId] = 0;
    }

    function buy(uint256 tokenId) payable external IsForSale(tokenId) {
        require(msg.value >= price[tokenId], "Not enough funds sent");
        require(msg.sender != ownerOf(tokenId));

        safeTransferFrom(payable(ownerOf(tokenId)), msg.sender, tokenId);
        payable(ownerOf(tokenId)).transfer(msg.value);
        price[tokenId] = 0;
    }

    /// @notice Returns MetadataURI for that specific tokenId
    /// @param tokenId Id of the specific Prompt
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("https://ipfs.io/ipfs/", promptCids[tokenId]));
    }
}