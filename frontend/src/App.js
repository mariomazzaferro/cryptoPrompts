import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getWeb3, getContract } from './utils.js';
import Header from './Header.js';
import Write from './Write.js';
import SeedPlot from './SeedPlot.js';
import client from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [green, setGreen] = useState(undefined);
  const [victor, setVictor] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contract = await getContract(web3);
      const green = await contract.methods.green().call();
      const victor = await contract.methods.victor().call();
      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setGreen(green);
      setVictor(victor);

      // for(let i=0; i < 105; i++) {
      //   const cid = await storeString(`PlotNumber:${i}`);
      //   await contract.methods.seedPlot(cid).send({from: accounts[0], gas:3000000});
      //   const sCounter = await contract.methods.submitCounter().call();
      //   console.log(`Submit Counter: ${sCounter}`);
      // };
    };

    init();
  }, []);

  const storeString = async string => {
    const blob = new Blob([string]);
    const cid = await client.storeBlob(blob);
    console.log(`cid: ${cid}`);
    return cid;
  };

  const requestText = async () => {
    const cid = await contract.methods.requestText().send({from: accounts[0], gas:3000000});
    return cid;
  }

  const submitText = async (oldCid, string) => {
    const newCid = await storeString(string);
    await contract.methods.submitText(oldCid, newCid).send({from: accounts[0], gas:3000000});
    const sCounter = await contract.methods.submitCounter().call();
    console.log(`Submit Counter: ${sCounter}`);
  }

  const seedPlot = async string => {
    const cid = await storeString(string);
    await contract.methods.seedPlot(cid).send({from: accounts[0], gas:3000000});
    const sCounter = await contract.methods.submitCounter().call();
    console.log(`Submit Counter: ${sCounter}`);
  };

  const getBlob = async () => {
    const blob = await axios.get('https://ipfs.io/ipfs/bafkreie4hlfvaepxesvifb5skxwcw2zrfxdxqvedl57scxvcruqe2u37aa');
    console.log(blob.data);
  }

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof contract === 'undefined'
    || typeof green === 'undefined'
    || typeof victor === 'undefined'
  ) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Header green={green} victor={victor} />
      <Write requestText={requestText} submitText={submitText} />
      <SeedPlot seedPlot={seedPlot} />
      <button onClick={getBlob}>Axios Get IPFS Blob</button>
    </div>
  );
}

export default App;