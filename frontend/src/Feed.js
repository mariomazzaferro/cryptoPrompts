import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import ccplus from './Ccplus.jpg'
import heart from './Heart.png'

const Feed = ({
  accounts,
  length,
  postById,
  authorById,
  rootById,
  derivativesById,
  tokensById,
  writeDerivative,
  updateLength,
  collectionList,
}) => {
  const [text, setText] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [writer, setWriter] = useState(undefined)
  const [root, setRoot] = useState(undefined)
  const [derivatives, setDerivatives] = useState(undefined)
  const [tokens, setTokens] = useState(false)
  const [postId, setPostId] = useState(undefined)
  const [showId, setShowId] = useState(undefined)
  const [derivativeText, setDerivativeText] = useState(undefined)
  const [derivativeTitle, setDerivativeTitle] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [collWriter, setCollWriter] = useState(false)
  const [list, setList] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef(null)
  const formRef1 = useRef(null)

  let history = useHistory()

  let { handle } = useParams()

  useEffect(() => {
    setPostId(parseInt(length))
    setTitle(undefined)
    setWriter(undefined)
    setRoot(undefined)
    setDerivatives(undefined)
    setTokens(undefined)
    setShowId(undefined)
    setText(`.`)
    setSpinner(true)

    if (handle) {
      setPostId(parseInt(handle))
      getPost(parseInt(handle))
    }
  }, [length])

  const getPost = async (id) => {
    setText(undefined)
    setRoot(undefined)
    setShowId(undefined)
    const cid = await postById(id)
    const author = await authorById(id)
    const root = await rootById(id)
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`)
    setTitle(blob.data.title)
    const derivatives = await derivativesById(id)
    const tokens = await tokensById(id)
    setWriter(author)
    setRoot(root)
    setDerivatives(derivatives)
    setTokens(tokens)
    setShowId(id)
    setText(blob.data.body)
  }

  const next = async () => {
    if (length > 1) {
      if (1 < postId) {
        const c = postId - 1
        setPostId(c)
        await getPost(c)
        history.push(`/`)
        history.push(`/posts/${c}`)
      } else {
        setPostId(length - 1)
        await getPost(length - 1)
        history.push(`/`)
        history.push(`/posts/${length - 1}`)
      }
    }
  }

  const prev = async () => {
    if (length > 1) {
      if (postId + 1 < length) {
        const c = postId + 1
        setPostId(c)
        await getPost(c)
        history.push(`/`)
        history.push(`/posts/${c}`)
      } else {
        updateLength()
        setPostId(1)
        await getPost(1)
        history.push(`/`)
        history.push(`/posts/1`)
      }
    }
  }

  const updateDerivative = (e) => {
    const derivativeText = e.target.value
    setDerivativeText(derivativeText)
  }

  const updateDerivativeTitle = (e) => {
    const derivativeTitle = e.target.value
    setDerivativeTitle(derivativeTitle)
  }

  const submitDerivative = async (e) => {
    e.preventDefault()
    if (derivativeText && derivativeTitle && showId <= length) {
      setLoading(true)
      let res
      try {
        res = await writeDerivative(derivativeTitle, derivativeText, showId)
        console.log(res)
      } catch (err) {
        console.log(err.message)
      }
      setDerivativeText(undefined)
      formRef.current.reset()
      setLoading(false)
      if (res) {
        if (res.status) {
          alert(`Derivative Post published successfully`)

          await updateLength()
        } else {
          alert('Publishing Derivative failed')
        }
      } else {
        alert(
          `Publishing Derivative is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/`
        )
      }
    } else {
      alert(
        'Publishing Derivative failed. Make sure your Post has a title and a body.'
      )
    }
  }

  const updateCollWriter = (e) => {
    const collWriter = e.target.value
    setCollWriter(collWriter)
    setList(undefined)
  }

  const getCollection = async (e) => {
    e.preventDefault()
    let list
    try {
      list = await collectionList(collWriter)
    } catch (err) {
      console.log(err.message)
    }
    setList(list)
  }

  const updatePostId = (e) => {
    const postId = e.target.value
    setPostId(parseInt(postId))
  }

  const getSpecificPost = async (e) => {
    e.preventDefault()
    if (
      typeof postId !== undefined &&
      0 < postId &&
      postId < parseInt(length)
    ) {
      await getPost(postId)
    }
    setPostId(undefined)
    formRef1.current.reset()
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
            <i>Previous Post</i>
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
            <i>Next Post</i>
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
              <h5 style={{ color: 'lightgray' }}>{`POST ID: ${showId}`}</h5>
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
              {root != 0 && (
                <h5
                  style={{ color: 'lightgray' }}
                >{`ROOT POST ID: ${root}`}</h5>
              )}
              <h5
                style={{ color: 'lightgray' }}
              >{`DERIVATIVES: ${derivatives}`}</h5>
              <h5 style={{ color: 'lightgray' }}>{`LΛNs: ${tokens}`}</h5>
              {accounts.length !== 0 && showId !== undefined && (
                <Form ref={formRef} onSubmit={(e) => submitDerivative(e)}>
                  <Form.Group>
                    <br />
                    <Form.Control
                      style={{ textAlign: 'center' }}
                      as='textarea'
                      rows='1'
                      placeholder='Title : )'
                      onChange={(e) => updateDerivativeTitle(e)}
                    ></Form.Control>
                    <br />
                    <Form.Control
                      style={{ textAlign: 'center' }}
                      as='textarea'
                      rows='13'
                      placeholder='Write your Derivative Post... : )'
                      onChange={(e) => updateDerivative(e)}
                    ></Form.Control>
                    <Button
                      variant='dark'
                      type='submit'
                      className='font-weight-bold'
                      style={{ color: 'silver' }}
                    >
                      <i>Publish Post $</i>
                    </Button>
                    {loading && (
                      <div>
                        <br />
                        <div class='spinner-border'></div>
                      </div>
                    )}
                  </Form.Group>
                </Form>
              )}
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
              <a
                rel='noreferrer'
                target='_blank'
                href='https://www.cryptoposts.art/copyrights'
              >
                <img
                  alt='Creative Commons Heart Logo'
                  style={{ borderWidth: 0, width: '10rem', height: '10rem' }}
                  src={heart}
                />
              </a>
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
      <Row>
        <Card
          className='shadow-lg p-3 mb-5 ml-3 mr-5 bg-white rounded'
          style={{ width: 'auto' }}
        >
          <Card.Body>
            <Card.Title>
              <Form inline onSubmit={(e) => getCollection(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="Writer's Λddress : )"
                        type='string'
                        onChange={(e) => updateCollWriter(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Get Writer's Collection</i>
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Title>
            <Card.Text>
              <h5>{list && `Collection: ${list}`}</h5>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          className='shadow-lg p-3 mb-5 ml-3 bg-white rounded'
          style={{ width: 'auto', maxWidth: '25rem', maxHeight: '7.7rem' }}
        >
          <Card.Body>
            <Card.Title>
              <Form ref={formRef1} inline onSubmit={(e) => getSpecificPost(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='Post Id : )'
                        type='number'
                        onChange={(e) => updatePostId(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>View Post</i>
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Feed
