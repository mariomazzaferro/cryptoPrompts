import React from 'react';
import { Container, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5>WRITING PROMPTS</h5>
        </Card.Title>
        <Card.Text>
          <p>There is a subreddit called <a href="https://www.reddit.com/r/WritingPrompts/">Writing Prompts</a>, where millions of writers contribute to create new content. Crypto Prompts is the implementation of that content creation dynamic in the Polygon Blockchain. Here, Prompts are ERC-721 Non-Fungible Tokens that can be sold, transfered or used as Prompts for new Branches. Notice that every Branch is a Prompt, but initial Prompts are not Branches. Furthermore, Roots are Prompts with at least one Branch.</p>
        </Card.Text>
        </Card.Body>
      </Card>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5>ERC-721 NFT STANDARD</h5>
        </Card.Title>
        <Card.Text>
          <p>Non-Fungible Tokens are used to identify something in a unique way, and to securely manage its ownership. This type of Token is perfect for platforms that offer collectible items or any other generic items. The ERC-721 is the main standard for NFTs in the crypto industry. The NFTs you create here (prompts and branches) are compatible with every NFT Marketplace.</p>
        </Card.Text>
        </Card.Body>
      </Card>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5>CRYPTO PROMPTS</h5>
        </Card.Title>
        <Card.Text>
          <p>The millions of <a href="https://www.reddit.com/r/WritingPrompts/">Writing Prompts</a> users post their prompts and comments (branches) on reddit with no effective way to profit from their creative work. They are using reddit simply as a training ground for their writing skills, a cooperative hub for feedbacks and motivation. With that in mind, Crypto Prompts aims to:</p>
          <p>- Attribute effective ownership to content created through this type of collaboration.</p>
          <p>- Empower writers and wanna be writers, by making their journey more profitable and trackable.</p>
          <p>This platform is 100% decentralized (IPFS + smart contract) and its <a href="https://github.com/mariomazzaferro/cryptoPrompts/">code</a> is open source. Crypto Prompts seeks no profit, everything you pay is spent exclusively on blockchain fees. This project is inspired by the Writing Prompts subreddit, with its literary appeal, but there are no rules here, you can write whatever you want. There can be "question Prompts", making the branching dynamic similar to Quora. There can be "discussion Prompts", tilting more towards Twitter's dynamic. Go crazy, you can mint an entire novel if you dare. There are endless possibilities for new Prompts, it's impossible to guess all of them now, the best way to predict the future is by writing it.</p>
          <p>Crypto Prompts encourages writers to also publish their Prompts into Writing Prompts subreddit, Quora, Twitter, or whatever platform is more adequate in order to get more visibility and engagement.</p>
          <p>Notice that the fee for minting Prompts does NOT depend on the size of the text. Minting a short poem will cost you the same as minting an entire novel. We can thank the <a href="https://en.wikipedia.org/wiki/InterPlanetary_File_System">InterPlanetary File System (IPFS)</a> for that.</p>
          <p>As the community matures, Crypto Prompts will be used as input data for more elaborate NFT collections. Furthermore, there will be partnerships with auction platforms for writers to auction their Prompts.</p>
          <p>Get in touch - <a href="mailto:mario@cryptoprompts.art">mario@cryptoprompts.art</a></p>
        </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default About;