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
import WritePrompt from './WritePrompt.js';
import Feed from './Feed.js';
import Ramifications from './Ramifications.js';
import Ownership from './Ownership.js';
import About from './About.js';
import metamaskLogo from './metamask.png';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(undefined);
  const [counter, setCounter] = useState(undefined);
  const [noMetamask, setNoMetamask] = useState(true);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_MUMBAI_ENDPOINT));
      
      let contract;
      try {
        contract = await getContract(web3);
      } catch(err) {
        console.log(err.message);  
      }

      let counter;
      try {
        counter = await contract.methods.counter().call();
      } catch(err) {
        console.log(err.message);  
      }

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setCounter(counter);
    };
    init();
  }, []);

  const connectMetamask = async () => {
    const metamaskWeb3 = await getWeb3();
    let accounts
    if(metamaskWeb3) {
      accounts = await metamaskWeb3.eth.getAccounts();
      setAccounts(accounts);
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

  const ramificate = async (newString, oldString, oldId) => {
    let formatedString = `${oldString}\n0x...${newString}`;
    const cid = await storeString(formatedString);
    const res = await contract.methods.mintPrompt(cid, oldId).send({from: accounts[0] });
    return res.status;
  };

  const writePrompt = async string => {
    let formatedString = `0x...${string}`;
    const cid = await storeString(formatedString);
    const res = await contract.methods.mintPrompt(cid).send({from: accounts[0] });
    return res.status;
  };

  const promptById = async promptId => {
    const promptCid = await contract.methods.promptCids(promptId).call();
    return promptCid;
  };

  const parentById = async promptId => {
    const parentPrompt = await contract.methods.parentPrompts(promptId).call();
    return parentPrompt;
  };

  const ramificationsById = async promptId => {
    const ramifications = await contract.methods.promptRamifications(promptId).call();
    return ramifications;
  };

  const getRamificationCid = async (promptId, ramificationId) => {
    const ramiPromptId = await contract.methods.ramifications(promptId, ramificationId).call();
    const ramificationCid = await contract.methods.promptCids(ramiPromptId).call();
    return ramificationCid;
  }

  const getRamificationId = async (promptId, ramificationId) => {
    const ramiPromptId = await contract.methods.ramifications(promptId, ramificationId).call();
    return ramiPromptId;
  }

  if(
    typeof web3 === 'undefined'
  ) {
    return (
      <div className="my-5 text-center">
        <div class="spinner-border"></div>
        <img src={metamaskLogo} width="200" class="mb-4" alt=""/>
        <div class="spinner-border"></div>
      </div>
    )
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto font-weight-bold">
          <Nav.Link className="px-4" bg="dark" as={Link} to={"/"}><h5>CRYPT0x...PROMPTS</h5></Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/feed"}>FEED</Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/branches"}>BRANCHES</Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/owners"}>OWNERS</Nav.Link>
          <Nav.Link className="px-4" as={Link} to={"/about"}>ABOUT</Nav.Link>
          {
            noMetamask ?
            <Nav.Link className="px-4" onClick={() => connectMetamask()}>CONNECT METAMASK</Nav.Link> :
            <Nav.Link className="px-3" onClick={() => disconnectMetamask()}>DISCONNECT METAMASK</Nav.Link>
          }
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/>
      {accounts.length !== 0 && <p style={{color: "silver", textAlign: "center"}}>{`Active Account: ${accounts[0]}`}</p>
      }
      <Switch>
          <Route exact path="/">
            <WritePrompt accounts={accounts} writePrompt={writePrompt} updateCounter={updateCounter} />
          </Route>
          <Route exact path="/feed">
            <Feed accounts={accounts} counter={counter} promptById={promptById} ramificationsById={ramificationsById} ramificate={ramificate} updateCounter={updateCounter} />
          </Route>
          <Route exact path="/branches">
            <Ramifications parentById={parentById} counter={counter} ramificationsById={ramificationsById} getRamificationCid={getRamificationCid} getRamificationId={getRamificationId} />
          </Route>
          <Route exact path="/owners">
            <Ownership accounts={accounts} ownerOf={ownerOf} balanceOf={balanceOf} transfer={transfer} approve={approve} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;