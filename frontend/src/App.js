import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getWeb3, getContract, getContractAddress, client } from './utils.js'
import Home from './Home.js'
import New from './New.js'
import Feed from './Feed.js'
import Branches from './Branches.js'
import Sales from './Sales.js'
import About from './About.js'
import Copyrights from './Copyrights.js'

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
        new Web3.providers.HttpProvider(process.env.REACT_APP_POLYGON_ENDPOINT)
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
        length = await endpointContract.methods.promptsLenght().call()
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
        'Metamask connection failed. Make sure you have Metamask installed and connected to Polygon Mainnet.'
      )
    }
  }

  const disconnectMetamask = async () => {
    setAccounts([])
    setNoMetamask(true)
  }

  const updateLength = async () => {
    const length = await contract.methods.promptsLenght().call()
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

  const writePrompt = async (title, text) => {
    let formatedJSON = JSON.stringify({ title: `${title}`, body: `${text}` })
    const cid = await storeString(formatedJSON)
    const res = await contract.methods
      .publishPrompt(cid)
      .send({ from: accounts[0] })
    return res
  }

  const branchify = async (title, newText, oldText, oldId) => {
    let formatedString = JSON.stringify({
      title: `${title}`,
      body: `${oldText}\nΛ${newText}`,
      root: oldId,
    })
    const cid = await storeString(formatedString)
    const res = await contract.methods
      .publishPrompt(cid, oldId)
      .send({ from: accounts[0] })
    return res
  }

  const mintToken = async (promptId) => {
    const res = await contract.methods
      .mintToken(promptId)
      .send({ from: accounts[0] })
    return res
  }

  const tokenPrompt = async (tokenId) => {
    const promptId = await contract.methods.tokenPrompt(tokenId).call()
    return promptId
  }

  const promptById = async (promptId) => {
    const promptCid = await contract.methods.promptCid(promptId).call()
    return promptCid
  }

  const authorById = async (promptId) => {
    const promptAuthor = await contract.methods.promptAuthor(promptId).call()
    return promptAuthor
  }

  const branchesById = async (promptId) => {
    const branches = await contract.methods.promptBranches(promptId).call()
    return branches
  }

  const tokensById = async (promptId) => {
    const tokens = await contract.methods.promptTokens(promptId).call()
    return tokens
  }

  const promptTokenList = async (promptId) => {
    const tokenList = await contract.methods.promptTokenList(promptId).call()
    return tokenList
  }

  const getBranchCid = async (promptId, branchNumber) => {
    const branchPromptId = await contract.methods
      .branchId(promptId, branchNumber)
      .call()
    const branchCid = await contract.methods.promptCid(branchPromptId).call()
    return branchCid
  }

  const getBranchId = async (promptId, branchNumber) => {
    const branchPromptId = await contract.methods
      .branchId(promptId, branchNumber)
      .call()
    return branchPromptId
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

  const tokenAuctions = async (promptId) => {
    const auctionList = await contract.methods
      .tokenAuctionCollection(promptId)
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
                <Nav.Link className='px-5' as={Link} to={'/prompts'}>
                  <i>PROMPTS</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/comments'}>
                  <i>COMMENTS</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/sales'}>
                  <i>SΛLES</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/about'}>
                  <i>ΛBOUT</i>
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
                <Nav.Link className='px-4' as={Link} to={'/prompts'}>
                  <i>PROMPTS</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/comments'}>
                  <i>COMMENTS</i>
                </Nav.Link>
                <Nav.Link className='px-4' as={Link} to={'/sales'}>
                  <i>SΛLES</i>
                </Nav.Link>
                <Nav.Link className='px-5' as={Link} to={'/about'}>
                  <i>ΛBOUT</i>
                </Nav.Link>
                <Nav.Link className='px-2' onClick={() => disconnectMetamask()}>
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
            <New writePrompt={writePrompt} updateLength={updateLength} />
          </Route>
        )}
        <Route exact path='/prompts'>
          <Feed
            accounts={accounts}
            length={length}
            promptById={promptById}
            authorById={authorById}
            branchesById={branchesById}
            tokensById={tokensById}
            branchify={branchify}
            updateLength={updateLength}
            collectionList={collectionList}
            validPrice={validPrice}
          />
        </Route>
        <Route exact path='/comments'>
          <Branches
            length={length}
            authorById={authorById}
            branchesById={branchesById}
            tokensById={tokensById}
            getBranchCid={getBranchCid}
            getBranchId={getBranchId}
          />
        </Route>
        <Route exact path='/sales'>
          <Sales
            accounts={accounts}
            tokenPrompt={tokenPrompt}
            validPrice={validPrice}
            promptTokenList={promptTokenList}
            buy={buy}
            mintToken={mintToken}
            addSale={addSale}
            removeSale={removeSale}
            auLength={auLength}
            startAuction={startAuction}
            promptById={promptById}
            authorById={authorById}
            branchesById={branchesById}
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
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/copyrights'>
          <Copyrights />
        </Route>
      </Switch>
      <Container className='center'>{viewer.container[0]}</Container>
    </Router>
  )
}

export default App
