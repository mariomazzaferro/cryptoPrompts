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
          <p>There is a subreddit called <a href="https://www.reddit.com/r/WritingPrompts/">r/WritingPrompts</a>, where millions of writers contribute to create new content. Crypto Prompts is the implementation of that content creation dynamic in the Polygon Blockchain. Here, each prompt or ramification is an ERC-721 Non-Fungible Token that can be sold, transfered or used as a prompt for other ramifications.</p>
        </Card.Text>
        </Card.Body>
      </Card>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5>ERC-721 NFT STANDARD</h5>
        </Card.Title>
        <Card.Text>
          <p>Non-Fungible Tokens are used to identify something in a unique way, and to securely manage its ownership. This type of Token is perfect for platforms that offer collectible items or any other generic items. The ERC-721 is the main standard for NFTs in the crypto industry. The NFTs you create here are compatible with every NFT Marketplace.</p>
        </Card.Text>
        </Card.Body>
      </Card>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5>CRYPTO PROMPTS</h5>
        </Card.Title>
        <Card.Text>
          <p>This platform has no owner and seeks no profit. Its infrastructure is 100% decentralized (IPFS + smart contract) and the <a href="https://github.com/mariomazzaferro/cryptoPrompts/">code</a> is open source. Crypto Prompts is a public service, everything you pay is spent exclusively on blockchain fees. This project is inspired by the Writing Prompts subreddit, with its literary appeal, but there are no rules here, you can write whatever you want, however you want it. There can be "question prompts", making the ramification dynamic similar to Quora. There can be "discussion prompts", tilting more towards Twitter's dynamic. Go crazy, you can publish an entire novel if you dare. There are endless possibilities for new prompts, it's impossible to guess all of them now, the best way to predict the futere is by writing it...</p>
          <p>As the community matures, Crypto Prompts will be used as base NFTs for more elaborate literary NFT collections.</p>
        </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default About;