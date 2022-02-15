# Project Name: CRYPTO PROMPTS (<a href="https://www.cryptoprompts.art/">cryptoprompts.art</a>)

There is a subreddit called <a href="https://www.reddit.com/r/WritingPrompts/">r/WritingPrompts</a>, where millions of writers and wanna-be writers collaboratively publish their stories and essays to practice everyone's writing skills, motivate each other and stimulate creativity. Writers can have patreons start to support them, as well as gain visibility and engagement to the point of getting book deals and other career opportunities.

Nevertheless, these profitable cases tend to be exceptions and not the rule. The publishing industry (like any other industry) has its intrinsic limitations. And as such, there are thresholds that most wanna-be writers never get to cross. With that in mind, Crypto Prompts should be seen as an alternative path. A writing marketplace that circumvents the traditional publishing pipeline, allowing authors to freely negotiate copyright permissions to their creative work without intermediaries.

Crypto Prompts implements Writing Prompts' content creation dynamic in the Polygon Network (Blockchain). Here, Prompts are perpetual objects carved into the blockchain, allowing the author to mint Non-Fungible Token Licenses that can be sold, auctioned, transferred, etc. Furthermore, users can comment any published Prompt creating a "Comment Prompt" with new content related to the "Root Prompt". Comment Prompts can be commented as well.

## Overview

This platform is 100% decentralized (IPFS + smart contract), and its code is open source. Crypto Prompts seeks no profit; everything you pay is spent exclusively on blockchain fees and Prompt token trades. This project is inspired by the Writing Prompts subreddit, with its literary appeal, but there are no rules here; you can write whatever you want. There can be "question Prompts", making the content dynamic similar to Quora. There can be "discussion Prompts", tilting more towards Reddit's dynamic. Go crazy, you can publish an entire novel if you dare. There are endless possibilities for new Prompts, it's impossible to guess all of them now, the best way to predict the future is by writing it.

Crypto Prompts aims to:

- Attribute practical ownership and authorship to creative content.
- Empower writers by making their journey more profitable and trackable.
- Secure creative content from censorship.
- Stimulate colaborative writing.

## User Workflow

1- User registers on the site (using metamask).<br/>
2- User publishes an Initial Prompt or a Comment Prompt.<br/>
3- User can read other people's Prompts and publish Comment Prompts of them.<br/>
4- User can read other people's Prompts and each of its comments.<br/>
5- User can transfer, buy, sell or auction Prompt tokens.<br/>

## Development

The Prompt texts are stored in IPFS and only the IPFS CIDs are stored in the smart contract. The backend is 100% decentralized (IPFS + smart contract).

The Crypto Prompts' smart contract inherit from OpenZeppelin's ERC-721 standard.

Crypto Prompts' Smart Contract Address (Polygon):

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
