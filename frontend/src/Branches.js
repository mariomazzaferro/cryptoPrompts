import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap'
import ccplus from './Ccplus.jpg'
import heart from './Heart.png'

const Branches = ({
  length,
  branchesById,
  tokensById,
  getBranchCid,
  getBranchId,
  authorById,
}) => {
  const [branchId, setBranchId] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [writer, setWriter] = useState(undefined)
  const [branchNumber, setBranchNumber] = useState(undefined)
  const [showBranchNumber, setShowBranchNumber] = useState(undefined)
  const [branches, setBranches] = useState(undefined)
  const [tokens, setTokens] = useState(undefined)
  const [childBranches, setChildBranches] = useState(undefined)
  const [NFTId, setNFTId] = useState(undefined)
  const [showNFTId, setShowNFTId] = useState(undefined)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setTitle(undefined)
    setWriter(undefined)
    setBranches(undefined)
    setTokens(undefined)
    setShowNFTId(undefined)
    setText(`.`)
    setSpinner(true)
  }, [])

  const updateBranchNumber = (e) => {
    let branchNum = e.target.value
    setBranchNumber(parseInt(branchNum))
  }

  const updateNFTId = (e) => {
    const NFTId = e.target.value
    setNFTId(parseInt(NFTId))
  }

  const getNFT = async (e) => {
    e.preventDefault()
    if (0 <= NFTId && NFTId < length && branchNumber > 0) {
      await getPrompt(NFTId, branchNumber)
    }
  }

  const getPrompt = async (promptId, branchNumberPlus) => {
    setText(undefined)
    const branchNumber = branchNumberPlus - 1
    const cid = await getBranchCid(promptId, branchNumber)
    const branchId = await getBranchId(promptId, branchNumber)
    const author = await authorById(branchId)
    setBranchId(branchId)
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`)
    setTitle(blob.data.title)
    const branches = await branchesById(promptId)
    setWriter(author)
    setBranches(branches)
    const childBranches = await branchesById(branchId)
    const tokens = await tokensById(branchId)
    setChildBranches(childBranches)
    setTokens(tokens)
    setShowNFTId(promptId)
    const showBranchNumber = branchNumber + 1
    setShowBranchNumber(showBranchNumber)
    setText(blob.data.body)
  }

  const next = async () => {
    if (branchNumber + 1 <= branches) {
      const c = branchNumber + 1
      setBranchNumber(c)
      await getPrompt(NFTId, c)
    }
  }

  const prev = async () => {
    if (branchNumber > 1) {
      const c = branchNumber - 1
      setBranchNumber(c)
      await getPrompt(NFTId, c)
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
                  >{`ROOT PROMPT ID: ${showNFTId}`}</h5>
                </Col>
                <Col>
                  <h5
                    style={{ color: 'lightgray' }}
                  >{`COMMENT: ${showBranchNumber}/${branches}`}</h5>
                </Col>
              </Row>
              <br />
              <br />
              <h5 style={{ color: 'lightgray' }}>{`PROMPT ID: ${branchId}`}</h5>
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
                  style={{ borderWidth: 0, width: '1.3rem', height: '0.95rem' }}
                  src={ccplus}
                />
              </a>
              <br />
              <br />
              <h5
                style={{ color: 'lightgray' }}
              >{`COMMENTS: ${childBranches}`}</h5>
              <h5 style={{ color: 'lightgray' }}>{`TOKENS: ${tokens}`}</h5>
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
                alt='Creative Commons Heart Logo'
                style={{ borderWidth: 0, width: '10rem', height: '10rem' }}
                src={heart}
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
            <Form inline onSubmit={(e) => getNFT(e)}>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder='Root Prompt Id : )'
                      type='number'
                      value={NFTId}
                      onChange={(e) => updateNFTId(e)}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder='Comment Number : )'
                      type='number'
                      value={branchNumber}
                      onChange={(e) => updateBranchNumber(e)}
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

export default Branches
