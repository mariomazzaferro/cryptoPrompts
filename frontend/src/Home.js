import React from 'react'
import { Container, Card } from 'react-bootstrap'
import ccplus from './Ccplus.jpg'

const Home = ({ accounts, connectMetamask }) => {
  return (
    <Container className='text-center'>
      {accounts.length === 0 ? (
        <div>
          <Card
            className='shadow-lg p-3 bg-white rounded text-center'
            style={{ width: 'auto' }}
          >
            <i>
              <h3>
                <u>
                  Crypto Prompts is a Writing Marketplace based on CREATIVE
                  COMMONS and NFTs.
                </u>
              </h3>
              <br />
              <h4>
                Click on FEED and enjoy the reading. Don't mind the fox; he is
                handling security...
              </h4>
              <br />
              <h4>Click on BRΛNCHES to read parallel Branches...</h4>
              <br />
              <h4>
                Click on SΛLES for token (licenses) sales, auctions and
                transfers...
              </h4>
              <br />
              <h4>Click on ΛBOUT to get more information...</h4>
              <br />
              <h4>
                If you are still lost but want to buy, sell or create your very
                own Licence NFTs:
              </h4>
              <h4>
                <a href='https://metamask.io/'>install Metamask</a> +{' '}
                <a href='https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844'>
                  connect it to Polygon
                </a>{' '}
                +{' '}
                <a href='#' onClick={() => connectMetamask()}>
                  connect to this site
                </a>
                !
              </h4>
              <br />
              <h3>Λnd remember, what we write in life echoes in eternity...</h3>
            </i>
          </Card>
          <br />
        </div>
      ) : (
        <div>
          <Card
            className='shadow-lg p-3 bg-white rounded text-center'
            style={{ width: 'auto' }}
          >
            <i>
              <h3>
                <u>
                  Crypto Prompts is a Writing Marketplace based on CREATIVE
                  COMMONS and NFTs.
                </u>
              </h3>
              <br />
              <h4>
                Click on FEED and enjoy the reading. Don't mind the fox; he is
                handling security...
              </h4>
              <br />
              <h4>
                Click on NEW to create a Prompt from scratch OR branch an
                existing Prompt on FEED...
              </h4>
              <br />
              <h4>Click on BRΛNCHES to read parallel Branches...</h4>
              <br />
              <h4>
                Click on SΛLES for token (licenses) sales, auctions and
                transfers...
              </h4>
              <br />
              <h4>Click on ΛBOUT to get more information...</h4>
              <br />
              <h3>Λnd remember, what we write in life echoes in eternity...</h3>
            </i>
          </Card>
          <br />
        </div>
      )}
      <Card
        className='shadow-lg p-3 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <h1>WHITE PΛPER</h1>
        <br />
        <br />
        <br />
        <h3>Context</h3>
        <br />
        <p>
          Writers have never had so many resources for creating and publishing
          their work as they do today. From stone to paper. From Gutenberg to
          Turing. Lately, Web1 and Web2 made every previous step seem highly
          primitive. Λnd yet, we still face some limitations, even with Web2.
          Censorship, disenfranchised artists, the bureaucracy and shortcomings
          of the publishing industry...
        </p>
        <p>
          Crypto Prompts is a tool that seeks to empower writers and wanna-be
          writers even more in this new step called Web3.
        </p>
        <p>
          To give some context: there is a subreddit called{' '}
          <a href='https://www.reddit.com/r/WritingPrompts/'>Writing Prompts</a>
          , where millions of writers and wanna-be writers contribute to create
          new content. Users collaboratively publish their stories and essays to
          practice everyone's writing skills, motivate each other and stimulate
          creativity. It is truly a fantastic community.
        </p>
        <p>
          Nevertheless, users have no practical way to profit from their
          creative work, are vulnerable to Reddit's censorship, and accord to
          the following agreement: "By submitting user content to Reddit, you
          grant us a royalty-free, perpetual, irrevocable, non-exclusive,
          unrestricted, worldwide license to reproduce, prepare derivative
          works, distribute copies, perform, or publicly display your user
          content in any medium and for any purpose, including commercial
          purposes, and to authorize others to do so".
        </p>
        <p>
          Crypto Prompts implements Writing Prompts' content creation dynamic in
          the Polygon Network (Blockchain). Here, Prompts are perpetual objects
          carved into the blockchain, allowing the author to mint Non-Fungible
          Token Licenses that can be sold, auctioned, transferred, etc.
          Furthermore, users can branch any published Prompt creating a "Branch
          Prompt" with new content related to the "Root Prompt". Branch Prompts
          can be branched as well.
        </p>
        <br />
        <br />
        <br />
        <h3>Objectives</h3>
        <br />
        <p>
          - Λttribute practical ownership and authorship to creative content.
        </p>
        <p>
          - Empower writers by making their journey more profitable and
          trackable.
        </p>
        <p>- Secure creative content from censorship.</p>
        <p>- Stimulate collaborative writing.</p>
        <br />
        <br />
        <br />
        <h3>Infrastructure</h3>
        <br />
        <p>
          Crypto Prompts' infrastructure is 100% decentralized (IPFS + smart
          contract), and its{' '}
          <a href='https://github.com/mariomazzaferro/cryptoPrompts/'>code</a>{' '}
          is open source. This Project seeks no profit; everything you pay is
          spent exclusively on blockchain fees and Prompt token trades. Our
          inspiration is the Writing Prompts subreddit, with its literary
          appeal, but there are no rules here; you can write whatever you want.
          There can be "question Prompts", making the branching dynamic similar
          to Quora. There can be "discussion Prompts", tilting more towards
          Twitter's dynamic. Go crazy, you can publish an entire novel if you
          dare. There are endless possibilities for new Prompts, it's impossible
          to guess all of them now, the best way to predict the future is by
          writing it.
        </p>
        <p>
          Notice that the fee for publishing Prompts does NOT depend on the size
          of the text. Publishing a short poem will cost you the same as
          publishing an entire novel. We can thank the{' '}
          <a href='https://en.wikipedia.org/wiki/InterPlanetary_File_System'>
            InterPlanetary File System (IPFS)
          </a>{' '}
          for that.
        </p>
        <br />
        <br />
        <br />
        <h3>Usability</h3>
        <br />
        <p>
          Readers are able to interact with our site without a crypto wallet.
          But in order to publish and manage your own Prompts and tokens you
          will need to <a href='https://metamask.io/'>install Metamask</a> on
          your browser.
        </p>
        <p>
          Prompts have an ever-growing nature. Λnyone can branch any existing
          Prompt into a new Prompt in the same way anyone can comment on a
          social media post. If we are talking about a story: the Root Prompt
          can be branched into several parallel storylines. Each of these
          individual contributions becomes a new Prompt.
        </p>
        <p>
          Whenever someone branches a Prompt into a new one, the Root Prompt's
          content is copied into the Branch Prompt followed by the lambda
          standard ("Λ") and then the new content. The Root Prompt's title does
          not appear in the Branch Prompt.
        </p>

        <p>
          A Prompt allows its author to mint Prompt tokens. A Prompt token is an
          NFT that grants Creative Commons License permission to its owner (see
          Copyrights and Creative Commons bellow).
        </p>

        <p>
          There are two ways to buy/sell Prompt tokens in this platform: (1)
          auctions and (2) fixed-price sales. Λuctions have a fixed duration of
          1 week, in which buyers bid MΛTIC cumulatively until the week comes to
          an end. Once the auction is over, every stakeholder can withdraw their
          rightful resources. If you are a Bidder but not the Top Bidder: you
          can simply withdraw your funds. If you are the Top Bidder or the
          Seller: both of you share the action to withdraw the prize; once
          either of you takes that action, the Top Bid will be transferred to
          the Seller, and the Prompt token auctioned will be transferred to the
          Top Bidder. The Prompt token gets "locked" during the auction. So, if
          the worst comes to the worst, and nobody bid to buy your Prompt token:
          you, the seller, still need to take the withdraw action to "unlock"
          your crappy Prompt token.
        </p>
        <br />
        <br />
        <br />
        <h3>Nomenclature</h3>
        <br />
        <p>A Prompt represents specific creative content.</p>
        <p>
          A Prompt token represents a Creative Commons License to the Prompt's
          content.
        </p>
        <p>
          Prompts that are NOT branches of other Prompts are called Seed
          Prompts.
        </p>
        <p>Prompts with at least one Branch earn the title of Root Prompts.</p>
        <p>
          Prompts that are branches of other Prompts are called... Branch
          Prompts.
        </p>
        <br />
        <br />
        <br />
        <h3>Copyrights and Creative Commons</h3>
        <br />
        <p>Authors automatically have copyright over their creations.</p>
        <br />
        <p>
          Every Prompt is published under the
          Λttribution-NonCommercial-ShareΛlike 4.0 International Creative
          Commons License in addition to the Creative Commons Plus Agreement
          below.
        </p>
        <p>
          Agreement (CC+): the only public permissions beyond the scope of the
          Λttribution-NonCommercial-ShareΛlike 4.0 International Creative
          Commons License is the commercial use of the Prompt's content for
          sales and pawns of its Branch Prompt tokens by the Branch Prompt
          tokens' respective owners.
        </p>
        <a
          rel='license'
          href='http://creativecommons.org/licenses/by-nc-sa/4.0/'
        >
          <img
            alt='Creative Commons License'
            style={{ borderWidth: 0 }}
            src='https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png'
          />
        </a>
        <a
          rel='license'
          href='http://creativecommons.org/licenses/by-nc-sa/4.0/'
        >
          Creative Commons Λttribution-NonCommercial-ShareΛlike 4.0
          International License
        </a>
        <br />
        <a rel='CC+' href='https://wiki.creativecommons.org/wiki/CCPlus'>
          <img
            alt='Creative Commons Plus'
            style={{ borderWidth: 0, width: '2.6rem', height: '1.9rem' }}
            src={ccplus}
          />
        </a>
        <a rel='license' href='https://wiki.creativecommons.org/wiki/CCPlus'>
          Creative Commons Plus
        </a>
        <br />
        <br />
        <p>
          Ownership of a Seed Prompt token entitles you to the permissions of an
          Λttribution-ShareΛlike 4.0 International Creative Commons License
          towards that Seed Prompt's content.
        </p>
        <p>
          Ownership of a Branch Prompt token entitles you to the permissions of
          an Λttribution-ShareΛlike 4.0 International Creative Commons License
          towards that Branch's exclusive content. Furthermore, ownership of a
          Branch Prompt token entitles you to the permissions established in the
          Creative Commons Plus Agreement two images above.
        </p>
        <p>
          Since Creative Commons Licenses are not exclusive, all rights are
          still reserved to the Prompt's author, including minting and selling
          tokens for licensing, collecting, or any other use.
        </p>
        <a rel='license' href='http://creativecommons.org/licenses/by-sa/4.0/'>
          <img
            alt='Creative Commons License'
            style={{ borderWidth: 0 }}
            src='https://i.creativecommons.org/l/by-sa/4.0/88x31.png'
          />
        </a>
        <a rel='license' href='http://creativecommons.org/licenses/by-sa/4.0/'>
          Creative Commons Λttribution-ShareΛlike 4.0 International License
        </a>
        <br />
        <a rel='CC+' href='https://wiki.creativecommons.org/wiki/CCPlus'>
          <img
            alt='Creative Commons Plus'
            style={{ borderWidth: 0, width: '2.6rem', height: '1.9rem' }}
            src={ccplus}
          />
        </a>
        <a rel='license' href='https://wiki.creativecommons.org/wiki/CCPlus'>
          Creative Commons Plus
        </a>
      </Card>
      <br />
      <br />
    </Container>
  )
}

export default Home
