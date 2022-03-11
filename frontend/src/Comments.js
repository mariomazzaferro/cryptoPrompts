import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap'
import ccplus from './Ccplus.jpg'
import heart from './Heart.png'

const Comments = ({
  length,
  commentsById,
  tokensById,
  getCommentCid,
  getCommentId,
  authorById,
}) => {
  const [commentId, setCommentId] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [writer, setWriter] = useState(undefined)
  const [commentNumber, setCommentNumber] = useState(undefined)
  const [showCommentNumber, setShowCommentNumber] = useState(undefined)
  const [comments, setComments] = useState(undefined)
  const [tokens, setTokens] = useState(undefined)
  const [childComments, setChildComments] = useState(undefined)
  const [NFTId, setNFTId] = useState(undefined)
  const [showNFTId, setShowNFTId] = useState(undefined)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setTitle(undefined)
    setWriter(undefined)
    setComments(undefined)
    setTokens(undefined)
    setShowNFTId(undefined)
    setText(`.`)
    setSpinner(true)
  }, [])

  const updateCommentNumber = (e) => {
    let commentNum = e.target.value
    setCommentNumber(parseInt(commentNum))
  }

  const updateNFTId = (e) => {
    const NFTId = e.target.value
    setNFTId(parseInt(NFTId))
  }

  const getNFT = async (e) => {
    e.preventDefault()
    if (0 <= NFTId && NFTId < length && commentNumber > 0) {
      await getPost(NFTId, commentNumber)
    }
  }

  const getPost = async (postId, commentNumberPlus) => {
    setText(undefined)
    const commentNumber = commentNumberPlus - 1
    const cid = await getCommentCid(postId, commentNumber)
    const commentId = await getCommentId(postId, commentNumber)
    const author = await authorById(commentId)
    setCommentId(commentId)
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`)
    setTitle(blob.data.title)
    const comments = await commentsById(postId)
    setWriter(author)
    setComments(comments)
    const childComments = await commentsById(commentId)
    const tokens = await tokensById(commentId)
    setChildComments(childComments)
    setTokens(tokens)
    setShowNFTId(postId)
    const showCommentsNumber = commentNumber + 1
    setShowCommentNumber(showCommentNumber)
    setText(blob.data.body)
  }

  const next = async () => {
    if (commentNumber + 1 <= comments) {
      const c = commentNumber + 1
      setCommentNumber(c)
      await getPost(NFTId, c)
    }
  }

  const prev = async () => {
    if (commentNumber > 1) {
      const c = commentNumber - 1
      setCommentNumber(c)
      await getPost(NFTId, c)
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
            <i>Previous Comment</i>
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
            <i>Next Comment</i>
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
                  >{`ROOT POST ID: ${showNFTId}`}</h5>
                </Col>
                <Col>
                  <h5
                    style={{ color: 'lightgray' }}
                  >{`COMMENT: ${showCommentNumber}/${comments}`}</h5>
                </Col>
              </Row>
              <br />
              <br />
              <h5 style={{ color: 'lightgray' }}>{`POST ID: ${commentId}`}</h5>
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
              >{`COMMENTS: ${childComments}`}</h5>
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

      <Card
        className='shadow-lg p-3 mb-5 bg-white rounded text-center'
        style={{ width: 'auto', maxWidth: '64rem' }}
      >
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => getNFT(e)}>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder='Root Post Id : )'
                      type='number'
                      value={NFTId}
                      onChange={(e) => updateNFTId(e)}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder='Comment Number : )'
                      type='number'
                      value={commentNumber}
                      onChange={(e) => updateCommentNumber(e)}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Button
                      variant='dark'
                      type='submit'
                      className='font-weight-bold'
                      style={{ color: 'silver' }}
                    >
                      <i>View Comment</i>
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

export default Comments
