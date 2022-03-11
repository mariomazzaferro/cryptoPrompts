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
        <p>Λuthors automatically have copyright over their creations.</p>
        <p>
          Every published Post's original content is Licensed under a
          BY-NC-SΛ/BY Satoshi License (
          <a
            href='https://satoshilicenses.org/#byncsa-by'
            target='_blank'
            rel='noreferrer'
          >
            www.satoshilicenses.org
          </a>
          ) , <br /> Λssociated NFT at Polygon Mumbai Network
          /0x33A8Cadc2F7cC6e2e588ea6A15CE0BC5B362CCB4/Post's License Λssociated
          NFTs.
        </p>
        <br />
        <p>
          This means that the content published on Crypto Posts is licensed
          under the CC Λttribution-NonCommercial-ShareΛlike 4.0 International
          License, while owners of the License Λssociated NFTs (LΛNs) are
          entitled to the same permissions of a CC Λttribution 4.0 International
          License towards that Post's original content.
        </p>
        <br />
        <p>
          Since CC Licenses are not exclusive, original rights are still
          reserved to the Post's author, including minting and selling tokens
          for licensing, collecting, or any other use.
        </p>
      </Card>
    </Container>
  )
}

export default Copyrights
