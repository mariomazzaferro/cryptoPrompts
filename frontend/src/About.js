import React from 'react'
import { Container, Card } from 'react-bootstrap'

const About = () => {
  return (
    <Container>
      <Card
        className='shadow-lg p-3 mb-5 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <Card.Body>
          <Card.Title>
            <h5>WRITING PROMPTS</h5>
          </Card.Title>
          <Card.Text>
            <p>
              There is a subreddit called{' '}
              <a href='https://www.reddit.com/r/WritingPrompts/'>
                Writing Prompts
              </a>
              , where millions of writers and wanna-be writers contribute to
              create new content. Crypto Prompts implements Writing Prompts'
              content creation dynamic in the Polygon Network (Blockchain).
              Here, Prompts are perpetual objects carved into the blockchain,
              allowing the author to mint Non-Fungible Token Licenses that can
              be sold, auctioned, transferred, etc. Furthermore, users can
              branch any published Prompt creating a "Branch Prompt" with new
              content related to the "Root Prompt". Branch Prompts can be
              branched as well.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        className='shadow-lg p-3 mb-5 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <Card.Body>
          <Card.Title>
            <h5>ERC-721 NFT STΛNDΛRD</h5>
          </Card.Title>
          <Card.Text>
            <p>
              Non-Fungible Tokens are used to identify something uniquely and
              securely manage its ownership. This type of Token is perfect for
              platforms that offer collectible items or other generic items. The
              ERC-721 is the primary standard for NFTs in the crypto industry.
              The NFTs you create here are compatible with every NFT
              Marketplace.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        className='shadow-lg p-3 mb-5 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <Card.Body>
          <Card.Title>
            <h5>CRYPTO PROMPTS</h5>
          </Card.Title>
          <Card.Text>
            <p>
              Millions of{' '}
              <a href='https://www.reddit.com/r/WritingPrompts/'>
                Writing Prompts
              </a>{' '}
              users post their Prompts and comments (Branches) on Reddit with no
              practical way to profit from their creative work. They are using
              Reddit simply as a training ground for their writing skills, a
              cooperative hub for feedback and motivation. With that in mind,
              Crypto Prompts aims to:
            </p>
            <p>
              - Λttribute practical ownership and authorship to creative
              content.
            </p>
            <p>
              - Empower writers by making their journey more profitable and
              trackable.
            </p>
            <p>- Secure creative content from censorship.</p>
            <p>- Stimulate colaborative writing.</p>
            <p>
              This platform is 100% decentralized (IPFS + smart contract), and
              its{' '}
              <a href='https://github.com/mariomazzaferro/cryptoPrompts/'>
                code
              </a>{' '}
              is open source. Crypto Prompts seeks no profit; everything you pay
              is spent exclusively on blockchain fees and Prompt token trades.
              This project is inspired by the Writing Prompts subreddit, with
              its literary appeal, but there are no rules here; you can write
              whatever you want. There can be "question Prompts", making the
              branching dynamic similar to Quora. There can be "discussion
              Prompts", tilting more towards Twitter's dynamic. Go crazy, you
              can publish an entire novel if you dare. There are endless
              possibilities for new Prompts, it's impossible to guess all of
              them now, the best way to predict the future is by writing it.
            </p>
            <p>
              Crypto Prompts encourages writers to also publish their Prompts
              into the Writing Prompts subreddit, Quora, Twitter, or whatever
              platform is more adequate to get more visibility and engagement.
            </p>
            <p>
              Notice that the fee for publishing Prompts does NOT depend on the
              size of the text. Publishing a short poem will cost you the same
              as publishing an entire novel. We can thank the{' '}
              <a href='https://en.wikipedia.org/wiki/InterPlanetary_File_System'>
                InterPlanetary File System (IPFS)
              </a>{' '}
              for that.
            </p>
            <p>
              Λs the community matures, Crypto Prompts will be used as input
              data for more elaborate NFT collections.
            </p>
            <p>
              Get in touch -{' '}
              <a href='mailto:mario@cryptoprompts.art'>
                mario@cryptoprompts.art
              </a>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default About
