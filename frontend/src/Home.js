import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Home = ({accounts, connectMetamask}) => {

    return (
      <Container className="text-center">
        {
          accounts.length === 0 ?
          <div>
          <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>Welcome to Crypto Prompts!</h3>
            <br/>
            <h4>Click on <i>FEED</i> and enjoy the reading. Don't mind the fox, he is handling security...</h4>
            <br/>
            <h4>Click on BRΛNCHES to read parallel branches...</h4>
            <br/>
            <h4>Click on SΛLES for auctions, fixed price sales and transfers...</h4>
            <br/>
            <h4>Click on ΛBOUT to get more information...</h4>
            <br/>
            <h4>If you want to buy, sell or create your own Literary NFTs:</h4>
            <h4><a href="https://metamask.io/">install Metamask</a> + <a href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844">connect it to Polygon</a> + <a href='#' onClick={() => connectMetamask()}>connect to this site</a>!</h4>
            <br/>
            <h2><i>"What we write in life echoes in eternity."</i></h2>
          </Card>
          <br/>
          </div>
          :
          <div>
          <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>Welcome to Crypto Prompts!</h3>
            <br/>
            <h4>Click on <i>FEED</i> and enjoy the reading. Don't mind the fox, he is handling security...</h4>
            <br/>
            <h4>Click on <i>NEW</i> and create a Prompt from scratch OR branch an existing Prompt on <i>FEED</i>...</h4>
            <br/>
            <h4>Click on BRΛNCHES to read parallel branches...</h4>
            <br/>
            <h4>Click on SΛLES for auctions, fixed price sales and transfers...</h4>
            <br/>
            <h4>Click on ΛBOUT to get more information...</h4>
            <br/>
            <h2><i>"What we write in life echoes in eternity."</i></h2>
          </Card>
          <br/>
          </div>
        }
        <Card className="shadow-lg p-3 bg-white rounded text-center" style={{ width: 'auto' }}>
            <h3>WHITE PΛPER</h3>
            <br/>
            <br/>
            <h5>Context</h5>
            <br/>
            <p>Historically, writers have never had so many resources for creating and publishing their work like today. From papyrus to parchment and paper. From Gutenberg to Turing. Finally Web1 and Web2 made every previous step of the progression seem extremely primitive. Λnd yet, we still face some limitations even with Web2. The more pressing ones: censorship, copyright enforcements, the burocracy and politics of the publishing industry...</p>
            <p>Crypto Prompts is a tool that seeks to empower writers and wanna-be writers even more in the next step of the evolution: Web3.</p>
            <p>In order to give some context: there is a subreddit called <a href="https://www.reddit.com/r/WritingPrompts/">Writing Prompts</a>, where millions of writers contribute to create new content. Users publish their stories and essays in a colaborative way to practice everyone's writing skills, motivate each other and stimulate creativity. It is an awesome community. Nevertheless, users have no effective way to profit from their creative work and are subject to Reddit's censorship.
            Crypto Prompts is the implementation of Writing Prompts' content creation dynamic in the Polygon Network (Blockchain). Here, Prompts are ERC-721 Non-Fungible Tokens that can be sold, auctioned or used to create new Prompts.</p>
            <br/>
            <br/>
            <h5>Mission</h5>
            <br/>
            <p>- Λttribute practical ownership and authorship to creative content.</p>
            <p>- Empower writers by making their journey more profitable and trackable.</p>
            <p>- Secure creative content from censorship.</p>
            <p>- Stimulate colaborative writing.</p>
            <br/>
            <br/>
            <h5>Infrastructure</h5>
            <br/>
            <p>The Crypto Prompts' infrastructure is 100% decentralized (IPFS + smart contract) and its <a href="https://github.com/mariomazzaferro/cryptoPrompts/">code</a> is open source. This Project seeks no profit, everything you pay is spent exclusively on blockchain fees. Our inspiration is the Writing Prompts subreddit, with its literary appeal, but there are no rules here, you can write whatever you want. There can be "question Prompts", making the branching dynamic similar to Quora. There can be "discussion Prompts", tilting more towards Twitter's dynamic. Go crazy, you can mint an entire novel if you dare. There are endless possibilities for new Prompts, it's impossible to guess all of them now, the best way to predict the future is by writing it.</p>
            <p>Notice that the fee for minting Prompts does NOT depend on the size of the text. Minting a short poem will cost you the same as minting an entire novel. We can thank the <a href="https://en.wikipedia.org/wiki/InterPlanetary_File_System">InterPlanetary File System (IPFS)</a> for that.</p>
            <br/>
            <br/>
            <h5>Usability</h5>
            <br/>
            <p>Readers are able to interact with the site without a crypto wallet. But in order to mint and manage your own Prompts you will need to <a href="https://metamask.io/">install Metamask</a> on your browser.</p>
            <p>Prompts have an ever growing nature. Λnyone can branch any existing Prompt into a new Prompt in the same way anyone can comment a social media post. If we are talking about a story: the Root Prompt can be branched into several parallel storylines. Each of these individual contributions becomes a new Prompt.</p>
            <p>Whenever someone branches a Prompt into a new one: the content of the Root Prompt is copied into the Branch Prompt followed by the lambda standard ("Λ") and then the new content. The title of the Root Prompt does not appear in the Branch Prompt.</p>
            <p>There are two ways to buy/sell Prompts in this platform: (1) auctions and (2) fixed price sales. Λuctions have a fixed duration of 1 week, in which buyers bid MΛTIC cumulatively until the week comes to an end. Once the auction is over every stakeholder can withdraw their rightful resources. If you are a Bidder but not the Top Bidder: you can simply withdraw your funds. If you are the Top Bidder or the Seller: both of you share the action to withdraw the prize, once either of you takes that action the Top Bid will be transfered to the Seller and the Prompt auctioned will be transfered to the Top Bidder.</p>
            <br/>
            <br/>
            <h5>Regarding Prompts</h5>
            <br/>
            <p>The highest is the youngest.</p>
            <p>Not all of them are branches.</p>
            <p>Not all of them are roots.</p>
            <p>Roots have growing branches.</p>
            <p>Some branches become roots.</p>
        </Card>
        <br/>
        <br/> 
      </Container>
    )
};

export default Home;