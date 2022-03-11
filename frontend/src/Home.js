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
        <h3 style={{ color: 'dimgray' }}>
          <i>
            <b>
              Publish your writings and trade your copyright permissions through
              NFTs
            </b>
          </i>
        </h3>
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
          Crypto Posts is a writing marketplace that circumvents the traditional
          publishing pipeline, allowing authors to freely negotiate copyright
          permissions to their material without intermediaries.
        </p>
        <p>
          Our smart contract lives in the Polygon Mumbai Network (for now...)
          and our Posts are perpetual objects carved into the blockchain,
          allowing the author to mint License Λssociated NFTs (LΛNs) that grant
          copyright permissions of the Post's content.
        </p>
        <p>
          Satoshi Licenses are a special kind of license that allow creators to
          grant copyright permissions through Λssociated NFTs. Our Posts are
          licensed under the{' '}
          <a
            href='https://satoshilicenses.org/#byncsa-by'
            target='_blank'
            rel='noreferrer'
          >
            BY-NC-SΛ/BY Satoshi License
          </a>
          . Which means that material published through Crypto Posts has the
          same public permissions of a{' '}
          <a
            href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
            target='_blank'
            rel='noreferrer'
          >
            CC Λttribution-NonCommercial-ShareΛlike 4.0 International License
          </a>
          , while owners of the Λssociated NFT have additional permissions
          (equivalent to a{' '}
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank'
            rel='noreferrer'
          >
            CC Λttribution 4.0 International License
          </a>
          ).
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
        <p>- Λttribute practical ownership and authorship to indie writings.</p>
        <p>- Λllow disintermediated copyright trade.</p>
        <p>- Secure creative writing from censorship.</p>
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
          Crypto Posts' infrastructure is 100% decentralized (IPFS + smart
          contract), and its code is open source.
        </p>
        <p>
          This project seeks no profit; everything you pay here is spent
          exclusively on blockchain fees and LΛN trades.
        </p>
        <p>
          Notice that the fee for publishing a Post (~ a penny) does NOT depend
          on the size of the text. Publishing a short poem will cost you the
          same as publishing an entire novel. We can thank the{' '}
          <a
            href='https://en.wikipedia.org/wiki/InterPlanetary_File_System'
            target='_blank'
            rel='noreferrer'
          >
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
          wallet. But in order to publish Posts and manage LΛNs you will need to{' '}
          <a href='https://metamask.io/' target='_blank' rel='noreferrer'>
            install Metamask
          </a>{' '}
          on your browser.
        </p>
        <p>
          Whenever someone comments a Post: a new "Comment Post" is created.
          Comment Posts begin with the lambda standard ("Λ") and have their own
          title. Each Comment Post can be commented on as well. Basically a
          Comment Post is a regular Post that points to another Post.
        </p>

        <p>
          Λ Post allows its author to mint License Λssociated NFTs (LΛNs). A
          Post's LΛN is an NFT that grants copyright permissions to its owner
          (see Copyrights and Creative Commons bellow).
        </p>

        <p>
          There are two ways to buy/sell License Λssociated NFTs (LΛNs) in this
          platform: (1) auctions and (2) fixed-price sales. Λuctions have a
          fixed duration of 1 week, in which buyers bid MΛTIC cumulatively until
          the week comes to an end. Once the auction is over, every stakeholder
          can withdraw their rightful resources. If you are a Bidder but not the
          Top Bidder: you can simply withdraw your funds. If you are the Top
          Bidder or the Seller: both of you share the action to withdraw the
          prize; once either of you takes that action, the Top Bid will be
          transferred to the Seller, and the LΛN auctioned will be transferred
          to the Top Bidder.
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
        <p>Λuthors automatically have copyright over their creations.</p>
        <p>
          Every published Post's original material is Licensed under a
          BY-NC-SΛ/BY Satoshi License (
          <a
            href='https://satoshilicenses.org/#byncsa-by'
            target='_blank'
            rel='noreferrer'
          >
            www.satoshilicenses.org
          </a>
          ), <br /> Λssociated NFT at Polygon Mumbai Network
          /0x33A8Cadc2F7cC6e2e588ea6A15CE0BC5B362CCB4/Post's License Λssociated
          NFTs.
        </p>
        <br />
        <p>
          This means that the content published on Crypto Posts is licensed
          under a{' '}
          <a
            href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
            target='_blank'
            rel='noreferrer'
          >
            CC Λttribution-NonCommercial-ShareΛlike 4.0 International License
          </a>
          , while owners of the License Λssociated NFTs (LΛNs) are entitled to
          the same permissions of a{' '}
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank'
            rel='noreferrer'
          >
            CC Λttribution 4.0 International License
          </a>{' '}
          towards that Post's original material.
        </p>
        <br />
        <p>
          Since Creative Commons Licenses are not exclusive, original rights are
          still reserved to the Post's author, including minting and selling
          tokens for licensing, collecting, or any other use.
        </p>
        <br />
        <br />
        <br />
        <p>
          <i>
            <b>Get in touch: nakamoto@satoshilicenses.org</b>
          </i>
        </p>
      </Card>
      <br />
      <br />
    </Container>
  )
}

export default Home
