import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getWeb3, getContract, getContractAddress, client } from './utils.js';
import Home from './Home.js';
import New from './New.js';
import Feed from './Feed.js';
import Branches from './Branches.js';
import Sales from './Sales.js';
import About from './About.js';

const ModelViewer = require('@metamask/logo');
const viewer = ModelViewer({
  pxNotRatio: false,
  width: 0.5,
  height: 0.3,
  followMouse: true,
  slowDrift: false,
});

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);
  const [counter, setCounter] = useState(undefined);
  const [auLength, setAuLength] = useState(undefined);
  const [noMetamask, setNoMetamask] = useState(true);

  useEffect(() => {
    const init = async () => {
      let endpointWeb3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_MUMBAI_ENDPOINT));

      let endpointContract;
      try {
        endpointContract = await getContract(endpointWeb3);
      } catch(err) {
        console.log(err.message);  
      }

      let contractAddress;
      try {
        contractAddress = await getContractAddress(endpointWeb3);
      } catch(err) {
        console.log(err.message);  
      }

      let counter;
      try {
        counter = await endpointContract.methods.counter().call();
      } catch(err) {
        console.log(err.message);  
      }

      let auLength;
      try {
        auLength = await endpointContract.methods.auctionsLenght().call();
      } catch(err) {
        console.log(err.message);  
      }

      setWeb3(endpointWeb3);
      setAccounts(accounts);
      setContract(endpointContract);
      setContractAddress(contractAddress);
      setCounter(counter);
      setAuLength(auLength);
    };
    init();
  }, []);

  const connectMetamask = async () => {
    const metamaskWeb3 = await getWeb3();
    let accounts = await metamaskWeb3.eth.getAccounts();
    let contract = await getContract(metamaskWeb3);
    if(accounts.length !== 0) {
      setAccounts(accounts);
      setContract(contract);
      setNoMetamask(false);
    } else {
      alert("Metamask connection failed. Make sure you have Metamask installed and connected to Polygon Mainnet.")
    }
  }

  const disconnectMetamask = async () => {
    setAccounts([]);
    setNoMetamask(true);
  }

  const updateCounter = async () => {
    const c = await contract.methods.counter().call();
    setCounter(c);
  }

  const updateAuctionLength = async () => {
    const auLength = await contract.methods.auctionsLenght().call();
    setAuLength(auLength);
  }

  const ownerOf = async nftId => {
    const owner = await contract.methods.ownerOf(nftId).call();
    return owner;
  }

  const balanceOf = async owner => {
    const balance = await contract.methods.balanceOf(owner).call();
    return balance;
  }

  const transfer = async (from, to, tokenId) => {
    const res = await contract.methods.safeTransferFrom(from, to, tokenId).send({from: accounts[0]});
    return res.status;
  }

  const approve = async (to, tokenId) => {
    const res = await contract.methods.approve(to, tokenId).send({from: accounts[0]});
    return res.status;
  }

  const storeString = async string => {
    const blob = new Blob([string]);
    const cid = await client.storeBlob(blob);
    return cid;
  };

  const branchify = async (title, newText, oldText, oldId) => {
    let formatedString = JSON.stringify({ title: `${title}`, body: `${oldText}\nΛ${newText}`, writer: `${accounts[0]}`, root: oldId });
    const cid = await storeString(formatedString);
    const res = await contract.methods.mintPrompt(cid, oldId).send({from: accounts[0] });
    return res;
  };

  const writePrompt = async (title, text) => {
    let formatedJSON = JSON.stringify({ title: `${title}`, body: `${text}`, writer: `${accounts[0]}` });
    const cid = await storeString(formatedJSON);
    const res = await contract.methods.mintPrompt(cid).send({from: accounts[0] });
    return res;
  };

  const promptById = async promptId => {
    const promptCid = await contract.methods.promptCids(promptId).call();
    return promptCid;
  };

  const branchesById = async promptId => {
    const branches = await contract.methods.promptBranches(promptId).call();
    return branches;
  };

  const getBranchCid = async (promptId, branchId) => {
    const branchPromptId = await contract.methods.branches(promptId, branchId).call();
    const branchCid = await contract.methods.promptCids(branchPromptId).call();
    return branchCid;
  }

  const getBranchId = async (promptId, branchId) => {
    const branchPromptId = await contract.methods.branches(promptId, branchId).call();
    return branchPromptId;
  }

  const collectionList = async writer => {
    const list = await contract.methods.writerCollection(writer).call();
    return list;
  }

  const addSale = async (promptId, askPrice) => {
    await approve(contractAddress, promptId);
    const res = await contract.methods.addSale(promptId, web3.utils.toWei(`${askPrice}`,"ether")).send({from: accounts[0] });
    return res.status;
  }

  const removeSale = async (promptId) => {
    const res = await contract.methods.removeSale(promptId).send({from: accounts[0] });
    return res.status;
  }

  const validPrice = async (promptId) => {
    let price;
    try {
      const validPrice = await contract.methods.validPrice(promptId).call();
      price = web3.utils.fromWei(`${validPrice}`,"ether");
    } catch(err) {}
    return price;
  }

  const buy = async (promptId, price) => {
    const res = await contract.methods.buy(promptId).send({from: accounts[0], value: web3.utils.toWei(`${price}`,"ether") });
    return res.status;
  }

  const startAuction = async (promptId, minValue, increment) => {
    const res = await contract.methods.startAuction(promptId, minValue, increment).send({from: accounts[0] });
    return res.status;
  }

  const promptAuctions = async (promptId) => {
    const auctionList = await contract.methods.promptAuctionCollection(promptId).call();
    return auctionList;
  }

  const auctionPromptId = async (auctionId) => {
    const promptId = await contract.methods.auctionPromptId(auctionId).call();
    return promptId;
  }

  const auctionSeller = async (auctionId) => {
    const seller = await contract.methods.auctionSeller(auctionId).call();
    return seller;
  }

  const auctionMinValue = async (auctionId) => {
    const minValue = await contract.methods.auctionMinValue(auctionId).call();
    return minValue;
  }

  const auctionIncrement = async (auctionId) => {
    const increment = await contract.methods.auctionIncrement(auctionId).call();
    return increment;
  }

  const auctionTimeLeft = async (auctionId) => {
    const timeLeft = await contract.methods.auctionTimeLeft(auctionId).call();
    return timeLeft;
  }

  const auctionTopBidder = async (auctionId) => {
    const topBidder = await contract.methods.auctionTopBidder(auctionId).call();
    return topBidder;
  }

  const auctionBids = async (auctionId) => {
    const bidsWei = await contract.methods.auctionBids(auctionId).call();
    let bids = [];
    for(let i=0; i < bidsWei.length; i++) {
      bids.push(`\t${web3.utils.fromWei(bidsWei[i],"ether")} MATIC`);
    }
    return bids;
  }

  const auctionHasPrize = async (auctionId) => {
    const topBidder = await contract.methods.auctionTopBidder(auctionId).call();
    const fundsWei = await contract.methods.funds(auctionId, topBidder).call();
    const funds = web3.utils.fromWei(`${fundsWei}`,"ether");
    if(funds != 0) {
      return true;
    } else {
      return false;
    }
  }

  const viewFunds = async (auctionId) => {
    const fundsWei = await contract.methods.funds(auctionId, accounts[0]).call();
    return web3.utils.fromWei(`${fundsWei}`,"ether");
  }

  const placeBid = async (auctionId, bid) => {
    const res = await contract.methods.placeBid(auctionId).send({from: accounts[0], value: web3.utils.toWei(`${bid}`,"ether") });
    return res.status;
  }

  const withdrawFunds = async (auctionId) => {
    const res = await contract.methods.withdrawFunds(auctionId).send({from: accounts[0] });
    return res.status;
  }

  const withdrawPrize = async (auctionId) => {
    const res = await contract.methods.withdrawPrize(auctionId).send({from: accounts[0] });
    return res.status;
  }

  if(
    typeof web3 === 'undefined'
  ) {
    return (
      <div className="my-5 p-5 mb-5 text-center">
        <div class="spinner-border" style={{ width: '12rem', height: '12rem'}}></div>
      </div>
    )
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        {
          noMetamask ?
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto font-weight-bold">
          
          <Nav.Link className="px-4" bg="dark" as={Link} to={"/"}><h5><i>CRYPTOΛPROMPTS</i></h5></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/feed"}><i>FEED</i></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/branches"}><i>BRANCHES</i></Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/sales"}><i>SALES</i></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/about"}><i>ABOUT</i></Nav.Link>
          <Nav.Link className="px-4" onClick={() => connectMetamask()}><i>CONNECT METAMASK</i></Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
          :
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto font-weight-bold">
          
          <Nav.Link className="px-4" bg="dark" as={Link} to={"/"}><h5><i>CRYPTOΛPROMPTS</i></h5></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/new"}><i>NEW</i></Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/feed"}><i>FEED</i></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/branches"}><i>BRANCHES</i></Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/sales"}><i>SALES</i></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/about"}><i>ABOUT</i></Nav.Link>
          <Nav.Link className="px-2" onClick={() => disconnectMetamask()}><i>DISCONNECT METAMASK</i></Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
        }
      </Navbar>
      <br/>
      {accounts.length !== 0 && <p style={{color: "silver", textAlign: "center"}}>{`Active Account: ${accounts[0]}`}</p>
      }
      <Switch>
          <Route exact path="/">
            <Home accounts={accounts} writePrompt={writePrompt} updateCounter={updateCounter} connectMetamask={connectMetamask} />
          </Route>
          {
            !noMetamask &&
            <Route exact path="/new">
              <New writePrompt={writePrompt} updateCounter={updateCounter} />
            </Route>
          }
          <Route exact path="/feed">
            <Feed accounts={accounts} counter={counter} promptById={promptById} branchesById={branchesById} branchify={branchify} updateCounter={updateCounter} collectionList={collectionList} validPrice={validPrice} buy={buy} />
          </Route>
          <Route exact path="/branches">
            <Branches counter={counter} branchesById={branchesById} getBranchCid={getBranchCid} getBranchId={getBranchId} />
          </Route>
          <Route exact path="/sales">
            <Sales accounts={accounts} ownerOf={ownerOf} balanceOf={balanceOf} transfer={transfer} approve={approve} addSale={addSale} removeSale={removeSale} auLength={auLength} startAuction={startAuction} promptById={promptById} branchesById={branchesById} auctionPromptId={auctionPromptId} auctionSeller={auctionSeller} auctionMinValue={auctionMinValue} auctionIncrement={auctionIncrement} auctionTimeLeft={auctionTimeLeft} auctionTopBidder={auctionTopBidder} auctionBids={auctionBids} auctionHasPrize={auctionHasPrize} placeBid={placeBid} withdrawFunds={withdrawFunds} withdrawPrize={withdrawPrize} viewFunds={viewFunds} updateAuctionLength={updateAuctionLength} promptAuctions={promptAuctions} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        <Container className="center">{viewer.container[0]}</Container>
    </Router>
  );
}

export default App;