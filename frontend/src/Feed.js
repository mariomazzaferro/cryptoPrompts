import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap'
import ccplus from './Ccplus.jpg'

const Feed = ({
  accounts,
  length,
  promptById,
  authorById,
  branchesById,
  tokensById,
  branchify,
  updateLength,
  collectionList,
}) => {
  const [text, setText] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [writer, setWriter] = useState(undefined)
  const [root, setRoot] = useState(undefined)
  const [branches, setBranches] = useState(undefined)
  const [tokens, setTokens] = useState(false)
  const [NFTId, setNFTId] = useState(undefined)
  const [showId, setShowId] = useState(undefined)
  const [branchText, setBranchText] = useState(undefined)
  const [branchTitle, setBranchTitle] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [collWriter, setCollWriter] = useState(false)
  const [list, setList] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef(null)
  const formRef1 = useRef(null)

  useEffect(() => {
    setNFTId(parseInt(length))
    setTitle(undefined)
    setWriter(undefined)
    setRoot(undefined)
    setBranches(undefined)
    setTokens(undefined)
    setShowId(undefined)
    setText(
      `A Prompt represents specific creative content.\nA Prompt token represents a Creative Commons License to the Prompt's content.\nPrompts that are NOT branches of other Prompts are called Seed Prompts.\nPrompts with at least one Branch earn the title of Root Prompts.\nPrompts that are branches of other Prompts are called... Branch Prompts.`
    )
    setSpinner(true)
  }, [length])

  const getPrompt = async (id) => {
    setText(undefined)
    setRoot(undefined)
    setShowId(undefined)
    const cid = await promptById(id)
    const author = await authorById(id)
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`)
    setTitle(blob.data.title)
    if (typeof blob.data.root !== undefined) {
      setRoot(blob.data.root)
    }
    const branches = await branchesById(id)
    const tokens = await tokensById(id)
    setWriter(author)
    setBranches(branches)
    setTokens(tokens)
    setShowId(id)
    setText(blob.data.body)
  }

  const next = async () => {
    if (length > 0) {
      if (0 < NFTId) {
        const c = NFTId - 1
        setNFTId(c)
        await getPrompt(c)
      } else {
        setNFTId(length - 1)
        await getPrompt(length - 1)
      }
    }
  }

  const prev = async () => {
    if (length > 0) {
      if (NFTId + 1 < length) {
        const c = NFTId + 1
        setNFTId(c)
        await getPrompt(c)
      } else {
        updateLength()
        setNFTId(0)
        await getPrompt(0)
      }
    }
  }

  const updateBranch = (e) => {
    const branchText = e.target.value
    setBranchText(branchText)
  }

  const updateBranchTitle = (e) => {
    const branchTitle = e.target.value
    setBranchTitle(branchTitle)
  }

  const submitBranch = async (e) => {
    e.preventDefault()
    if (branchText && text && branchTitle && showId <= length) {
      setLoading(true)
      let res
      try {
        res = await branchify(branchTitle, branchText, text, showId)
        console.log(res)
      } catch (err) {
        console.log(err.message)
      }
      setBranchText(undefined)
      formRef.current.reset()
      setLoading(false)
      if (res) {
        if (res.status) {
          alert(`Prompt published successfully`)

          await updateLength()
        } else {
          alert('Branching failed')
        }
      } else {
        alert(
          `Branching is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/`
        )
      }
    } else {
      alert('Branching failed. Make sure your Prompt has a title and a body.')
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

  const updateNFTId = (e) => {
    const NFTId = e.target.value
    setNFTId(parseInt(NFTId))
  }

  const getNFT = async (e) => {
    e.preventDefault()
    if (typeof NFTId !== undefined && 0 <= NFTId && NFTId < parseInt(length)) {
      await getPrompt(NFTId)
    }
    setNFTId(undefined)
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
            <i>Previous Prompt</i>
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
            <i>Next Prompt</i>
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
              <h5 style={{ color: 'lightgray' }}>{`PROMPT ID: ${showId}`}</h5>
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
                href='https://www.cryptoprompts.art/copyrights'
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
                href='https://www.cryptoprompts.art/copyrights'
              >
                <img
                  alt='Creative Commons Plus'
                  style={{ borderWidth: 0, width: '1.2rem', height: '0.9rem' }}
                  src={ccplus}
                />
              </a>
              <br />
              <br />
              {(root !== undefined || root === 0) && (
                <h5
                  style={{ color: 'lightgray' }}
                >{`ROOT PROMPT ID: ${root}`}</h5>
              )}
              <h5 style={{ color: 'lightgray' }}>{`BRΛNCHES: ${branches}`}</h5>
              <h5 style={{ color: 'lightgray' }}>{`TOKENS: ${tokens}`}</h5>
              {accounts.length !== 0 && showId !== undefined && (
                <Form ref={formRef} onSubmit={(e) => submitBranch(e)}>
                  <Form.Group>
                    <br />
                    <Form.Control
                      style={{ textAlign: 'center' }}
                      as='textarea'
                      rows='1'
                      placeholder='Title : )'
                      onChange={(e) => updateBranchTitle(e)}
                    ></Form.Control>
                    <br />
                    <Form.Control
                      style={{ textAlign: 'center' }}
                      as='textarea'
                      rows='13'
                      placeholder='Write your Branch Prompt... : )'
                      onChange={(e) => updateBranch(e)}
                    ></Form.Control>
                    <Button
                      variant='dark'
                      type='submit'
                      className='font-weight-bold'
                      style={{ color: 'silver' }}
                    >
                      <i>Publish Prompt $</i>
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
              <br />
              <h4 style={{ whiteSpace: 'pre-wrap' }}>{text && `${text}`}</h4>
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
              <Form ref={formRef1} inline onSubmit={(e) => getNFT(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='Prompt Id : )'
                        type='number'
                        onChange={(e) => updateNFTId(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>View Prompt</i>
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
