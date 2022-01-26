# Project Name: CRYPTO PROMPTS

There is a subreddit called <a href="https://www.reddit.com/r/WritingPrompts/">r/WritingPrompts</a>, where millions of writers and wanna be writers contribute to create new content. Crypto Prompts is the implementation of that idea in the Polygon Network (blockchain). Here, Prompts are perpetual objects carved into the
blockchain, allowing the author to mint Non-Fungible Token Licenses
that can be sold, auctioned, transferred, etc. Furthermore, users
can branch any published Prompt creating a "Branch Prompt" with
new content related to the "Root Prompt". Branch Prompts can be
branched as well.

## Overview

The millions of <a href="https://www.reddit.com/r/WritingPrompts/">Writing Prompts</a>' users post their Prompts and comments (Branches) on reddit with no effective way to profit from their creative work. They are using reddit simply as a training ground for their writing skills, a cooperative hub for feedbacks and motivation.

With that in mind, Crypto Prompts aims to:

- Attribute practical ownership and authorship to creative content.
- Empower writers by making their journey more profitable and trackable.
- Secure creative content from censorship.
- Stimulate colaborative writing.

Crypto Prompts seeks no profit, everything you pay in this platform is spent exclusively on blockchain fees and Prompt token trades. This project is inspired by the Writing Prompts subreddit, with its literary appeal, but there are no rules here, you can write whatever you want. There can be question prompts, making the branching dynamic similar to Quora. There can be discussion prompts, tilting it more towards Twitter's dynamic. There are endless possibilities for new prompts, it's impossible to guess all of them now, the best way to predict the future is by writing it.

## User Workflow

1- User registers on the site (using metamask).<br/>
2- User publishes an initial Prompt or a Branch Prompt.<br/>
3- User can read other people's Prompts and publish Branch Prompts of them.<br/>
4- User can read other people's Prompts and each of its Branches.<br/>
5- User can transfer, buy, sell or auction Prompt tokens.<br/>

## Development

The Prompt texts are stored in IPFS and only the IPFS CIDs are stored in the smart contract. The backend is 100% decentralized (IPFS + smart contract).

The Crypto Prompts' smart contract inherit from OpenZeppelin's ERC-721 standard.

Crypto Prompts' Smart Contract Address (Polygon):
Crypto Prompts' Smart Contract Address (Mumbai):

## Directory structure

- contracts folder - Crypto Prompts' smart contract and its respective migration contract.

- frontend folder - Crypto Prompts' front end code that was built with React.js.

- migrations - Files used for truffle's migration steps.

- test - Folder containing outdated tests for the smart contract written in JavaScript.

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
