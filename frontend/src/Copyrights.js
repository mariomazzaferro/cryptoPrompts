import React from 'react'
import { Container, Card } from 'react-bootstrap'
import ccplus from './Ccplus.jpg'

const Copyrights = () => {
  return (
    <Container>
      <Card
        className='shadow-lg p-3 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <br />
        <h3 style={{ color: 'dimgray' }}>
          <i>
            <b>COPYRIGHTS & CREΛTIVE COMMONS</b>
          </i>
        </h3>
        <br />
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
    </Container>
  )
}

export default Copyrights
