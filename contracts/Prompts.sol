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

    /// @notice Checks if oldId is an existing prompt
    /// @param oldId Id of the Prompt that is being branched
    modifier validOldId(uint oldId) {
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
    }

    /// @notice Mints prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function mintPrompt(string calldata newCid) external {
      _mintValidPrompt(newCid);
    }

    /// @notice Mints branch prompt
    /// @param newCid IPFS CID of the Prompt that is being minted
    function mintPrompt(string calldata newCid, uint oldId) external validOldId(oldId) {
      _mintValidPrompt(newCid);
      branches[oldId].push(counter);
    }

    /// @notice Returns number of branches for that specific promptId
    /// @param promptId Id of the specific Prompt
    function promptBranches(uint promptId) external view validOldId(promptId) returns(uint) {
      return branches[promptId].length;
    }

    /// @notice Returns MetadataURI for that specific tokenId
    /// @param tokenId Id of the specific Prompt
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("https://ipfs.io/ipfs/", promptCids[tokenId]));
    }
}