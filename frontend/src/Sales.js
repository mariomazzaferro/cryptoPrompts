import React, { useState, useEffect, useRef } from 'react'
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import ccplus from './Ccplus.jpg'
import heart from './Heart.png'

const Sales = ({
  accounts,
  tokenPost,
  validPrice,
  buy,
  mintToken,
  postTokenList,
  addSale,
  removeSale,
  startAuction,
  placeBid,
  withdrawFunds,
  withdrawPrize,
  auLength,
  postById,
  authorById,
  commentsById,
  auctionTokenId,
  auctionSeller,
  auctionMinValue,
  auctionIncrement,
  auctionTimeLeft,
  auctionTopBidder,
  auctionBids,
  auctionHasPrize,
  viewFunds,
  updateAuctionLength,
  tokenAuctions,
  ownerOf,
  balanceOf,
  transfer,
  approve,
}) => {
  const [infoTokenId, setInfoTokenId] = useState(undefined)
  const [infoShowTokenId, setInfoShowTokenId] = useState(undefined)
  const [infoPostId, setInfoPostId] = useState(undefined)
  const [infoPrice, setInfoPrice] = useState(undefined)
  const [infoOwner, setInfoOwner] = useState(undefined)

  const [postToks, setPostToks] = useState(undefined)
  const [tokenList, setTokenList] = useState(undefined)
  const [tokId, setTokId] = useState(undefined)
  const [owner, setOwner] = useState(undefined)
  const [balance, setBalance] = useState(undefined)
  const [from, setFrom] = useState(undefined)
  const [to, setTo] = useState(undefined)
  const [tokenId, setTokenId] = useState(undefined)
  const [approveTo, setApproveTo] = useState(undefined)
  const [approveId, setApproveId] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [loading4, setLoading4] = useState(false)
  const [loading5, setLoading5] = useState(false)
  const [loading6, setLoading6] = useState(false)
  const [loading7, setLoading7] = useState(false)
  const [loading8, setLoading8] = useState(false)
  const [addId, setAddId] = useState(undefined)
  const [price, setPrice] = useState(undefined)
  const [removeId, setRemoveId] = useState(undefined)
  const [auId, setAuId] = useState(undefined)
  const [auMinValue, setAuMinValue] = useState(undefined)
  const [auIncrement, setAuIncrement] = useState(undefined)
  const [auctionId, setAuctionId] = useState(undefined)
  const [viewAuctionId, setViewAuctionId] = useState(undefined)
  const [auTokenId, setAuTokenId] = useState(undefined)
  const [showId, setShowId] = useState(undefined)
  const [title, setTitle] = useState(undefined)
  const [text, setText] = useState(undefined)
  const [comments, setComments] = useState(undefined)
  const [root, setRoot] = useState(undefined)
  const [writer, setWriter] = useState(undefined)
  const [seller, setSeller] = useState(undefined)
  const [minValue, setMinValue] = useState(undefined)
  const [increment, setIncrement] = useState(undefined)
  const [timeLeft, setTimeLeft] = useState(undefined)
  const [topBidder, setTopBidder] = useState(undefined)
  const [bids, setBids] = useState(undefined)
  const [hasPrize, setHasPrize] = useState(undefined)
  const [bid, setBid] = useState(undefined)
  const [funds, setFunds] = useState(undefined)
  const [tokenAu, setTokenAu] = useState(undefined)
  const [tokenAuctionList, setTokenAuctionList] = useState([])
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef(null)
  const formRef1 = useRef(null)
  const formRef2 = useRef(null)
  const formRef3 = useRef(null)
  const formRef4 = useRef(null)
  const formRef5 = useRef(null)
  const formRef6 = useRef(null)
  const formRef7 = useRef(null)
  const formRef8 = useRef(null)

  useEffect(() => {
    setInfoTokenId(undefined)
    setInfoShowTokenId(undefined)
    setInfoPostId(undefined)
    setInfoPrice(undefined)
    setInfoOwner(undefined)
    setTokenList(undefined)
    setAuctionId(parseInt(auLength))
    setTitle(undefined)
    setWriter(undefined)
    setRoot(undefined)
    setComments(undefined)
    setShowId(undefined)
    setText(`.`)
    setSpinner(true)
  }, [auLength, accounts])

  const getAuction = async (auctionId) => {
    setText(undefined)
    setRoot(undefined)
    setAuctionId(auctionId)
    const auTokenId = await auctionTokenId(auctionId)
    const postId = await tokenPost(auTokenId)
    const author = await authorById(postId)
    const comments = await commentsById(postId)
    const seller = await auctionSeller(auctionId)
    const minValue = await auctionMinValue(auctionId)
    const increment = await auctionIncrement(auctionId)
    const timeLeft = await auctionTimeLeft(auctionId)
    const topBidder = await auctionTopBidder(auctionId)
    const bids = await auctionBids(auctionId)
    const hasPrize = await auctionHasPrize(auctionId)
    let funds
    if (accounts.length !== 0) {
      funds = await viewFunds(auctionId)
    }
    const cid = await postById(postId)
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`)
    setTitle(blob.data.title)
    if (blob.data.root) {
      setRoot(blob.data.root)
    }
    setWriter(author)
    setComments(comments)
    setAuTokenId(auTokenId)
    setShowId(postId)
    setSeller(seller)
    setMinValue(minValue)
    setIncrement(increment)
    setTimeLeft(timeLeft)
    setTopBidder(topBidder)
    setBids(bids)
    setHasPrize(hasPrize)
    setFunds(funds)
    setText(blob.data.body)
  }

  const next = async () => {
    if (auLength > 0) {
      if (0 < auctionId) {
        const c = auctionId - 1
        setAuctionId(c)
        await getAuction(c)
      } else {
        setAuctionId(auLength - 1)
        await getAuction(auLength - 1)
      }
    }
  }

  const prev = async () => {
    if (auLength > 0) {
      if (auctionId < auLength - 1) {
        const c = auctionId + 1
        setAuctionId(c)
        await getAuction(c)
      } else {
        updateAuctionLength()
        setAuctionId(0)
        await getAuction(0)
      }
    }
  }

  const updateTokenInfo = (e) => {
    setInfoShowTokenId(undefined)
    setInfoPostId(undefined)
    setInfoPrice(undefined)
    setInfoOwner(undefined)
    const id = e.target.value
    setInfoTokenId(id)
  }

  const getTokenInfo = async (e) => {
    e.preventDefault()
    let infoPostId
    let infoPrice
    let infoOwner
    if (infoTokenId) {
      infoPostId = await tokenPost(infoTokenId)
      infoPrice = await validPrice(infoTokenId)
      infoOwner = await ownerOf(infoTokenId)

      formRef8.current.reset()

      setInfoShowTokenId(infoTokenId)
      setInfoPostId(infoPostId)
      setInfoPrice(infoPrice)
      setInfoOwner(infoOwner)
    }
  }

  const buyToken = async () => {
    if (accounts.length !== 0 && infoPrice && infoShowTokenId) {
      setLoading8(true)
      let res
      try {
        res = await buy(infoShowTokenId, infoPrice)
      } catch (err) {
        console.log(err)
      }
      if (res) {
        if (res.status) {
          alert(`Successful Purchase of LΛN Id ${infoShowTokenId}`)
        } else {
          alert('Purchase Failed')
        }
      } else {
        alert(
          `LΛN purchase is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/`
        )
      }

      setLoading8(false)
      setInfoShowTokenId(undefined)
      setInfoPostId(undefined)
      setInfoPrice(undefined)
      setInfoOwner(undefined)
    }
  }

  const updatePostToks = (e) => {
    setTokenList(undefined)
    const id = e.target.value
    setPostToks(id)
  }

  const getPostToks = async (e) => {
    e.preventDefault()
    let tokenList
    if (postToks) {
      tokenList = await postTokenList(postToks)
    }
    setTokenList(tokenList)
  }

  const updateTokId = (e) => {
    const id = e.target.value
    setTokId(id)
  }

  const mintTok = async (e) => {
    e.preventDefault()
    if (tokId) {
      setLoading7(true)
      let res
      try {
        res = await mintToken(tokId)
      } catch (err) {
        console.log(err.message)
      }
      formRef7.current.reset()
      setLoading7(false)
      if (res) {
        if (res.status) {
          const newId = res.events.Transfer.returnValues[2]
          alert(`LΛN Id ${newId} minted successfully`)
        } else {
          alert('Minting failed')
        }
      } else {
        alert(
          'Minting is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
        )
      }
    }
  }

  const updateAddId = (e) => {
    const addId = e.target.value
    setAddId(addId)
  }

  const updatePrice = (e) => {
    const price = e.target.value
    setPrice(price)
  }

  const putForSale = async (e) => {
    e.preventDefault()
    if (addId && price) {
      setLoading3(true)
      let res
      try {
        res = await addSale(addId, price)
      } catch (err) {
        console.log(err.message)
      }
      if (res) {
        if (res.status) {
          alert('Sale added successfully')
          setAddId(undefined)
          setPrice(undefined)
          formRef3.current.reset()
        } else {
          alert('Sale update failed')
        }
      } else {
        alert(
          'Sale creation is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
        )
      }
      setLoading3(false)
    }
  }

  const updateRemoveId = (e) => {
    const removeId = e.target.value
    setRemoveId(removeId)
  }

  const removeFromSale = async (e) => {
    e.preventDefault()
    if (removeId) {
      setLoading4(true)
      let res
      try {
        res = await removeSale(removeId)
      } catch (err) {
        console.log(err.message)
      }
      if (res) {
        if (res.status) {
          alert('Sale removed successfully')
          setRemoveId(undefined)
          formRef4.current.reset()
        } else {
          alert('Sale update failed')
        }
      } else {
        alert(
          'Sale update is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
        )
      }
      setLoading4(false)
    }
  }

  const updateAuId = (e) => {
    const auId = e.target.value
    setAuId(auId)
  }

  const updateAuMinValue = (e) => {
    const auMinValue = e.target.value
    setAuMinValue(auMinValue)
  }

  const updateAuIncrement = (e) => {
    const auIncrement = e.target.value
    setAuIncrement(auIncrement)
  }

  const newAuction = async (e) => {
    e.preventDefault()
    if (auId && auMinValue && auIncrement) {
      setLoading5(true)
      let res
      try {
        res = await startAuction(auId, auMinValue, auIncrement)
      } catch (err) {
        console.log(err.message)
      }
      if (res) {
        if (res.status) {
          alert('Auction started successfully')
          setAuId(undefined)
          setAuMinValue(undefined)
          setAuIncrement(undefined)
          formRef5.current.reset()
        } else {
          alert('Auction failed')
        }
      } else {
        alert(
          'Auction creation is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
        )
      }
      updateAuctionLength()
      setLoading5(false)
    }
  }

  const updateBid = (e) => {
    const bid = e.target.value
    setBid(bid)
  }

  const transferFunds = async (e) => {
    e.preventDefault()
    if (bid) {
      setLoading(true)
      let res
      try {
        res = await placeBid(auctionId, bid)
      } catch (err) {
        console.log(err.message)
      }
      if (res) {
        if (res.status) {
          alert('Funds transfered successfully')
          setBid(undefined)
          formRef.current.reset()
        } else {
          alert('Transfer failed')
        }
      } else {
        alert(
          'Bidding is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
        )
      }
      await getAuction(auctionId)
      setLoading(false)
    }
  }

  const getPrize = async () => {
    setLoading6(true)
    let res
    try {
      res = await withdrawPrize(auctionId)
    } catch (err) {
      console.log(err.message)
    }
    if (res) {
      if (res.status) {
        alert('Withdraw succeeded')
      } else {
        alert('Withdraw failed')
      }
    } else {
      alert(
        'Withdraw is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
      )
    }
    await getAuction(auctionId)
    setLoading6(false)
  }

  const getFunds = async () => {
    setLoading6(true)
    let res
    try {
      res = await withdrawFunds(auctionId)
    } catch (err) {
      console.log(err.message)
    }
    if (res) {
      if (res.status) {
        alert('Withdraw succeeded')
      } else {
        alert('Withdraw failed')
      }
    } else {
      alert(
        'Withdraw is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
      )
    }
    await getAuction(auctionId)
    setLoading6(false)
  }

  const updateTokenAu = (e) => {
    const tokenAu = e.target.value
    setTokenAu(tokenAu)
    setTokenAuctionList([])
  }

  const getTokenAuctions = async (e) => {
    e.preventDefault()
    if (tokenAu) {
      let tokenAuctionList = []
      try {
        tokenAuctionList = await tokenAuctions(tokenAu)
      } catch (err) {
        console.log(err.message)
      }
      setTokenAuctionList(tokenAuctionList)
    }
  }

  const updateViewAuctionId = (e) => {
    const viewAuctionId = e.target.value
    setViewAuctionId(viewAuctionId)
  }

  const viewAuction = async (e) => {
    e.preventDefault()
    if (viewAuctionId && viewAuctionId < auLength) {
      await getAuction(viewAuctionId)
    }
    setViewAuctionId(undefined)
    formRef6.current.reset()
  }

  const updateOwner = (e) => {
    const owner = e.target.value
    setOwner(owner)
    setBalance(undefined)
  }

  const getBalance = async (e) => {
    e.preventDefault()
    try {
      let balance = await balanceOf(owner)
      setBalance(balance)
    } catch (err) {}
  }

  const updateFrom = (e) => {
    const from = e.target.value
    setFrom(from)
  }

  const updateTo = (e) => {
    const to = e.target.value
    setTo(to)
  }

  const updateTokenId = (e) => {
    const tokenId = e.target.value
    setTokenId(tokenId)
  }

  const transferToken = async (e) => {
    e.preventDefault()
    if (from && to && tokenId) {
      setLoading1(true)
      let res
      try {
        res = await transfer(from, to, tokenId)
      } catch (err) {
        console.log(err.message)
      }
      if (res) {
        if (res.status) {
          alert('LΛN transfer successful')
        } else {
          alert('LΛN transfer failed')
        }
      } else {
        alert(
          'Transfer is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
        )
      }
      setFrom(undefined)
      setTo(undefined)
      setTokenId(undefined)
      formRef1.current.reset()
      setLoading1(false)
    }
  }

  const updateApproveTo = (e) => {
    const to = e.target.value
    setApproveTo(to)
  }

  const updateApproveId = (e) => {
    const tokenId = e.target.value
    setApproveId(tokenId)
  }

  const approveAddress = async (e) => {
    e.preventDefault()
    if (approveTo && approveId) {
      setLoading2(true)
      let res
      try {
        res = await approve(approveTo, approveId)
      } catch (err) {
        console.log(err.message)
      }
      if (res) {
        if (res.status) {
          alert('Address approved successfully')
        } else {
          alert('Address approve failed')
        }
      } else {
        alert(
          'Approve is taking too long. The transaction might still be mined. Wait a while and then check your address transactions on https://polygonscan.com/'
        )
      }
      setApproveTo(undefined)
      setApproveId(undefined)
      formRef2.current.reset()
      setLoading2(false)
    }
  }

  return (
    <div>
      <Container>
        <Card
          className='shadow-lg p-3 mb-1 bg-white rounded'
          style={{ width: 'auto', maxWidth: '57rem' }}
        >
          <Card.Body>
            <Card.Title>
              <Form ref={formRef8} inline onSubmit={(e) => getTokenInfo(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='LΛN Id : )'
                        type='number'
                        onChange={(e) => updateTokenInfo(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Get LΛN's Information</i>
                      </Button>
                    </Col>
                    <Col>
                      {accounts.length !== 0 && (
                        <div>
                          <Button
                            onClick={() => buyToken()}
                            variant='dark'
                            className='font-weight-bold'
                            style={{ color: 'silver' }}
                          >
                            <i>Buy LΛN $$</i>
                          </Button>
                          {loading8 && <div class='spinner-border'></div>}
                        </div>
                      )}
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Title>
            <Card.Text>
              <h5>{infoShowTokenId && `LΛN Id: ${infoShowTokenId}`}</h5>
              <h5>{infoPostId && `LΛN's Post Id: ${infoPostId}`}</h5>
              <h5>{infoOwner && `LΛN's Owner: ${infoOwner}`}</h5>
              <h5>
                {infoShowTokenId &&
                  infoPrice &&
                  `LΛN's Price: ${infoPrice} MΛTIC`}
              </h5>
              <h5>{infoShowTokenId && !infoPrice && `LΛN not for sale`}</h5>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          className='shadow-lg p-3 mb-1 bg-white rounded'
          style={{ width: 'auto', maxWidth: '57rem' }}
        >
          <Card.Body>
            <Card.Title>
              <Form inline onSubmit={(e) => getPostToks(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='Post Id : )'
                        type='number'
                        onChange={(e) => updatePostToks(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Get Post's LΛN List</i>
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Title>
            <Card.Text>
              <h5>{tokenList && `Post's List of LΛN Ids: ${tokenList}`}</h5>
            </Card.Text>
          </Card.Body>
        </Card>

        {accounts.length !== 0 && (
          <Card
            className='shadow-lg p-3 mb-5 bg-white rounded'
            style={{ width: 'auto', maxWidth: '57rem' }}
          >
            <Card.Body>
              <Card.Title>
                <Form ref={formRef7} inline onSubmit={(e) => mintTok(e)}>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Control
                          placeholder='Post Id : )'
                          type='number'
                          onChange={(e) => updateTokId(e)}
                        ></Form.Control>
                      </Col>
                      <Col>
                        <Button
                          variant='dark'
                          type='submit'
                          className='font-weight-bold'
                          style={{ color: 'silver' }}
                        >
                          <i>Mint New LΛN $</i>
                        </Button>
                        {loading7 && <div class='spinner-border'></div>}
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Title>
            </Card.Body>
          </Card>
        )}
      </Container>
      <br />
      <br />
      <br />

      {accounts.length !== 0 && (
        <Container>
          <Card
            className='shadow-lg p-3 mb-1 bg-white rounded'
            style={{ width: 'auto', maxWidth: '57rem' }}
          >
            <Card.Body>
              <Form inline ref={formRef3} onSubmit={(e) => putForSale(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='LΛN Id : )'
                        type='number'
                        onChange={(e) => updateAddId(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder='Sale Price (MΛTIC) : )'
                        type='string'
                        onChange={(e) => updatePrice(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Put LΛN up for Sale $</i>
                      </Button>
                      {loading3 && <div class='spinner-border'></div>}
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card
            className='shadow-lg p-3 mb-5 bg-white rounded'
            style={{ width: 'auto', maxWidth: '57rem' }}
          >
            <Card.Body>
              <Form inline ref={formRef4} onSubmit={(e) => removeFromSale(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='LΛN Id : )'
                        type='number'
                        onChange={(e) => updateRemoveId(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Remove LΛN from Sale $</i>
                      </Button>
                      {loading4 && <div class='spinner-border'></div>}
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <br />
          <br />
          <br />
          <Card
            className='shadow-lg p-3 mb-3 bg-white rounded'
            style={{ width: 'auto' }}
          >
            <Card.Body>
              <Form inline ref={formRef5} onSubmit={(e) => newAuction(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='LΛN Id : )'
                        type='number'
                        onChange={(e) => updateAuId(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder='Minimal Value (MΛTIC) : )'
                        type='string'
                        onChange={(e) => updateAuMinValue(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder='Increment (MΛTIC) : )'
                        type='string'
                        onChange={(e) => updateAuIncrement(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Start Λuction $</i>
                      </Button>
                      {loading5 && <div class='spinner-border'></div>}
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )}

      <Container>
        <Row>
          <Col>
            <Button
              onClick={() => prev()}
              variant='dark'
              className='font-weight-bold'
              style={{ color: 'silver' }}
            >
              <i>Previous Λuction</i>
            </Button>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button
              onClick={() => next()}
              variant='dark'
              className='font-weight-bold'
              style={{ color: 'silver' }}
            >
              <i>Next Λuction</i>
            </Button>
          </Col>
        </Row>
        <br />
        {text && title ? (
          <Card
            className='shadow-lg p-3 mb-3 bg-white rounded text-center'
            style={{ width: 'auto' }}
          >
            <Card.Body>
              <Card.Title>
                <h5
                  style={{ color: 'lightgray' }}
                >{`ΛUCTION ID: ${auctionId}`}</h5>
                <br />
                <h5 style={{ color: 'lightgray' }}>{`LΛN ID: ${auTokenId}`}</h5>
                <br />
                <h5
                  style={{ color: 'lightgray' }}
                >{`LΛN'S POST ID: ${showId}`}</h5>
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
                    style={{
                      borderWidth: 0,
                      width: '1.3rem',
                      height: '0.95rem',
                    }}
                    src={ccplus}
                  />
                </a>
                <br />
                <br />
                {root && (
                  <h5
                    style={{ color: 'lightgray' }}
                  >{`ROOT POST ID: ${root}`}</h5>
                )}
                <h5
                  style={{ color: 'lightgray' }}
                >{`COMMENTS: ${comments}`}</h5>
                <br />
                <h5 style={{ color: 'lightgray' }}>{`SELLER: ${seller}`}</h5>
                <h5
                  style={{ color: 'lightgray' }}
                >{`MINIMΛL VΛLUE: ${minValue} MΛTIC`}</h5>
                <h5
                  style={{ color: 'lightgray' }}
                >{`MINIMΛL INCREMENT: ${increment} MΛTIC`}</h5>
                <h5
                  style={{ color: 'lightgray' }}
                >{`TOP BIDDER: ${topBidder}`}</h5>
                {bids.length !== 0 && (
                  <h5 style={{ color: 'lightgray' }}>{`BIDS: ${bids}`}</h5>
                )}
                {funds && (
                  <h5
                    style={{ color: 'lightgray' }}
                  >{`YOUR FUNDS: ${funds} MΛTIC`}</h5>
                )}
                {timeLeft > 0 ? (
                  <h5
                    style={{ color: 'lightgray' }}
                  >{`TIME LEFT: ${timeLeft} minutes`}</h5>
                ) : (
                  <h5 style={{ color: 'lightgray' }}>{`TIME LEFT: 0`}</h5>
                )}

                {timeLeft <= 0 &&
                  accounts.length !== 0 &&
                  showId !== undefined && (
                    <div>
                      {accounts[0] === seller || accounts[0] === topBidder ? (
                        <div>
                          {hasPrize === true && (
                            <Button
                              onClick={() => getPrize()}
                              variant='dark'
                              className='font-weight-bold'
                              style={{ color: 'silver' }}
                            >
                              <i>Withdraw Prize $</i>
                            </Button>
                          )}
                          {loading6 && (
                            <div>
                              <br />
                              <div class='spinner-border'></div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {funds != 0 && (
                            <Button
                              onClick={() => getFunds()}
                              variant='dark'
                              className='font-weight-bold'
                              style={{ color: 'silver' }}
                            >
                              <i>Withdraw Funds $</i>
                            </Button>
                          )}
                          {loading6 && (
                            <div>
                              <br />
                              <div class='spinner-border'></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                {accounts.length !== 0 && showId !== undefined && timeLeft > 0 && (
                  <Form ref={formRef} onSubmit={(e) => transferFunds(e)}>
                    <Form.Group>
                      <br />
                      <Form.Control
                        onChange={(e) => updateBid(e)}
                        style={{ textAlign: 'center' }}
                        as='textarea'
                        rows='1'
                        placeholder='Bid : )'
                      ></Form.Control>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Bid $$</i>
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
            className='shadow-lg p-3 mb-3 bg-white rounded text-center'
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
                <Form inline onSubmit={(e) => getTokenAuctions(e)}>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Control
                          placeholder='LΛN Id : )'
                          type='number'
                          onChange={(e) => updateTokenAu(e)}
                        ></Form.Control>
                      </Col>
                      <Col>
                        <Button
                          variant='dark'
                          type='submit'
                          className='font-weight-bold'
                          style={{ color: 'silver' }}
                        >
                          <i>Get LΛN's Λuctions</i>
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Title>
              <Card.Text>
                <h5>
                  {tokenAuctionList.length !== 0 &&
                    `LΛN's Λuction Ids: ${tokenAuctionList}`}
                </h5>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            className='shadow-lg p-3 mb-5 ml-3 bg-white rounded'
            style={{ width: 'auto', maxWidth: '25rem', maxHeight: '7.7rem' }}
          >
            <Card.Body>
              <Card.Title>
                <Form ref={formRef6} inline onSubmit={(e) => viewAuction(e)}>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Control
                          placeholder='Λuction Id : )'
                          type='number'
                          onChange={(e) => updateViewAuctionId(e)}
                        ></Form.Control>
                      </Col>
                      <Col>
                        <Button
                          variant='dark'
                          type='submit'
                          className='font-weight-bold'
                          style={{ color: 'silver' }}
                        >
                          <i>View Λuction</i>
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
      <br />
      <br />
      <br />
      <Container>
        <Card
          className='shadow-lg p-3 mb-1 bg-white rounded'
          style={{ width: 'auto', maxWidth: '57rem' }}
        >
          <Card.Body>
            <Card.Title>
              <Form inline onSubmit={(e) => getBalance(e)}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder='Λddress : )'
                        type='string'
                        onChange={(e) => updateOwner(e)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Button
                        variant='dark'
                        type='submit'
                        className='font-weight-bold'
                        style={{ color: 'silver' }}
                      >
                        <i>Get LΛN Balance for this Λddress</i>
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Title>
            <Card.Text>
              <h5>{owner && balance && `LΛN Balance: ${balance}`}</h5>
            </Card.Text>
          </Card.Body>
        </Card>

        {accounts.length !== 0 && (
          <div>
            <Card
              className='shadow-lg p-3 mb-1 bg-white rounded'
              style={{ width: 'auto', maxWidth: '57rem' }}
            >
              <Card.Body>
                <Card.Title>
                  <Form
                    inline
                    ref={formRef1}
                    onSubmit={(e) => transferToken(e)}
                  >
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Control
                            placeholder='Λddress From : ('
                            type='string'
                            onChange={(e) => updateFrom(e)}
                          ></Form.Control>
                        </Col>
                        <Col>
                          <Form.Control
                            placeholder='Λddress To : )'
                            type='string'
                            onChange={(e) => updateTo(e)}
                          ></Form.Control>
                        </Col>
                        <Col>
                          <Form.Control
                            placeholder='LΛN Id : )'
                            type='number'
                            onChange={(e) => updateTokenId(e)}
                          ></Form.Control>
                        </Col>
                        <Col>
                          <Button
                            variant='dark'
                            type='submit'
                            className='font-weight-bold'
                            style={{ color: 'silver' }}
                          >
                            <i>Transfer LΛN $</i>
                          </Button>
                          {loading1 && <div class='spinner-border'></div>}
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>

            <Card
              className='shadow-lg p-3 mb-1 bg-white rounded'
              style={{ width: 'auto', maxWidth: '57rem' }}
            >
              <Card.Body>
                <Card.Title>
                  <Form
                    inline
                    ref={formRef2}
                    onSubmit={(e) => approveAddress(e)}
                  >
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Control
                            placeholder='Λddress To : )'
                            type='string'
                            onChange={(e) => updateApproveTo(e)}
                          ></Form.Control>
                        </Col>
                        <Col>
                          <Form.Control
                            placeholder='LΛN Id : )'
                            type='number'
                            onChange={(e) => updateApproveId(e)}
                          ></Form.Control>
                        </Col>
                        <Col>
                          <Button
                            variant='dark'
                            type='submit'
                            className='font-weight-bold'
                            style={{ color: 'silver' }}
                          >
                            <i>Λpprove to Transfer $</i>
                          </Button>
                          {loading2 && <div class='spinner-border'></div>}
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
        <br />
      </Container>
    </div>
  )
}

export default Sales
