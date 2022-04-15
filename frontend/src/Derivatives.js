import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap'
import ccplus from './Ccplus.jpg'
import delta from './A.png'

const Derivatives = ({
  length,
  authorById,
  derivativesById,
  tokensById,
  getDerivativeCid,
  getDerivativeId,
}) => {
  const [derivativeId, setDerivativeId] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [writer, setWriter] = useState(undefined)
  const [derivativeNumber, setDerivativeNumber] = useState(undefined)
  const [showDerivativeNumber, setShowDerivativeNumber] = useState(undefined)
  const [derivatives, setDerivatives] = useState(undefined)
  const [tokens, setTokens] = useState(undefined)
  const [childDerivatives, setChildDerivatives] = useState(undefined)
  const [postId, setPostId] = useState(undefined)
  const [showPostId, setShowPostId] = useState(undefined)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setTitle(undefined)
    setWriter(undefined)
    setDerivatives(undefined)
    setTokens(undefined)
    setShowPostId(undefined)
    setText(`.`)
    setSpinner(true)
  }, [])

  const updateDerivativeNumber = (e) => {
    let derivativeNum = e.target.value
    setDerivativeNumber(parseInt(derivativeNum))
  }

  const updatePostId = (e) => {
    const postId = e.target.value
    setPostId(parseInt(postId))
  }

  const getSpecificPost = async (e) => {
    e.preventDefault()
    if (0 < postId && postId < length && derivativeNumber > 0) {
      await getPost(postId, derivativeNumber)
    }
  }

  const getPost = async (getPostId, derivativeNumberPlus) => {
    setText(undefined)
    const derivativeNumber = derivativeNumberPlus - 1
    const cid = await getDerivativeCid(getPostId, derivativeNumber)
    const derivativeId = await getDerivativeId(getPostId, derivativeNumber)
    const author = await authorById(derivativeId)
    setDerivativeId(derivativeId)
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`)
    setTitle(blob.data.title)
    const derivatives = await derivativesById(getPostId)
    setWriter(author)
    setDerivatives(derivatives)
    const childDerivatives = await derivativesById(derivativeId)
    const tokens = await tokensById(derivativeId)
    setChildDerivatives(childDerivatives)
    setTokens(tokens)
    setShowPostId(getPostId)
    const showDerivativeNumber = derivativeNumber + 1
    setShowDerivativeNumber(showDerivativeNumber)
    setText(blob.data.body)
  }

  const next = async () => {
    if (derivativeNumber + 1 <= derivatives) {
      const c = derivativeNumber + 1
      setDerivativeNumber(c)
      await getPost(postId, c)
    }
  }

  const prev = async () => {
    if (derivativeNumber > 1) {
      const c = derivativeNumber - 1
      setDerivativeNumber(c)
      await getPost(postId, c)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button
            variant='dark'
            onClick={() => prev()}
            className='font-weight-bold'
            style={{ color: 'silver' }}
          >
            <i>Previous Derivative</i>
          </Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button
            variant='dark'
            onClick={() => next()}
            className='font-weight-bold'
            style={{ color: 'silver' }}
          >
            <i>Next Derivative</i>
          </Button>
        </Col>
      </Row>
      <br />
      {text && title ? (
        <Card
          className='shadow-lg p-3 mb-5 bg-white rounded text-center'
          style={{ width: 'auto' }}
        >
          <Card.Body>
            <Card.Title>
              <Row>
                <Col>
                  <h5
                    style={{ color: 'lightgray' }}
                  >{`ROOT POST ID: ${showPostId}`}</h5>
                </Col>
                <Col>
                  <h5
                    style={{ color: 'lightgray' }}
                  >{`DERIVATIVE: ${showDerivativeNumber}/${derivatives}`}</h5>
                </Col>
              </Row>
              <br />
              <br />
              <h5
                style={{ color: 'lightgray' }}
              >{`POST ID: ${derivativeId}`}</h5>
              <br />
              <br />
              <h3>{`${title}`}</h3>
            </Card.Title>
            <Card.Text>
              <br />
              <h4 style={{ whiteSpace: 'pre-wrap' }}>{text && `${text}`}</h4>
              <br />
              <h5 style={{ color: 'lightgray' }}>{`by ${writer}`}</h5>
              <br />
              <br />
              <br />
              <a
                rel='noreferrer'
                target='_blank'
                href='https://www.cryptoposts.art/copyrights'
              >
                <img
                  alt='Creative Commons License'
                  style={{ borderWidth: 0 }}
                  src='https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png'
                />
              </a>
              <a
                rel='noreferrer'
                target='_blank'
                href='https://www.cryptoposts.art/copyrights'
              >
                <img
                  alt='Creative Commons Plus'
                  style={{ borderWidth: 0, width: '1.3rem', height: '0.95rem' }}
                  src={ccplus}
                />
              </a>
              <br />
              <br />
              <h5
                style={{ color: 'lightgray' }}
              >{`DERIVATIVES: ${childDerivatives}`}</h5>
              <h5 style={{ color: 'lightgray' }}>{`LΛNs: ${tokens}`}</h5>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card
          className='shadow-lg p-3 mb-5 bg-white rounded text-center'
          style={{ width: 'auto', minHeight: '15.5rem' }}
        >
          <Card.Body>
            <Card.Text>
              <img
                alt='Delta'
                style={{ borderWidth: 0, width: '10rem', height: '10rem' }}
                src={delta}
              />
              {!text && spinner && (
                <div>
                  <br />
                  <div class='spinner-border'></div>
                </div>
              )}
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      <Card
        className='shadow-lg p-3 mb-5 bg-white rounded text-center'
        style={{ width: 'auto', maxWidth: '64rem' }}
      >
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => getSpecificPost(e)}>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder='Root Post Id : )'
                      type='number'
                      value={postId}
                      onChange={(e) => updatePostId(e)}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder='Derivative Number : )'
                      type='number'
                      value={derivativeNumber}
                      onChange={(e) => updateDerivativeNumber(e)}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Button
                      variant='dark'
                      type='submit'
                      className='font-weight-bold'
                      style={{ color: 'silver' }}
                    >
                      <i>View Derivative</i>
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Derivatives
