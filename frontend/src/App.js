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
import { getWeb3, getContract, client } from './utils.js';
import Home from './Home.js';
import New from './New.js';
import Feed from './Feed.js';
import Branches from './Branches.js';
import Owners from './Owners.js';
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
  const [counter, setCounter] = useState(undefined);
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

      let counter;
      try {
        counter = await endpointContract.methods.counter().call();
      } catch(err) {
        console.log(err.message);  
      }

      setWeb3(endpointWeb3);
      setAccounts(accounts);
      setContract(endpointContract);
      setCounter(counter);
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
    let formatedString = JSON.stringify({ title: `${title}`, body: `${oldText}\n0x...${newText}`, writer: `${accounts[0]}`, parent: oldId });
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
          
          <Nav.Link className="px-4" bg="dark" as={Link} to={"/"}><h5><i>CRYPT0x...PROMPTS</i></h5></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/feed"}><i>FEED</i></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/branches"}><i>BRANCHES</i></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/owners"}><i>OWNERS</i></Nav.Link>
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
          
          <Nav.Link className="px-4" bg="dark" as={Link} to={"/"}><h5><i>CRYPT0x...PROMPTS</i></h5></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/new"}><i>NEW</i></Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/feed"}><i>FEED</i></Nav.Link>
          <Nav.Link className="px-5" as={Link} to={"/branches"}><i>BRANCHES</i></Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/owners"}><i>OWNERS</i></Nav.Link>
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
            <Feed accounts={accounts} counter={counter} promptById={promptById} branchesById={branchesById} branchify={branchify} updateCounter={updateCounter} />
          </Route>
          <Route exact path="/branches">
            <Branches counter={counter} branchesById={branchesById} getBranchCid={getBranchCid} getBranchId={getBranchId} />
          </Route>
          <Route exact path="/owners">
            <Owners accounts={accounts} ownerOf={ownerOf} balanceOf={balanceOf} transfer={transfer} approve={approve} />
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