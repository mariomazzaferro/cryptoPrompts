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
            <br />
            <p>
              There is a subreddit called{' '}
              <a href='https://www.reddit.com/r/WritingPrompts/'>
                Writing Prompts
              </a>
              , where millions of writers and wanna-be writers collaboratively
              publish their stories and essays to practice everyone's writing
              skills, motivate each other and stimulate creativity. Writers can
              have patreons start to support them, as well as gain visibility
              and engagement to the point of getting book deals and other career
              opportunities.
            </p>
            <br />
            <p>
              Nevertheless, these profitable cases tend to be exceptions and not
              the rule. The publishing industry (like any other industry) has
              its intrinsic limitations. And as such, there are thresholds that
              most wanna-be writers never get to cross. With that in mind,
              Crypto Prompts should be seen as an alternative path. A writing
              marketplace that circumvents the traditional publishing pipeline,
              allowing authors to freely negotiate copyright permissions to
              their creative work without intermediaries.
            </p>
            <br />
            <p>
              Crypto Prompts implements Writing Prompts' content creation
              dynamic in the Polygon Network (Blockchain). Here, Prompts are
              perpetual objects carved into the blockchain, allowing the author
              to mint License Λssociated NFTs (LΛNs) that can be sold,
              auctioned, transferred, etc. Furthermore, users can comment any
              published Prompt creating a new Prompt with new content related to
              the "Root Prompt". Comment Prompts can be commented as well.
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
            <br />
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
            <br />
            <p>
              This platform is 100% decentralized (IPFS + smart contract), and
              its{' '}
              <a href='https://github.com/mariomazzaferro/cryptoPrompts/'>
                code
              </a>{' '}
              is open source. Crypto Prompts seeks no profit; everything you pay
              is spent exclusively on blockchain fees and LΛN trades. This
              project is inspired by the Writing Prompts subreddit, with its
              literary appeal, but there are no rules here; you can write
              whatever you want. There can be "question Prompts", making the
              content dynamic similar to Quora. There can be "discussion
              Prompts", tilting more towards Reddit's dynamic. Go crazy, you can
              publish an entire novel if you dare. There are endless
              possibilities for new Prompts, it's impossible to guess all of
              them now, the best way to predict the future is by writing it.
            </p>
            <br />
            <p>Crypto Prompts aims to:</p>
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
            <br />
            <p>
              Notice that the fee for publishing Prompts does NOT depend on the
              size of the text. Publishing a short poem will cost you the same
              as publishing an entire novel. We can thank the{' '}
              <a href='https://en.wikipedia.org/wiki/InterPlanetary_File_System'>
                InterPlanetary File System (IPFS)
              </a>{' '}
              for that.
            </p>
            <br />
            <p>
              Λs the community matures, Crypto Prompts will be used as input
              data for more elaborate NFT collections.
            </p>
            <br />
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
