import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getWeb3, getContract, getContractAddress, client } from './utils.js'
import Home from './Home.js'
import New from './New.js'
import Feed from './Feed.js'
import Derivatives from './Derivatives.js'
import Sales from './Sales.js'
import Copyright from './Copyright.js'

const ModelViewer = require('@metamask/logo')
const viewer = ModelViewer({
  pxNotRatio: false,
  width: 0.5,
  height: 0.3,
  followMouse: true,
  slowDrift: false,
})

function App() {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(undefined)
  const [contractAddress, setContractAddress] = useState(undefined)
  const [length, setLength] = useState(undefined)
  const [auLength, setAuLength] = useState(undefined)
  const [noMetamask, setNoMetamask] = useState(true)

  useEffect(() => {
    const init = async () => {
      let endpointWeb3 = new Web3(
        new Web3.providers.HttpProvider(process.env.REACT_APP_MUMBAI_ENDPOINT)
      )

      let endpointContract
      try {
        endpointContract = await getContract(endpointWeb3)
      } catch (err) {
        console.log(err.message)
      }

      let contractAddress
      try {
        contractAddress = await getContractAddress(endpointWeb3)
      } catch (err) {
        console.log(err.message)
      }

      let length
      try {
        length = await endpointContract.methods.postsLenght().call()
      } catch (err) {
        console.log(err.message)
      }

      let auLength
      try {
        auLength = await endpointContract.methods.auctionsLenght().call()
      } catch (err) {
        console.log(err.message)
      }

      setWeb3(endpointWeb3)
      setAccounts(accounts)
      setContract(endpointContract)
      setContractAddress(contractAddress)
      setLength(length)
      setAuLength(auLength)
    }
    init()
  }, [])

  const connectMetamask = async () => {
    const metamaskWeb3 = await getWeb3()
    let accounts = await metamaskWeb3.eth.getAccounts()
    let contract = await getContract(metamaskWeb3)
    if (accounts.length !== 0) {
      setAccounts(accounts)
      setContract(contract)
      setNoMetamask(false)
    } else {
      alert(
        'Metamask connection failed. Make sure you have Metamask installed and connected to Polygon Mumbai Network.'
      )
    }
  }

  const disconnectMetamask = async () => {
    setAccounts([])
    setNoMetamask(true)
  }

  const updateLength = async () => {
    const length = await contract.methods.postsLenght().call()
    setLength(length)
  }

  const updateAuctionLength = async () => {
    const auLength = await contract.methods.auctionsLenght().call()
    setAuLength(auLength)
  }

  const storeString = async (string) => {
    const blob = new Blob([string])
    const cid = await client.storeBlob(blob)
    return cid
  }

  const writePost = async (title, text) => {
    let formatedJSON = JSON.stringify({ title: `${title} Λ`, body: `${text}` })
    const cid = await storeString(formatedJSON)
    const res = await contract.methods
      .publishPost(cid)
      .send({ from: accounts[0] })
    return res
  }

  const writeDerivative = async (title, newText, oldId) => {
    let formatedString = JSON.stringify({
      title: `${title} Δ`,
      body: `${newText}`,
    })
    const cid = await storeString(formatedString)
    const res = await contract.methods
      .publishPost(cid, oldId)
      .send({ from: accounts[0] })
    return res
  }

  const mintToken = async (postId) => {
    const res = await contract.methods
      .mintToken(postId)
      .send({ from: accounts[0] })
    return res
  }

  const tokenPost = async (tokenId) => {
    const postId = await contract.methods.tokenPost(tokenId).call()
    return postId
  }

  const postById = async (postId) => {
    let postCid
    try {
      postCid = await contract.methods.postCid(postId).call()
    } catch (err) {
      console.log(err.message)
    }
    return postCid
  }

  const authorById = async (postId) => {
    let postAuthor
    try {
      postAuthor = await contract.methods.postAuthor(postId).call()
    } catch (err) {
      console.log(err.message)
    }
    return postAuthor
  }

  const rootById = async (postId) => {
    let postRoot
    try {
      postRoot = await contract.methods.postRoot(postId).call()
    } catch (err) {
      console.log(err.message)
    }
    return postRoot
  }

  const derivativesById = async (postId) => {
    const derivatives = await contract.methods.postDerivatives(postId).call()
    return derivatives
  }

  const tokensById = async (postId) => {
    const tokens = await contract.methods.postTokens(postId).call()
    return tokens
  }

  const postTokenList = async (postId) => {
    const tokenList = await contract.methods.postTokenList(postId).call()
    return tokenList
  }

  const getDerivativeCid = async (postId, derivativeNumber) => {
    const derivativePostId = await contract.methods
      .derivativeId(postId, derivativeNumber)
      .call()
    const derivativeCid = await contract.methods
      .postCid(derivativePostId)
      .call()
    return derivativeCid
  }

  const getDerivativeId = async (postId, derivativeNumber) => {
    const derivativePostId = await contract.methods
      .derivativeId(postId, derivativeNumber)
      .call()
    return derivativePostId
  }

  const collectionList = async (writer) => {
    const list = await contract.methods.authorCollection(writer).call()
    return list
  }

  const addSale = async (tokenId, askPrice) => {
    await approve(contractAddress, tokenId)
    const res = await contract.methods
      .addSale(tokenId, web3.utils.toWei(`${askPrice}`, 'ether'))
      .send({ from: accounts[0] })
    return res
  }

  const removeSale = async (tokenId) => {
    const res = await contract.methods
      .removeSale(tokenId)
      .send({ from: accounts[0] })
    return res
  }

  const validPrice = async (tokenId) => {
    let price
    try {
      const validPrice = await contract.methods.validPrice(tokenId).call()
      price = web3.utils.fromWei(`${validPrice}`, 'ether')
    } catch (err) {}
    return price
  }

  const buy = async (tokenId, price) => {
    const res = await contract.methods
      .buy(tokenId)
      .send({ from: accounts[0], value: web3.utils.toWei(`${price}`, 'ether') })
    return res
  }

  const startAuction = async (tokenId, minValue, increment) => {
    const res = await contract.methods
      .startAuction(
        tokenId,
        web3.utils.toWei(`${minValue}`, 'ether'),
        web3.utils.toWei(`${increment}`, 'ether')
      )
      .send({ from: accounts[0] })
    return res
  }

  const tokenAuctions = async (postId) => {
    const auctionList = await contract.methods
      .tokenAuctionCollection(postId)
      .call()
    return auctionList
  }

  const auctionTokenId = async (auctionId) => {
    const tokenId = await contract.methods.auctionTokenId(auctionId).call()
    return tokenId
  }

  const auctionSeller = async (auctionId) => {
    const seller = await contract.methods.auctionSeller(auctionId).call()
    return seller
  }

  const auctionMinValue = async (auctionId) => {
    const minValue = await contract.methods.auctionMinValue(auctionId).call()
    return web3.utils.fromWei(minValue, 'ether')
  }

  const auctionIncrement = async (auctionId) => {
    const increment = await contract.methods.auctionIncrement(auctionId).call()
    return web3.utils.fromWei(increment, 'ether')
  }

  const auctionTimeLeft = async (auctionId) => {
    const blocksLeft = await contract.methods.auctionTimeLeft(auctionId).call()
    const timeLeft = (blocksLeft * 2.3) / 60
    return timeLeft.toFixed(1)
  }

  const auctionTopBidder = async (auctionId) => {
    const topBidder = await contract.methods.auctionTopBidder(auctionId).call()
    return topBidder
  }

  const auctionBids = async (auctionId) => {
    const bidsWei = await contract.methods.auctionBids(auctionId).call()
    let bids = []
    for (let i = 0; i < bidsWei.length; i++) {
      bids.push(`\t${web3.utils.fromWei(bidsWei[i], 'ether')} MΛTIC`)
    }
    return bids
  }

  const auctionHasPrize = async (auctionId) => {
    const tokenId = await contract.methods.auctionTokenId(auctionId).call()
    const tokenOwner = await contract.methods.ownerOf(tokenId).call()
    if (tokenOwner === contractAddress) {
      return true
    } else {
      return false
    }
  }

  const viewFunds = async (auctionId) => {
    const fundsWei = await contract.methods.funds(auctionId, accounts[0]).call()
    return web3.utils.fromWei(`${fundsWei}`, 'ether')
  }

  const placeBid = async (auctionId, bid) => {
    const res = await contract.methods
      .placeBid(auctionId)
      .send({ from: accounts[0], value: web3.utils.toWei(`${bid}`, 'ether') })
    return res
  }

  const withdrawFunds = async (auctionId) => {
    const res = await contract.methods
      .withdrawFunds(auctionId)
      .send({ from: accounts[0] })
    return res
  }

  const withdrawPrize = async (auctionId) => {
    const res = await contract.methods
      .withdrawPrize(auctionId)
      .send({ from: accounts[0] })
    return res
  }

  const ownerOf = async (tokenId) => {
    const owner = await contract.methods.ownerOf(tokenId).call()
    return owner
  }

  const balanceOf = async (owner) => {
    const balance = await contract.methods.balanceOf(owner).call()
    return balance
  }

  const transfer = async (from, to, tokenId) => {
    const res = await contract.methods
      .safeTransferFrom(from, to, tokenId)
      .send({ from: accounts[0] })
    return res
  }

  const approve = async (to, tokenId) => {
    const res = await contract.methods
      .approve(to, tokenId)
      .send({ from: accounts[0] })
    return res
  }

  if (typeof web3 === 'undefined') {
    return (
      <div className='my-5 p-5 mb-5 text-center'>
        <div
          class='spinner-border'
          style={{ width: '12rem', height: '12rem' }}
        ></div>
      </div>
    )
  }

  return (
    <Router>
      <Navbar bg='dark' variant='dark' expand='lg'>
        {noMetamask ? (
          <Container>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto font-weight-bold'>
                <Nav.Link className='px-4' bg='dark' as={Link} to={'/'}>
                  <h5>
                    <i>WHITE PΛPER</i>
                  </h5>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/posts'}>
                  <i>POSTS</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/derivatives'}>
                  <i>DERIVΛTIVES</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/sales'}>
                  <i>SΛLES</i>
                </Nav.Link>
                <Nav.Link className='px-5' onClick={() => connectMetamask()}>
                  <i>CONNECT METΛMΛSK</i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        ) : (
          <Container>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto font-weight-bold'>
                <Nav.Link className='px-4' bg='dark' as={Link} to={'/'}>
                  <h5>
                    <i>WHITE PΛPER</i>
                  </h5>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/new'}>
                  <i>NEW</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/posts'}>
                  <i>POSTS</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/derivatives'}>
                  <i>DERIVΛTIVES</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/sales'}>
                  <i>SΛLES</i>
                </Nav.Link>
                <Nav.Link className='px-5' onClick={() => disconnectMetamask()}>
                  <i>DISCONNECT METΛMΛSK</i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        )}
      </Navbar>
      <br />
      {accounts.length !== 0 && (
        <p
          style={{ color: 'silver', textAlign: 'center' }}
        >{`Λctive Λccount: ${accounts[0]}`}</p>
      )}
      <Switch>
        <Route exact path='/'>
          <Home accounts={accounts} connectMetamask={connectMetamask} />
        </Route>
        {!noMetamask && (
          <Route exact path='/new'>
            <New writePost={writePost} updateLength={updateLength} />
          </Route>
        )}
        <Route exact path='/posts'>
          <Feed
            accounts={accounts}
            length={length}
            postById={postById}
            authorById={authorById}
            rootById={rootById}
            derivativesById={derivativesById}
            tokensById={tokensById}
            writeDerivative={writeDerivative}
            updateLength={updateLength}
            collectionList={collectionList}
            validPrice={validPrice}
          />
        </Route>
        <Route exact path='/posts/:handle'>
          <Feed
            accounts={accounts}
            length={length}
            postById={postById}
            authorById={authorById}
            rootById={rootById}
            derivativesById={derivativesById}
            tokensById={tokensById}
            writeDerivative={writeDerivative}
            updateLength={updateLength}
            collectionList={collectionList}
            validPrice={validPrice}
          />
        </Route>
        <Route exact path='/derivatives'>
          <Derivatives
            length={length}
            authorById={authorById}
            derivativesById={derivativesById}
            tokensById={tokensById}
            getDerivativeCid={getDerivativeCid}
            getDerivativeId={getDerivativeId}
          />
        </Route>
        <Route exact path='/sales'>
          <Sales
            accounts={accounts}
            tokenPost={tokenPost}
            validPrice={validPrice}
            postTokenList={postTokenList}
            buy={buy}
            mintToken={mintToken}
            addSale={addSale}
            removeSale={removeSale}
            auLength={auLength}
            startAuction={startAuction}
            postById={postById}
            authorById={authorById}
            rootById={rootById}
            derivativesById={derivativesById}
            auctionTokenId={auctionTokenId}
            auctionSeller={auctionSeller}
            auctionMinValue={auctionMinValue}
            auctionIncrement={auctionIncrement}
            auctionTimeLeft={auctionTimeLeft}
            auctionTopBidder={auctionTopBidder}
            auctionBids={auctionBids}
            auctionHasPrize={auctionHasPrize}
            placeBid={placeBid}
            withdrawFunds={withdrawFunds}
            withdrawPrize={withdrawPrize}
            viewFunds={viewFunds}
            updateAuctionLength={updateAuctionLength}
            tokenAuctions={tokenAuctions}
            ownerOf={ownerOf}
            balanceOf={balanceOf}
            transfer={transfer}
            approve={approve}
          />
        </Route>
        <Route exact path='/copyright'>
          <Copyright />
        </Route>
      </Switch>
      <Container className='center'>{viewer.container[0]}</Container>
    </Router>
  )
}

export default App
