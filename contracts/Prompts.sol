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

    /// @dev Relates Prompt Ids to their respective price
    mapping (uint256 => uint256) public price;

    /// @notice Checks if tokenId is an existing Prompt
    modifier OnlyPromptOwner(uint256 tokenId){
        require(ownerOf(tokenId) == msg.sender);
        _;
    }

    /// @notice Checks if tokenId is for sale
    modifier HasPrice(uint256 tokenId){
        require(price[tokenId] > 0);
        _;
    }

    /// @notice Checks if oldId is an existing Prompt
    modifier validOldId(uint256 oldId) {
      require(oldId <= counter);
      _;
    }

    /// @dev Sets initial values for the ERC-721 standard
    constructor() ERC721("Prompts", "PRP") {}

    /// @dev Effectively mints Prompt
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
    function mintPrompt(string calldata newCid, uint256 oldId) external validOldId(oldId) {
      _mintValidPrompt(newCid);
      branches[oldId].push(counter);
    }

    /// @notice Returns number of branches for that specific promptId
    /// @param promptId Id of the specific Prompt
    function promptBranches(uint promptId) external view validOldId(promptId) returns(uint256) {
      return branches[promptId].length;
    }

    /// @notice Returns list of Prompts written by a specific address
    /// @param writerAddress Address of the specific writer
    function writerCollection(address writerAddress) external view returns(uint256[] memory) {
      return collections[writerAddress];
    }

    /// @notice Puts Prompt up for sale
    /// @param tokenId Id of the Prompt
    /// @param askPrice Asking Price
    function addSale(uint256 tokenId, uint256 askPrice) external OnlyPromptOwner(tokenId) {
      approve(address(this), tokenId);
      price[tokenId] = askPrice;
    }

    /// @notice Removes Prompt from sale
    /// @param tokenId Id of the Prompt
    function removeSale(uint256 tokenId) external OnlyPromptOwner(tokenId) HasPrice(tokenId) {
      approve(address(0), tokenId);
      price[tokenId] = 0;
    }

    /// @notice Buys Prompt
    /// @param tokenId Id of the Prompt    
    function buy(uint256 tokenId) payable external HasPrice(tokenId) {
        require(msg.value >= price[tokenId], "Not enough funds sent");
        require(msg.sender != ownerOf(tokenId));

        safeTransferFrom(ownerOf(tokenId), msg.sender, tokenId);
        payable(ownerOf(tokenId)).transfer(msg.value);
        price[tokenId] = 0;
    }

    /// @notice Returns Prompt's price if its up for sale
    /// @param tokenId Id of the Prompt
    function validPrice(uint256 tokenId) external view HasPrice(tokenId) returns (uint256) {
      require(getApproved(tokenId) == address(this));
      return price[tokenId];
    }

    /// @notice Returns MetadataURI for that specific tokenId
    /// @param tokenId Id of the specific Prompt
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("https://ipfs.io/ipfs/", promptCids[tokenId]));
    }
}