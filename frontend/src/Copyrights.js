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
        <br />
        <p>
          Every Prompt is published under the
          Λttribution-NonCommercial-ShareΛlike 4.0 International Creative
          Commons License in addition to the Creative Commons Plus Agreement
          below.
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
          <b>Creative Commons Plus Agreement</b>: the only public permission
          beyond the scope of the Λttribution-NonCommercial-ShareΛlike 4.0
          International Creative Commons License is the following: ownership of
          a Prompt token entitles you to the permissions of an Λttribution 4.0
          International Creative Commons License towards that Prompt's exclusive
          content.
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
        <p>
          Since Creative Commons Licenses are not exclusive, original rights are
          still reserved to the Prompt's author, including minting and selling
          tokens for licensing, collecting, or any other use.
        </p>
      </Card>
    </Container>
  )
}

export default Copyrights
