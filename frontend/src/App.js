import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getWeb3, getContract, client } from './utils.js';
import Home from './Home.js';
import Write from './Write.js';
import Mint from './Mint.js';
import SeedPlot from './SeedPlot.js';
import Feed from './Feed.js';
import Transfer from './Transfer.js';
import metamaskLogo from './metamask.png';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [victor, setVictor] = useState(undefined);
  const [frankieId, setFrankieId] = useState(undefined);
  const [newestId, setNewestId] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contract = await getContract(web3);
      const victor = await contract.methods.owner().call();
      const frankieId = await contract.methods.frankieId().call();
      try {
        const newestId = await contract.methods.requestNewestUntitledId().call({from: accounts[0]});
        setNewestId(newestId);
      } catch(err){}
      
      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setVictor(victor);
      setFrankieId(frankieId);

      // for(let i=0; i < 11; i++) {
      //   console.log(`Iteration:${i}`);
      //   const cid = await storeString(`PlotNumber${i}`);
      //   await contract.methods.seedPlot(cid).send({from: accounts[0] });
      //   const sCounter = await contract.methods.submitCounter().call();
      //   const dCounter = await contract.methods.deckCounter().call();
      //   console.log(`Submit Counter: ${sCounter}`);
      //   console.log(`Deck Counter: ${dCounter}`);
      // };
    
    };
    init();
  }, []);

  const ownerOf = async (nftId) => {
    const owner = await contract.methods.ownerOf(nftId).call();
    return owner;
  }

  const balanceOf = async (owner) => {
    const balance = await contract.methods.balanceOf(owner).call();
    return balance;
  }

  const transfer = async (from, to, tokenId) => {
    const res = await contract.methods.safeTransferFrom(from, to, tokenId).send({from: accounts[0]});
    return res;
  }

  const requestCid = async () => {
    const cid = await contract.methods.requestCid().send({from: accounts[0] });
    return cid;
  }

  const storeString = async string => {
    const blob = new Blob([string]);
    const cid = await client.storeBlob(blob);
    console.log(`fresh cid: ${cid}`);
    return cid;
  };

  const submitCid = async (oldCid, string) => {
    const newCid = await storeString(string);
    await contract.methods.submitCid(oldCid, newCid).send({from: accounts[0] });
    const sCounter = await contract.methods.submitCounter().call(); // delete
    console.log(`Submit Counter: ${sCounter}`); // delete
  }

  const newestUntitledId = async () => {
    const newestUnId = await contract.methods.requestNewestUntitledId().call({from: accounts[0]});
    return newestUnId;
  } 

  const requestUntitled = async id => {
    const untitled = await contract.methods.requestUntitledCid(id).call({from: accounts[0]});
    return untitled;
  }

  const requestUntitledStars = async id => {
    const stars = await contract.methods.requestUntitledStars(id).call({from: accounts[0]});
    return stars;
  }

  const mintFrankie = async (untitledCid, newFrankie, unId) => {
    const nftCid = await storeString(newFrankie);
    const res = await contract.methods.mintFrankie(untitledCid, nftCid, unId).send({from: accounts[0]});
    const frankieId = res.events.MintedFrankie.returnValues[0];
    const nftCidFromContract = res.events.MintedFrankie.returnValues[1];
    console.log(`frankieId: ${frankieId}`);
    console.log(`nftCidFromContract: ${nftCidFromContract}`);
    return frankieId;
  }

  const seedPlot = async string => {
    const cid = await storeString(string);
    await contract.methods.seedPlot(cid).send({from: accounts[0] });
    const sCounter = await contract.methods.submitCounter().call();
    console.log(`Submit Counter: ${sCounter}`);
  };

  const mintedCidById = async mintedId => {
    const mintedCid = await contract.methods.mintedCidById(mintedId).call();
    return mintedCid;
  };

  const starsById = async mintedId => {
    const stars = await contract.methods.starsById(mintedId).call();
    return stars;
  };

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
  ) {
    return (
      <div className="my-5 text-center">
        <img src={metamaskLogo} width="250" class="mb-4" alt=""/>
        <h1>Please connect Metamask</h1>
      </div>
    )
  }

  return (
    <Router>
      <Navbar bg="dark" variant={"dark"} expand="lg">
        <Container>
          <Navbar.Brand>
            <Nav.Link  as={Link} to={"/"} style={{color: "greenyellow"}}>Frankenstein Texts</Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link  as={Link} to={"/write"} style={{color: "greenyellow"}}>Write</Nav.Link>
          <Nav.Link  as={Link} to={"/mint"} style={{color: "greenyellow"}}>Mint</Nav.Link>
          <Nav.Link  as={Link} to={"/feed"} style={{color: "greenyellow"}}>Feed</Nav.Link>
          <Nav.Link  as={Link} to={"/transfer"} style={{color: "greenyellow"}}>Transfer</Nav.Link>
          { accounts[0] === victor &&
            <Nav.Link as={Link} to={"/seedplot"} style={{color: "greenyellow"}}>Seed Plot</Nav.Link>
          }
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/write">
            <Write requestCid={requestCid} submitCid={submitCid} />
          </Route>
          <Route exact path="/mint">
            <Mint requestUntitledStars={requestUntitledStars} requestUntitled={requestUntitled} newestUntitledId={newestUntitledId} mintFrankie={mintFrankie} />
          </Route>
          <Route exact path="/feed">
            <Feed frankieId={frankieId} mintedCidById={mintedCidById} starsById={starsById} />
          </Route>
          <Route exact path="/transfer">
            <Transfer ownerOf={ownerOf} balanceOf={balanceOf} transfer={transfer} />
          </Route>
          { accounts[0] === victor &&
            <Route exact path="/seedplot">
              <SeedPlot seedPlot={seedPlot} />
            </Route>
          }
        </Switch>
    </Router>
  );
}

export default App;