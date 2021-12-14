import Web3 from 'web3';
import { NFTStorage } from 'nft.storage';
import Prompts from './contracts/Prompts.json';

const client = new NFTStorage({ token: process.env.REACT_APP_NFTSTORAGE_API_KEY });

const getWeb3 = async () => {
  if(window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const networkId = await web3.eth.net.getId();
      if(networkId === 80001) {
        return web3;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else if(window.web3) {
    const networkId = await window.web3.eth.net.getId();
    if(networkId === 80001) {
      return window.web3;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const getContract = async web3 => {
  const networkId = await web3.eth.net.getId();
  const contractDeployment = Prompts.networks[networkId];
  return new web3.eth.Contract(
    Prompts.abi,
    contractDeployment && contractDeployment.address
  );
};

export { getContract, getWeb3, client };