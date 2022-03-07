import React from 'react'
import { Container, Card } from 'react-bootstrap'
import ccplus from './Ccplus.jpg'

const Home = ({ accounts, connectMetamask }) => {
  return (
    <Container className='text-center'>
      <Card
        className='shadow-lg p-3 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <h2 style={{ color: 'dimgray' }}>
          <i>
            <b>
              <u>
                PUBLISH your writing & TRΛDE its copyright permissions through
                NFTs
              </u>
            </b>
          </i>
        </h2>
      </Card>
      <br />

      <Card
        className='shadow-lg p-3 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <h1 style={{ color: 'dimgray' }}>
          <i>
            <b>WHITE PΛPER</b>
          </i>
        </h1>
        <br />
        <br />
        <p>
          Crypto Prompts is a platform that allows writers to freely trade their
          copyright permissions through NFTs.
        </p>
        <p>
          To give some context: there is a subreddit called{' '}
          <a href='https://www.reddit.com/r/WritingPrompts/'>Writing Prompts</a>
          , where millions of writers and wanna-be writers contribute to create
          new content. Users collaboratively publish their stories and essays to
          practice everyone's writing skills, motivate each other and stimulate
          creativity. Writers can have patreons start to support them, as well
          as gain visibility and engagement to the point of getting book deals
          and other career opportunities.
        </p>
        <p>It is truly a fantastic community.</p>
        <p>
          Nevertheless, these profitable cases tend to be exceptions and not the
          rule. The publishing industry (like any other industry) has its
          intrinsic limitations. Λnd as such, there are thresholds that most
          wanna-be writers never get to cross. With that in mind, Crypto Prompts
          should be seen as an alternative path. Λ writing marketplace that
          circumvents the traditional publishing pipeline, allowing authors to
          freely negotiate copyright permissions to their creative work without
          intermediaries.
        </p>
        <p>
          Crypto Prompts implements Writing Prompts' content creation dynamic in
          the Polygon Network (Blockchain). Here, Prompts are perpetual objects
          carved into the blockchain, allowing the author to mint License
          Λssociated NFTs (LΛNs) that can be sold, auctioned, transferred, etc.
          Furthermore, users can comment any published Prompt creating a new
          Prompt with new content related to the "Root Prompt".
        </p>
        <br />
        <br />
        <br />
        <h3 style={{ color: 'dimgray' }}>
          <i>
            <b>OBJECTIVES</b>
          </i>
        </h3>
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
        <h3 style={{ color: 'dimgray' }}>
          <i>
            <b>INFRΛSTRUCTURE</b>
          </i>
        </h3>
        <br />
        <p>
          Crypto Prompts' infrastructure is 100% decentralized (IPFS + smart
          contract), and its{' '}
          <a href='https://github.com/mariomazzaferro/cryptoPrompts/'>code</a>{' '}
          is open source. This Project seeks no profit; everything you pay is
          spent exclusively on blockchain fees and LΛN trades. Our inspiration
          is the Writing Prompts subreddit, with its literary appeal, but there
          are no rules here; you can write whatever you want. There can be
          "question Prompts", making the content dynamic similar to Quora. There
          can be "discussion Prompts", tilting more towards Reddit's dynamic. Go
          crazy, you can publish an entire novel if you dare. There are endless
          possibilities for new Prompts, it's impossible to guess all of them
          now, the best way to predict the future is by writing it.
        </p>
        <p>
          Notice that the fee for publishing Prompts (less than a penny) does
          NOT depend on the size of the text. Publishing a short poem will cost
          you the same as publishing an entire novel. We can thank the{' '}
          <a href='https://en.wikipedia.org/wiki/InterPlanetary_File_System'>
            InterPlanetary File System (IPFS)
          </a>{' '}
          for that.
        </p>
        <br />
        <br />
        <br />
        <h3 style={{ color: 'dimgray' }}>
          <i>
            <b>USΛBILITY</b>
          </i>
        </h3>
        <br />
        <p>
          Readers are able to interact with this website without a crypto
          wallet. But in order to publish and manage your own Prompts and NFTs
          you will need to <a href='https://metamask.io/'>install Metamask</a>{' '}
          on your browser.
        </p>
        <p>
          Prompts have an ever-growing nature. Λnyone can comment any existing
          Prompt and therefore create a new Prompt. If we are talking about a
          story: the Root Prompt can be branched into several parallel
          storylines (comments). Each of these individual comments becomes a new
          Prompt.
        </p>
        <p>
          Whenever someone comments a Prompt into a new one, the Root Prompt's
          content is copied into the Comment Prompt followed by the lambda
          standard ("Λ") and then the new content. The Root Prompt's title does
          not appear in the Comment Prompt.
        </p>

        <p>
          Λ Prompt allows its author to mint License Λssociated NFTs (LΛNs). A
          Prompt's LΛN is an NFT that grants Creative Commons License permission
          to its owner (see Copyrights and Creative Commons bellow).
        </p>

        <p>
          There are two ways to buy/sell License Λssociated NFTs in this
          platform: (1) auctions and (2) fixed-price sales. Λuctions have a
          fixed duration of 1 week, in which buyers bid MΛTIC cumulatively until
          the week comes to an end. Once the auction is over, every stakeholder
          can withdraw their rightful resources. If you are a Bidder but not the
          Top Bidder: you can simply withdraw your funds. If you are the Top
          Bidder or the Seller: both of you share the action to withdraw the
          prize; once either of you takes that action, the Top Bid will be
          transferred to the Seller, and the Prompt token auctioned will be
          transferred to the Top Bidder. The Prompt token gets "locked" during
          the auction. So, if the worst comes to the worst, and nobody bid to
          buy your Prompt token: you, the seller, still need to take the
          withdraw action to "unlock" your crappy Prompt token.
        </p>
        <br />
        <br />
        <br />
        <h3 style={{ color: 'dimgray' }}>
          <i>
            <b>COPYRIGHTS & CREΛTIVE COMMONS</b>
          </i>
        </h3>
        <br />
        <p>Authors automatically have copyright over their creations.</p>
        <p>
          Every publish Prompt's original content is Licensed under a
          BY-NC-SA/BY Satoshi License (
          <a href='https://satoshilicenses.org/'>www.satoshilicenses.org)</a>,{' '}
          <br /> Associated NFT at Polygon
          Mainnet/0xc3Bb7B810b5B4B731F78b978a67ab55d3b516c15/Prompt's License
          Associated NFTs.
        </p>
        <br />
        <p>
          This means that the content published on Crypto Prompts is licensed
          under the CC Attribution-NonCommercial-ShareAlike 4.0 International
          License, while owners of the Associated NFTs (at Polygon
          Mainnet/0xc3Bb7B810b5B4B731F78b978a67ab55d3b516c15/Prompt Id) are
          entitled to the same permissions of a CC Attribution 4.0 International
          License towards that Prompt's original content.
        </p>
        <br />
        <p>
          Since CC Licenses are not exclusive, original rights are still
          reserved to the Prompt's author, including minting and selling tokens
          for licensing, collecting, or any other use.
        </p>
      </Card>
      <br />
      <br />
    </Container>
  )
}

export default Home
