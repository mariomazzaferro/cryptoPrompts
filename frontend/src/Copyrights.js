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
          Λttribution 4.0 International Creative Commons License towards that
          Seed Prompt's content.
        </p>
        <p>
          Ownership of a Branch Prompt token entitles you to the permissions of
          an Λttribution 4.0 International Creative Commons License towards that
          Branch's exclusive content. Furthermore, ownership of a Branch Prompt
          token entitles you to the permissions established in the Creative
          Commons Plus Agreement two images above.
        </p>
        <p>
          Since Creative Commons Licenses are not exclusive, all rights are
          still reserved to the Prompt's author, including minting and selling
          tokens for licensing, collecting, or any other use.
        </p>
        <a rel='license' href='http://creativecommons.org/licenses/by/4.0/'>
          <img
            alt='Creative Commons License'
            style={{ borderWidth: 0 }}
            src='https://i.creativecommons.org/l/by/4.0/88x31.png'
          />
        </a>
        <a rel='license' href='http://creativecommons.org/licenses/by/4.0/'>
          Creative Commons Λttribution 4.0 International License
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
    </Container>
  )
}

export default Copyrights
