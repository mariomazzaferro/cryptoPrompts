# Project Name: CRYPTO PROMPTS

There is a subreddit called <a href="https://www.reddit.com/r/WritingPrompts/">r/WritingPrompts</a>, where millions of writers and wanna be writers contribute to create new content. Crypto Prompts is the implementation of that idea in the Polygon blockchain. Where prompts and branches are ERC-721 Non-Fungible Tokens that can be sold, transfered or used as prompt for other branches. Notice that every branch is also a prompt, but initial prompts are not branches.


## Overview

Right now, the millions of <a href="https://www.reddit.com/r/WritingPrompts/">r/WritingPrompts</a> users post their prompts and comments (branches) on reddit with no way to effectively profit from their creative work. They are using reddit simply as a training ground for their writing skills.

Having said that, the 2 main objectives of this dapp are:
- To attribute ownership to content created through this type of collaboration.
- To empower writers and wanna be writers, by making their journey more profitable and trackable.

Crypto Prompts seeks no profit, everything you pay in this platform is spent exclusively on blockchain fees. This project is inspired by the Writing Prompts subreddit, with its literary appeal, but there are no rules here, you can write whatever you want. There can be question prompts, making the branching dynamic similar to Quora. There can be discussion prompts, tilting it more towards Twitter's dynamic. There are endless possibilities for new prompts, it's impossible to guess all of them now, the best way to predict the futere is by writing it...

As a reader using Crypto Prompts: you are be able to read every prompt and each of its branches.
As a writer using Crypto Prompts: you are be able to write new initial prompts and new branches for any existing prompt.


## User Workflow

1- User registers on the site (using metamask).<br/>
2- User writes an initial prompt or a branch and mints it (signed transaction).<br/>
3- User can read other people's prompts and write branches of them.<br/>
4- User can read other people's prompts and each of its branches.<br/>


## Development

The prompt texts are stored in IPFS and only the IPFS CIDs are stored in the smart contract. The backend is 100% decentralized (IPFS + smart contract).

Crypto Prompt NFTs inherit from OpenZeppelin's ERC-721 standard.

This is a simple dapp, its core functionality implements two mappings: "promptCids" (relates Prompt Id to its IPFS CID) and "branches" (relates Prompt Id to its list of branches).


## Directory structure

- contracts folder - Crypto Prompts smart contract and its respective migration contract.

- frontend folder - Front end code for Crypto Prompts that was built with React.js.

- migrations - Files used for truffle's migration steps.

- test - Folder containing tests for the smart contract written in JavaScript.


## Building and running the project locally

1. Clone this repo to your local environment. Run `git clone https://github.com/mariomazzaferro/cryptoPrompts.git`
2. Enter the repo. Run `cd cryptoPrompts`
3. Install root dependencies. Run `npm install`
4. Initialize Ganache. Run `truffle develop`
5. Run unit tests on default port 9545. Run `truffle test`
6. Deploy contracts locally. Run `truffle migrate --reset`
7. Open a NEW terminal tab and enter frontend folder. Run `cd frontend`
8. Install frontend dependencies. Run `npm install`
9. Create .env file inside frontend folder with REACT_APP_NFTSTORAGE_API_KEY = <NFTSTORAGE_API_KEY> (you can create a new NFT Storage API Key on <a href="https://nft.storage/">https://nft.storage/</a>)
10. Once installation is complete, from within the frontend folder run `npm start` to launch the front-end.
