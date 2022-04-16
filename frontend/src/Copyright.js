import React from 'react'
import { Container, Card } from 'react-bootstrap'

const Copyright = () => {
  return (
    <Container>
      <Card
        className='shadow-lg p-3 bg-white rounded text-center'
        style={{ width: 'auto' }}
      >
        <br />
        <h3 style={{ color: 'dimgray' }}>
          <i>
            <b>COPYRIGHT & CREΛTIVE COMMONS</b>
          </i>
        </h3>
        <br />
        <br />
        <p>Λuthors automatically have copyright over their creations.</p>
        <p>
          Each published Post's original content is Licensed under a BY-NC-SΛ/BY
          Satoshi License (
          <a
            href='https://satoshilicenses.org/#byncsa-by'
            target='_blank'
            rel='noreferrer'
          >
            www.satoshilicenses.org
          </a>
          ) , <br /> Λssociated NFT at: Polygon Mumbai
          Network/0x178753A476526f6E9575cB90C8EF6BeC66b6feFb/Respective Post's
          Λssociated NFTs.
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

export default Copyright
